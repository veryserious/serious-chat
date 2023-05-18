import { extendTheme } from "@chakra-ui/react";
import { createMultiStyleConfigHelpers } from "@chakra-ui/react";

const helpers = createMultiStyleConfigHelpers(["container", "item"]);

const List = helpers.defineMultiStyleConfig({
  baseStyle: {
    item: {
      _hover: {
        bg: "blue.600",
        color: "white",
      },
    },
  },
});

const theme = extendTheme({
  components: {
    List: List,
  },
});

export default theme;
