import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import * as Bip39 from "bip39";

import SingleSigAccount from "./SingleSigAccount";

describe("should render SingleSigAccount", (): void => {
  const segWitRadioLabel: string = "SegWit";
  const nativeSegWitRadioLabel: string = "Native SegWit";
  const seedPhraseInputLabel: string = "Seed Phrase";
  const suggestSeedPhraseButtonLabel: string = "Suggest";
  const derivationPathInputLabel: string = "Derivation Path";
  const defaultDerivationPathButtonLabel: string = "Default";
  const generateButtonLabel: string = "Generate";
  const addressInputLabel: string = "Address";
  const publicKeyHexInputLabel: string = "Public Key (Hex)";
  const privateKeyWIFInputLabel: string = "Private Key (WIF)";
  const resetButtonLabel: string = "Reset";

  it("test address type radios", (): void => {
    const { getByLabelText } = render(<SingleSigAccount />);

    const segWitRadio: HTMLElement = getByLabelText(segWitRadioLabel);
    const nativeSegWitRadio: HTMLElement = getByLabelText(
      nativeSegWitRadioLabel
    );
    const derivationPathInput: HTMLElement = getByLabelText(
      derivationPathInputLabel
    );

    expect(segWitRadio).toBeInTheDocument();
    expect((segWitRadio as HTMLInputElement).checked).toBe(true);
    expect(nativeSegWitRadio).toBeInTheDocument();
    expect((nativeSegWitRadio as HTMLInputElement).checked).toBe(false);
    expect((derivationPathInput as HTMLInputElement).placeholder).toBe(
      `Enter path, eg. m/49'/0'/0'/0/0`
    );

    act(() => {
      nativeSegWitRadio.click();
    });

    expect((segWitRadio as HTMLInputElement).checked).toBe(false);
    expect((nativeSegWitRadio as HTMLInputElement).checked).toBe(true);
    expect((derivationPathInput as HTMLInputElement).placeholder).toBe(
      `Enter path, eg. m/84'/0'/0'/0/0`
    );
  });

  it("test seed phrase input", (): void => {
    const { getByText, getByLabelText } = render(<SingleSigAccount />);

    const suggestSeedPhraseButton: HTMLElement = getByText(
      suggestSeedPhraseButtonLabel
    );
    expect(suggestSeedPhraseButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(suggestSeedPhraseButton);
    });

    const seedPhraseTextareaInput: HTMLElement = getByLabelText(
      seedPhraseInputLabel
    );
    expect(seedPhraseTextareaInput).toBeInTheDocument();
    expect(Bip39.validateMnemonic(seedPhraseTextareaInput.innerHTML)).toBe(
      true
    );
  });

  it("test derivation path input", (): void => {
    const { getByText, getByLabelText } = render(<SingleSigAccount />);

    const defaultDerivationPathButton: HTMLElement = getByText(
      defaultDerivationPathButtonLabel
    );
    expect(defaultDerivationPathButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(defaultDerivationPathButton);
    });

    const derivationPathInput: HTMLElement = getByLabelText(
      derivationPathInputLabel
    );
    const nativeSegwitRadio: HTMLElement = getByLabelText(
      nativeSegWitRadioLabel
    );

    expect(derivationPathInput).toBeInTheDocument();
    expect((derivationPathInput as HTMLInputElement).value).toBe(
      `m/49'/0'/0'/0/0`
    );
    expect(nativeSegwitRadio).not.toHaveAttribute("checked");

    act(() => {
      nativeSegwitRadio.click();
    });

    expect((derivationPathInput as HTMLInputElement).value).toBe("");

    act(() => {
      fireEvent.click(defaultDerivationPathButton);
    });

    expect((derivationPathInput as HTMLInputElement).value).toBe(
      "m/84'/0'/0'/0/0"
    );
  });

  it("test generate button", (): void => {
    const { getByText, getByLabelText, queryByText } = render(
      <SingleSigAccount />
    );

    const suggestSeedPhraseButton: HTMLElement = getByText(
      suggestSeedPhraseButtonLabel
    );
    const defaultDerivationPathButton: HTMLElement = getByText(
      defaultDerivationPathButtonLabel
    );
    const generateButton: HTMLElement = getByText(generateButtonLabel);

    expect(suggestSeedPhraseButton).toBeInTheDocument();
    expect(defaultDerivationPathButton).toBeInTheDocument();
    expect(generateButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(suggestSeedPhraseButton);
    });
    act(() => {
      fireEvent.click(defaultDerivationPathButton);
    });
    act(() => {
      fireEvent.click(generateButton);
    });

    const addressInput: HTMLElement = getByLabelText(addressInputLabel);
    const publicKeyHexInput: HTMLElement = getByLabelText(
      publicKeyHexInputLabel
    );
    const privateKeyWIFInput: HTMLElement = getByLabelText(
      privateKeyWIFInputLabel
    );
    const segwitRadio: HTMLElement = getByLabelText(segWitRadioLabel);
    const nativeSegwitRadio: HTMLElement = getByLabelText(
      nativeSegWitRadioLabel
    );
    const seedPhraseTextareaInput: HTMLElement = getByLabelText(
      seedPhraseInputLabel
    );
    const derivationPathInput: HTMLElement = getByLabelText(
      derivationPathInputLabel
    );

    expect(addressInput).toBeInTheDocument();
    expect((addressInput as HTMLInputElement).readOnly).toBe(true);
    expect((addressInput as HTMLInputElement).value).toBeTruthy();
    expect(publicKeyHexInput).toBeInTheDocument();
    expect((publicKeyHexInput as HTMLInputElement).readOnly).toBe(true);
    expect((publicKeyHexInput as HTMLInputElement).value).toBeTruthy();
    expect(privateKeyWIFInput).toBeInTheDocument();
    expect((privateKeyWIFInput as HTMLInputElement).readOnly).toBe(true);
    expect((privateKeyWIFInput as HTMLInputElement).value).toBeTruthy();
    expect((segwitRadio as HTMLInputElement).disabled).toBe(true);
    expect((nativeSegwitRadio as HTMLInputElement).disabled).toBe(true);
    expect((seedPhraseTextareaInput as HTMLInputElement).readOnly).toBe(true);
    expect((suggestSeedPhraseButton as HTMLInputElement).disabled).toBe(true);
    expect((derivationPathInput as HTMLInputElement).readOnly).toBe(true);
    expect((defaultDerivationPathButton as HTMLInputElement).disabled).toBe(
      true
    );
    expect(queryByText(generateButtonLabel)).not.toBeInTheDocument();
    expect(getByText(resetButtonLabel)).toBeInTheDocument();
  });

  it("test reset button", (): void => {
    const { getByText, getByLabelText, queryByLabelText, queryByText } = render(
      <SingleSigAccount />
    );

    const suggestSeedPhraseButton: HTMLElement = getByText(
      suggestSeedPhraseButtonLabel
    );
    const defaultDerivationPathButton: HTMLElement = getByText(
      defaultDerivationPathButtonLabel
    );
    const generateButton: HTMLElement = getByText(generateButtonLabel);
    act(() => {
      fireEvent.click(suggestSeedPhraseButton);
    });
    act(() => {
      fireEvent.click(defaultDerivationPathButton);
    });
    act(() => {
      fireEvent.click(generateButton);
    });

    const resetButton: HTMLElement = getByText(resetButtonLabel);
    act(() => {
      fireEvent.click(resetButton);
    });

    const segwitRadio: HTMLElement = getByLabelText(segWitRadioLabel);
    const nativeSegwitRadio: HTMLElement = getByLabelText(
      nativeSegWitRadioLabel
    );
    const seedPhraseTextareaInput: HTMLElement = getByLabelText(
      seedPhraseInputLabel
    );
    const derivationPathInput: HTMLElement = getByLabelText(
      derivationPathInputLabel
    );

    expect(queryByLabelText(addressInputLabel)).not.toBeInTheDocument();
    expect(queryByLabelText(publicKeyHexInputLabel)).not.toBeInTheDocument();
    expect(queryByLabelText(privateKeyWIFInputLabel)).not.toBeInTheDocument();
    expect((segwitRadio as HTMLInputElement).disabled).toBe(false);
    expect((nativeSegwitRadio as HTMLInputElement).disabled).toBe(false);
    expect((seedPhraseTextareaInput as HTMLInputElement).readOnly).toBe(false);
    expect((suggestSeedPhraseButton as HTMLInputElement).disabled).toBe(false);
    expect((derivationPathInput as HTMLInputElement).readOnly).toBe(false);
    expect((defaultDerivationPathButton as HTMLInputElement).disabled).toBe(
      false
    );
    expect(getByText(generateButtonLabel)).toBeInTheDocument();
    expect(queryByText(resetButtonLabel)).not.toBeInTheDocument();
  });
});
