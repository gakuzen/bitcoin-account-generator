import React from "react";
import Card from "react-bootstrap/Card";

const MultiSigAccount = (): JSX.Element => {
  return (
    <Card className="accountCard">
      <Card.Header>
        n-of-m Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) account
      </Card.Header>
      <Card.Body></Card.Body>
    </Card>
  );
};

export default MultiSigAccount;
