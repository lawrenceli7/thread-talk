import Premium from "@/components/community/Premium";
import { ChakraProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

describe("Premium Component", () => {
  it("renders the Premium component with the correct content", () => {
    render(
      <ChakraProvider>
        <Premium />
      </ChakraProvider>
    );
  });
});
