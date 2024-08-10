import * as matchers from "@testing-library/jest-dom/matchers";
import { cleanup } from "@testing-library/react";
import dotenv from "dotenv";
import { afterEach, beforeAll, expect } from "vitest";

expect.extend(matchers);

afterEach(() => {
  cleanup();
});

dotenv.config({ path: ".env.local" });

beforeAll(() => {
  window.matchMedia =
    window.matchMedia ||
    function () {
      return {
        matches: false,
        addListener: function () {},
        removeListener: function () {},
      };
    };
});
