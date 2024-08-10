import PostLoader from "@/components/posts/PostLoader";
import { ChakraProvider } from "@chakra-ui/react";
import { render } from "@testing-library/react";
import { describe, it } from "vitest";

describe("PostLoader Component", () => {
  it("renders the PostLoader component with the correct content", () => {
    render(
      <ChakraProvider>
        <PostLoader />
      </ChakraProvider>
    );
  });
});
