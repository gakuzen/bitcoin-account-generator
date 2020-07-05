import React from "react";
import { render } from "@testing-library/react";

import AccountGenerator from "./AccountGenerator";

test("renders AccountGenerator", () => {
  const { getByText } = render(<AccountGenerator />);

  const SingleSigAccountElement = getByText(
    "Hierarchical Deterministic (HD) Segregated Witness (SegWit) account"
  );
  const MultiSigAccountElement = getByText(
    "N-of-M Multisignature (multi-sig) Pay-To-Script-Hash (P2SH) account"
  );

  expect(SingleSigAccountElement).toBeInTheDocument();
  expect(MultiSigAccountElement).toBeInTheDocument();
});
