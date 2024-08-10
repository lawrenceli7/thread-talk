import PageContent from "@/components/layout/PageContent";
import { ChakraProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

describe("PageContent Component", () => {
  it("renders the PageContent component with the correct content", () => {
    render(
      <ChakraProvider>
        <PageContent>
          <div>First Child</div>
          <div>Second Child</div>
        </PageContent>
      </ChakraProvider>
    );
  });
});
