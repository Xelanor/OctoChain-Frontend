// theme.js

import { extendTheme } from "@chakra-ui/react";

const config = {
  initialColorMode: "dark",
  useSystemColorMode: false,
};

const theme = extendTheme({
  components: {
    Tabs: {
      defaultProps: {
        variant: "soft-rounded",
      },
      variants: {
        "soft-rounded": {
          tabpanel: {
            px: 0,
          },
        },
      },
    },
  },
  styles: {
    global: {
      // styles for the `body`
      body: {
        bg: "black",
        color: "#e7e9ea",
      },
    },
  },
  config,
});

export default theme;
