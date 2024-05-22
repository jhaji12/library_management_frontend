import { createRoot } from "react-dom";
import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import { theme } from "./Themes/index";
import App from "./App";
import { BrowserRouter } from "react-router-dom";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <ChakraProvider theme={theme}>
      <App />
    </ChakraProvider>
  </BrowserRouter>
);
