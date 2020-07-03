import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

import { generateMnemonic } from "../utils/bitcoin";

const SingleSigAccount = (): JSX.Element => {
  const [mnemonic, setMnemonic] = useState<string>();

  return (
    <Card className="accountCard">
      <Card.Header>
        Hierarchical Deterministic (HD) Segregated Witness (SegWit) account
      </Card.Header>
      <Card.Body>
        <div>
          <Form>
            <Form.Group controlId="formSeed">
              <Form.Label>Seed Phrase</Form.Label>
              <InputGroup>
                <Form.Control
                  as="textarea"
                  rows={2}
                  placeholder="Enter a seed phrase"
                  value={mnemonic}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    setMnemonic(event.target.value);
                  }}
                />
                <InputGroup.Append>
                  <Button
                    variant="primary"
                    onClick={(): void => {
                      setMnemonic(generateMnemonic());
                    }}
                  >
                    Suggest
                  </Button>
                </InputGroup.Append>
              </InputGroup>
              <Form.Text className="text-muted">
                We'll never share your email with anyone else.
              </Form.Text>
            </Form.Group>

            <Form.Group controlId="formPath">
              <Form.Label>Derivation Path</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter path, eg. m/0'/0/0"
              />
            </Form.Group>

            <Button variant="primary" type="button">
              Generate
            </Button>
          </Form>
        </div>
      </Card.Body>
    </Card>
  );
};

export default SingleSigAccount;
