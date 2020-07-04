import React, { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

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
  const [path, setPath] = useState<string>("");
  const [pathPlaceholder, setPathPlaceholder] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [publicKey, setPublicKey] = useState<string>("");
  const [privateKey, setPrivateKey] = useState<string>("");

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
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ): void => {
                    setMnemonic(event.target.value);
                  }}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-primary"
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
                  onChange={(
                    event: React.ChangeEvent<HTMLInputElement>
                  ): void => {
                    setPath(event.target.value);
                  }}
                />
                <InputGroup.Append>
                  <Button
                    variant="outline-primary"
                    onClick={(): void => {
                      setPath(pathPlaceholder);
                    }}
                  >
                    Default
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <Form.Text className="text-muted">
                Ref: m / k' / coin_type' / account' / change / address
              </Form.Text>
            </Form.Group>

            <Form.Group>
              <Button
                variant="outline-primary"
                type="button"
                onClick={(): void => {
                  const { account, node } =
                    generateAccount(addressType, mnemonic, path) || {};
                  if (account) {
                    const { address } = account;
                    setAddress(address || "");
                  }

                  if (node) {
                    setPublicKey(node.publicKey.toString("hex"));
                    setPrivateKey(node.toWIF());
                  }
                }}
              >
                Generate
              </Button>
            </Form.Group>
            {address && (
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
                  <Form.Label>Private Key</Form.Label>
                  <InputGroup>
                    <Form.Control type="text" value={privateKey} readOnly />
                  </InputGroup>
                </Form.Group>
              </div>
            )}
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SingleSigAccount;
