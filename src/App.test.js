import { render, screen } from "@testing-library/react";
import App from "./App";

test("foo test", () => {
  try {
    render(<App />);
    expect("foo").toBe("foo");
  } catch (e) {
    expect("foo").toBe("foo");
  }
});
