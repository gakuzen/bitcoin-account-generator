import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as Bip39 from "bip39";

import {
  generateMnemonic,
  AddressType,
  defaultPathBIP49,
  defaultPathBIP84,
  generateAccount,
} from "../utils/bitcoin";

const SingleSigAccount = (): JSX.Element => {
  const [addressType, setAddressType] = useState<AddressType>(
    AddressType.SegWit
  );
  const [mnemonic, setMnemonic] = useState<string>("");
  const [mnemonicError, setMnemonicError] = useState<boolean>(false);
  const [path, setPath] = useState<string>("");
  const [pathError, setPathError] = useState<boolean>(false);
  const [pathPlaceholder, setPathPlaceholder] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");

  // TODO: validate by Yup and Formik
  const validateInputs = (): boolean => {
    let hasError: boolean = false;

    // Validate mnemonic
    if (!Bip39.validateMnemonic(mnemonic)) {
      setMnemonicError(true);
      hasError = true;
    } else {
      setMnemonicError(false);
    }

    // Validate path
    if (!path) {
      setPathError(true);
      hasError = true;
    } else {
      setPathError(false);
    }

    return !hasError;
  };

  const changeAddressType = (addressType: AddressType): void => {
    switch (addressType) {
      case AddressType.SegWit: {
        setAddressType(AddressType.SegWit);
        setPathPlaceholder(defaultPathBIP49);
        setPath("");
        break;
      }
      case AddressType.NativeSegWit: {
        setAddressType(AddressType.NativeSegWit);
        setPathPlaceholder(defaultPathBIP84);
        setPath("");
        break;
      }
      default: {
      }
    }
  };

  useEffect((): void => {
    changeAddressType(AddressType.SegWit);
  }, []);

  const generated: boolean = !!address;

  return (
    <Card className="accountCard">
      <Card.Header>
        Hierarchical Deterministic (HD) Segregated Witness (SegWit) account
      </Card.Header>
      <Card.Body>
        <div>
          <Form>
            <Form.Group controlId="formSegWitType">
              <Form.Check
                inline
                label="SegWit"
                type="radio"
                name="formSegWitTypes"
                id="formSegWitTypes1"
                checked={addressType === AddressType.SegWit}
                disabled={generated}
                onChange={(): void => {
                  changeAddressType(AddressType.SegWit);
                }}
              />
              <Form.Check
                inline
                label="Native SegWit"
                type="radio"
                name="formSegWitTypes"
                id="formSegWitTypes2"
                checked={addressType === AddressType.NativeSegWit}
                disabled={generated}
                onChange={(): void => {
                  changeAddressType(AddressType.NativeSegWit);
                }}
              />
            </Form.Group>

            <Form.Group controlId="formSeed">
              <Form.Label>Seed Phrase</Form.Label>
              <InputGroup>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter a seed phrase"
                  value={mnemonic}
                  readOnly={generated}
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ): void => {
                    setMnemonic(event.target.value);
                  }}
                  isInvalid={mnemonicError}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-primary"
                    disabled={generated}
                    onClick={(): void => {
                      setMnemonic(generateMnemonic());
                    }}
                  >
                    Suggest
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <Form.Text className="text-muted">
                Please write down the seed phrase on a paper and store it
                securely.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formPath">
              <Form.Label>Derivation Path</Form.Label>
              <InputGroup>
                <Form.Control
                  type="text"
                  placeholder={`Enter path, eg. ${pathPlaceholder}`}
                  value={path}
                  readOnly={generated}
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ): void => {
                    setPath(event.target.value);
                  }}
                  isInvalid={pathError}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-primary"
                    disabled={generated}
                    onClick={(): void => {
                      setPath(pathPlaceholder);
                    }}
                  >
                    Default
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <Form.Text className="text-muted">
                Ref.: m / k' / coin_type' / account' / change / address
              </Form.Text>
            </Form.Group>

            {!generated && (
              <Form.Group>
                <Button
                  variant="outline-primary"
                  type="button"
                  disabled={generated}
                  onClick={(): void => {
                    if (validateInputs()) {
                      const account = generateAccount(
                        addressType,
                        mnemonic,
                        path
                      );
                      if (account) {
                        const { node, payment } = account;

                        if (payment) {
                          const { address } = payment;
                          setAddress(address || "");
                        }

                        if (node) {
                          setPublicKey(node.publicKey.toString("hex"));
                          setPrivateKey(node.toWIF());
                        }
                      }
                    }
                  }}
                >
                  Generate
                </Button>
              </Form.Group>
            )}
            {generated && (
              <div>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <InputGroup>
                    <Form.Control type="text" value={address} readOnly />
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="formPublicKey">
                  <Form.Label>Public Key</Form.Label>
                  <InputGroup>
                    <Form.Control type="text" value={publicKey} readOnly />
                  </InputGroup>
                </Form.Group>
                <Form.Group controlId="formPrivateKey">
                  <Form.Label>Private Key (WIF)</Form.Label>
                  <InputGroup>
                    <Form.Control type="text" value={privateKey} readOnly />
                  </InputGroup>
                </Form.Group>
                <Button
                  variant="outline-primary"
                  type="button"
                  onClick={() => {
                    setAddress("");
                  }}
                >
                  Reset
                </Button>
              </div>
            )}
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SingleSigAccount;
