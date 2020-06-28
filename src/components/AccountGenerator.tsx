import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import SingleSigAccount from "./SingleSigAccount";
import MultiSigAccount from "./MultiSigAccount";

export interface AccountGeneratorProps {}

const AccountGenerator = (props: AccountGeneratorProps): JSX.Element => {
  return (
    <div>
      <Container fluid>
        <Row>
          <Col md>
            <SingleSigAccount />
          </Col>
          <Col md>
            <MultiSigAccount />
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default AccountGenerator;
