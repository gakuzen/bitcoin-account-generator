import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import * as BitcoinjsLib from "bitcoinjs-lib";

import "./MultiSigAccount.css";
import { generateMultiSigAccount } from "../utils/bitcoin";

const MultiSigAccount = (): JSX.Element => {
  const [publicKeys, setPublicKeys] = useState<string[]>([""]);
  const [publicKeysError, setPublicKeysError] = useState<boolean>(false);
  const [numberOfRequiredKeys, setNumberOfRequiredKeys] = useState<number>(1);
  const [address, setAddress] = useState<string>("");

  const generatedAddress: boolean = !!address;

  return (
    <Card>
      <Card.Header>
        N-of-M Multisignature (multisig) Pay-To-Script-Hash (P2SH) account
      </Card.Header>
      <Card.Body>
        <div>
          <Form>
            <Form.Group>
              <Form.Label>Public Keys (M={publicKeys.length})</Form.Label>
              {publicKeys.map(
                (publicKey: string, index: number): JSX.Element => (
                  <div key={index}>
                    <Form.Group>
                      <InputGroup>
                        <Form.Control
                          type="text"
                          value={publicKey}
                          placeholder={`#${index + 1}`}
                          readOnly={generatedAddress}
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ): void => {
                            const newValue: string = event.target.value;
                            setPublicKeys([
                              ...publicKeys.slice(0, index),
                              newValue,
                              ...publicKeys.slice(index + 1),
                            ]);
                          }}
                          isInvalid={publicKeysError}
                        />
                        {index > 0 && (
                          <InputGroup.Append>
                            <Button
                              variant="outline-primary"
                              disabled={generatedAddress}
                              onClick={(): void => {
                                setNumberOfRequiredKeys(
                                  numberOfRequiredKeys >= publicKeys.length
                                    ? publicKeys.length - 1
                                    : numberOfRequiredKeys
                                );
                                setPublicKeys([
                                  ...publicKeys.slice(0, index),
                                  ...publicKeys.slice(index + 1),
                                ]);
                              }}
                            >
                              -
                            </Button>
                          </InputGroup.Append>
                        )}
                      </InputGroup>
                    </Form.Group>
                  </div>
                )
              )}
              <Button
                className="add-button"
                variant="outline-primary"
                type="button"
                disabled={generatedAddress}
                onClick={(): void => {
                  setPublicKeys((keys): string[] => [...keys, ""]);
                }}
              >
                +
              </Button>
            </Form.Group>

            <Form.Group controlId="formNumberOfRequiredKeys">
              <Form.Label>
                Number of required keys (N={numberOfRequiredKeys})
              </Form.Label>
              <Form.Control
                as="select"
                value={numberOfRequiredKeys}
                disabled={generatedAddress}
                onChange={(
                  event: React.ChangeEvent<HTMLInputElement>
                ): void => {
                  setNumberOfRequiredKeys(Number.parseInt(event.target.value));
                }}
              >
                {publicKeys.map(
                  (publicKey, index): JSX.Element => (
                    <option key={index}>{index + 1}</option>
                  )
                )}
              </Form.Control>
            </Form.Group>

            {!generatedAddress && (
              <Form.Group>
                <Button
                  variant="outline-primary"
                  type="button"
                  disabled={generatedAddress}
                  onClick={(): void => {
                    const account: BitcoinjsLib.payments.Payment | null = generateMultiSigAccount(
                      publicKeys,
                      numberOfRequiredKeys
                    );
                    if (account) {
                      setPublicKeysError(false);

                      const { address } = account;
                      setAddress(address || "");
                    } else {
                      setPublicKeysError(true);
                      setAddress("");
                    }
                  }}
                >
                  Generate
                </Button>
              </Form.Group>
            )}

            {generatedAddress && (
              <div>
                <Form.Group controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <InputGroup>
                    <Form.Control type="text" value={address} readOnly />
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

export default MultiSigAccount;
