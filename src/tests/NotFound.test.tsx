import NotFound from "@/components/community/NotFound";
import { ChakraProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

describe("NotFound Component", () => {
  it("renders the NotFound component with the correct content", () => {
    render(
      <ChakraProvider>
        <NotFound />
      </ChakraProvider>
    );
  });
});
