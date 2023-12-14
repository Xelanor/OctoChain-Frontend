import { useState } from "react";
import { Box, Text, Heading, Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/homepage";
import FutureArbitrage from "./pages/FutureArbitrage";

function App() {
  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/future" element={<FutureArbitrage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
