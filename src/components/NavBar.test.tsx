import React from "react";
import { render } from "@testing-library/react";

import NavBar from "./NavBar";

test("renders NavBar", () => {
  const { getByText, rerender } = render(<NavBar isOnline={true} />);

  const onlineStatus: HTMLElement = getByText("Detected Internet connection");
  expect(onlineStatus).toBeInTheDocument();

  rerender(<NavBar isOnline={false} />);

  const offlineStatus: HTMLElement = getByText("Isolated from Internet");
  expect(offlineStatus).toBeInTheDocument();
});
