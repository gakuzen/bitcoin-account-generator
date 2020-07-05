import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import * as Bip39 from "bip39";

import SingleSigAccount from "./SingleSigAccount";

describe("should render SingleSigAccount", (): void => {
  it("test address type radios", (): void => {
    const { getByLabelText } = render(<SingleSigAccount />);

    const segwitRadio: HTMLElement = getByLabelText("SegWit");
    expect(segwitRadio).toBeInTheDocument();
    expect((segwitRadio as HTMLInputElement).checked).toBe(true);

    const nativeSegwitRadio: HTMLElement = getByLabelText("Native SegWit");
    expect(nativeSegwitRadio).toBeInTheDocument();
    expect((nativeSegwitRadio as HTMLInputElement).checked).toBe(false);

    const derivationPathInput: HTMLElement = getByLabelText("Derivation Path");
    expect((derivationPathInput as HTMLInputElement).placeholder).toBe(
      `Enter path, eg. m/49'/0'/0'/0/0`
    );

    act(() => {
      nativeSegwitRadio.click();
    });

    expect((segwitRadio as HTMLInputElement).checked).toBe(false);
    expect((nativeSegwitRadio as HTMLInputElement).checked).toBe(true);
    expect((derivationPathInput as HTMLInputElement).placeholder).toBe(
      `Enter path, eg. m/84'/0'/0'/0/0`
    );
  });

  it("test seed phrase input", (): void => {
    const { getByText, getByLabelText } = render(<SingleSigAccount />);

    const suggestSeedPhraseButton: HTMLElement = getByText("Suggest");
    expect(suggestSeedPhraseButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(suggestSeedPhraseButton);
    });

    const seedPhraseTextareaInput: HTMLElement = getByLabelText("Seed Phrase");
    expect(seedPhraseTextareaInput).toBeInTheDocument();
    expect(Bip39.validateMnemonic(seedPhraseTextareaInput.innerHTML)).toBe(
      true
    );
  });

  it("test derivation path input", (): void => {
    const { getByText, getByLabelText } = render(<SingleSigAccount />);

    const defaultDerivationPathButton: HTMLElement = getByText("Default");
    expect(defaultDerivationPathButton).toBeInTheDocument();

    act(() => {
      fireEvent.click(defaultDerivationPathButton);
    });

    const derivationPathInput: HTMLElement = getByLabelText("Derivation Path");
    expect(derivationPathInput).toBeInTheDocument();
    expect((derivationPathInput as HTMLInputElement).value).toBe(
      `m/49'/0'/0'/0/0`
    );

    const nativeSegwitRadio: HTMLElement = getByLabelText("Native SegWit");
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

    const suggestSeedPhraseButton: HTMLElement = getByText("Suggest");
    const defaultDerivationPathButton: HTMLElement = getByText("Default");
    const generateButton: HTMLElement = getByText("Generate");

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

    const addressInput: HTMLElement = getByLabelText("Address");
    const publicKeyHexInput: HTMLElement = getByLabelText("Public Key (Hex)");
    const privateKeyWIFInput: HTMLElement = getByLabelText("Private Key (WIF)");
    const segwitRadio: HTMLElement = getByLabelText("SegWit");
    const nativeSegwitRadio: HTMLElement = getByLabelText("Native SegWit");
    const seedPhraseTextareaInput: HTMLElement = getByLabelText("Seed Phrase");
    const derivationPathInput: HTMLElement = getByLabelText("Derivation Path");

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
    expect(queryByText("Generate")).not.toBeInTheDocument();
    expect(getByText("Reset")).toBeInTheDocument();
  });

  it("test reset button", (): void => {
    const { getByText, getByLabelText, queryByLabelText, queryByText } = render(
      <SingleSigAccount />
    );

    const suggestSeedPhraseButton: HTMLElement = getByText("Suggest");
    const defaultDerivationPathButton: HTMLElement = getByText("Default");
    const generateButton: HTMLElement = getByText("Generate");
    act(() => {
      fireEvent.click(suggestSeedPhraseButton);
    });
    act(() => {
      fireEvent.click(defaultDerivationPathButton);
    });
    act(() => {
      fireEvent.click(generateButton);
    });

    const resetButton: HTMLElement = getByText("Reset");
    act(() => {
      fireEvent.click(resetButton);
    });

    const segwitRadio: HTMLElement = getByLabelText("SegWit");
    const nativeSegwitRadio: HTMLElement = getByLabelText("Native SegWit");
    const seedPhraseTextareaInput: HTMLElement = getByLabelText("Seed Phrase");
    const derivationPathInput: HTMLElement = getByLabelText("Derivation Path");

    expect(queryByLabelText("Address")).not.toBeInTheDocument();
    expect(queryByLabelText("Public Key (Hex)")).not.toBeInTheDocument();
    expect(queryByLabelText("Private Key (WIF)")).not.toBeInTheDocument();
    expect((segwitRadio as HTMLInputElement).disabled).toBe(false);
    expect((nativeSegwitRadio as HTMLInputElement).disabled).toBe(false);
    expect((seedPhraseTextareaInput as HTMLInputElement).readOnly).toBe(false);
    expect((suggestSeedPhraseButton as HTMLInputElement).disabled).toBe(false);
    expect((derivationPathInput as HTMLInputElement).readOnly).toBe(false);
    expect((defaultDerivationPathButton as HTMLInputElement).disabled).toBe(
      false
    );
    expect(getByText("Generate")).toBeInTheDocument();
    expect(queryByText("Reset")).not.toBeInTheDocument();
  });
});