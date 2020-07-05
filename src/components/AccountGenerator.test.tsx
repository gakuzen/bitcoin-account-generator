import React from "react";
import { render } from "@testing-library/react";

import AccountGenerator from "./AccountGenerator";

test("renders AccountGenerator", () => {
  const { getByText } = render(<AccountGenerator />);

  const SingleSigAccountElement: HTMLElement = getByText(
    "Hierarchical Deterministic (HD) Segregated Witness (SegWit) account"
  );
  const MultiSigAccountElement: HTMLElement = getByText(
    "N-of-M Multisignature (multisig) Pay-To-Script-Hash (P2SH) account"
  );

  expect(SingleSigAccountElement).toBeInTheDocument();
  expect(MultiSigAccountElement).toBeInTheDocument();
});
