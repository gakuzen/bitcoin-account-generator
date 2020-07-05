import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { act } from "react-dom/test-utils";

import MultiSigAccount from "./MultiSigAccount";

describe("should render MultiSigAccount", (): void => {
  const publicKeys: string[] = [
    "0241965adac60853110dbca7aa1322d3891b9080f8fcc981b32ff216ebda032f36",
    "03e8879ffc3eaac1f137e9e787f11a62bc63c237633192bac02aedcacffbbe900e",
    "02278190d8372bf5da23db6fdd618a73b80fe368f65d0a54e4bd94cbec6f8342de",
  ];

  it("test public keys input group", (): void => {
    const {
      getByText,
      getByPlaceholderText,
      getAllByText,
      queryByPlaceholderText,
    } = render(<MultiSigAccount />);

    const publicKeyInput1: HTMLElement = getByPlaceholderText("#1");
    const addButton: HTMLElement = getByText("+");

    expect(publicKeyInput1).toBeInTheDocument();
    expect(addButton).toBeInTheDocument();

    act(() => {
      addButton.click();
      addButton.click();
    });

    const publicKeyInput2: HTMLElement = getByPlaceholderText("#2");
    const publicKeyInput3: HTMLElement = getByPlaceholderText("#3");

    expect(publicKeyInput2).toBeInTheDocument();
    expect(publicKeyInput3).toBeInTheDocument();

    act(() => {
      fireEvent.change(publicKeyInput1, { target: { value: publicKeys[0] } });
    });
    act(() => {
      fireEvent.change(publicKeyInput2, { target: { value: publicKeys[1] } });
    });
    act(() => {
      fireEvent.change(publicKeyInput3, { target: { value: publicKeys[2] } });
    });

    let removePublicKeyButtons: HTMLElement[] = getAllByText("-");
    expect(removePublicKeyButtons.length).toBe(2);

    act(() => {
      removePublicKeyButtons[0].click();
    });

    removePublicKeyButtons = getAllByText("-");

    expect(removePublicKeyButtons.length).toBe(1);
    expect(publicKeyInput1).toBeInTheDocument();
    expect(publicKeyInput2).toBeInTheDocument();
    expect(queryByPlaceholderText("#3")).not.toBeInTheDocument();
    expect((publicKeyInput1 as HTMLInputElement).value).toBe(publicKeys[0]);
    expect((publicKeyInput2 as HTMLInputElement).value).toBe(publicKeys[2]);
  });

  it("test number of required keys select", (): void => {
    const { getByText, getByLabelText, getAllByText } = render(
      <MultiSigAccount />
    );

    let numberOfRequiredKeysSelect: HTMLElement = getByLabelText(
      /Number of required keys/i
    );
    const addButton: HTMLElement = getByText("+");

    expect(numberOfRequiredKeysSelect).toBeInTheDocument();
    expect((numberOfRequiredKeysSelect as HTMLInputElement).value).toBe("1");

    act(() => {
      addButton.click();
      addButton.click();
      addButton.click();
    });

    numberOfRequiredKeysSelect = getByLabelText(/Number of required keys/i);
    expect(
      (numberOfRequiredKeysSelect as HTMLSelectElement).options.length
    ).toBe(4);

    act(() => {
      fireEvent.change(numberOfRequiredKeysSelect, { target: { value: 3 } });
    });

    numberOfRequiredKeysSelect = getByLabelText(/Number of required keys/i);
    expect((numberOfRequiredKeysSelect as HTMLSelectElement).value).toBe("3");

    const removePublicKeyButtons: HTMLElement[] = getAllByText("-");
    act(() => {
      removePublicKeyButtons[0].click();
    });
    act(() => {
      removePublicKeyButtons[1].click();
    });

    numberOfRequiredKeysSelect = getByLabelText(/Number of required keys/i);
    expect((numberOfRequiredKeysSelect as HTMLSelectElement).value).toBe("2");
  });

  it("test generate button", (): void => {
    const {
      getByText,
      getByLabelText,
      queryByText,
      getByPlaceholderText,
      getAllByText,
    } = render(<MultiSigAccount />);

    const addButton: HTMLElement = getByText("+");
    act(() => {
      addButton.click();
      addButton.click();
    });

    const publicKeyInput1: HTMLElement = getByPlaceholderText("#1");
    const publicKeyInput2: HTMLElement = getByPlaceholderText("#2");
    const publicKeyInput3: HTMLElement = getByPlaceholderText("#3");
    const generateButton: HTMLElement = getByText("Generate");
    expect(generateButton).toBeInTheDocument();

    act(() => {
      fireEvent.change(publicKeyInput1, { target: { value: publicKeys[0] } });
    });
    act(() => {
      fireEvent.change(publicKeyInput2, { target: { value: publicKeys[1] } });
    });
    act(() => {
      fireEvent.change(publicKeyInput3, { target: { value: publicKeys[2] } });
    });
    act(() => {
      generateButton.click();
    });

    const addressInput: HTMLElement = getByLabelText("Address");
    const removePublicKeyButtons: HTMLElement[] = getAllByText("-");

    expect(addressInput).toBeInTheDocument();
    expect((addressInput as HTMLInputElement).readOnly).toBe(true);
    expect((addressInput as HTMLInputElement).value).toBeTruthy();
    expect((publicKeyInput1 as HTMLInputElement).readOnly).toBe(true);
    expect((publicKeyInput2 as HTMLInputElement).readOnly).toBe(true);
    expect((publicKeyInput3 as HTMLInputElement).readOnly).toBe(true);
    removePublicKeyButtons.forEach((removePublicKeyButton) => {
      expect((removePublicKeyButton as HTMLInputElement).disabled).toBe(true);
    });
    expect((addButton as HTMLInputElement).disabled).toBe(true);
    expect(queryByText("Generate")).not.toBeInTheDocument();
    expect(getByText("Reset")).toBeInTheDocument();
  });

  it("test reset button", (): void => {
    const {
      getByText,
      queryByText,
      getByPlaceholderText,
      getAllByText,
      queryByLabelText,
    } = render(<MultiSigAccount />);

    const addButton: HTMLElement = getByText("+");
    act(() => {
      addButton.click();
    });

    const publicKeyInput1: HTMLElement = getByPlaceholderText("#1");
    const publicKeyInput2: HTMLElement = getByPlaceholderText("#2");

    act(() => {
      fireEvent.change(publicKeyInput1, { target: { value: publicKeys[0] } });
    });
    act(() => {
      fireEvent.change(publicKeyInput2, { target: { value: publicKeys[1] } });
    });

    const generateButton: HTMLElement = getByText("Generate");
    act(() => {
      generateButton.click();
    });

    const resetButton: HTMLElement = getByText("Reset");
    act(() => {
      fireEvent.click(resetButton);
    });

    const removePublicKeyButtons: HTMLElement[] = getAllByText("-");

    expect(queryByLabelText("Address")).not.toBeInTheDocument();
    expect((publicKeyInput1 as HTMLInputElement).readOnly).toBe(false);
    expect((publicKeyInput2 as HTMLInputElement).readOnly).toBe(false);
    removePublicKeyButtons.forEach((removePublicKeyButton) => {
      expect((removePublicKeyButton as HTMLInputElement).disabled).toBe(false);
    });
    expect((addButton as HTMLInputElement).disabled).toBe(false);
    expect(getByText("Generate")).toBeInTheDocument();
    expect(queryByText("Reset")).not.toBeInTheDocument();
  });
});
