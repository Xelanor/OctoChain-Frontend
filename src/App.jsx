import { useState } from "react";
import { Box, Text, Heading, Container } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar/Navbar";
import Homepage from "./pages/Homepage";
import FutureArbitrage from "./pages/FutureArbitrage";
import SpotArbitrage from "./pages/SpotArbitrage";

function App() {
  return (
    <>
      <Navbar />
      <Container maxW="container.xl">
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/FutureArbitrage" element={<FutureArbitrage />} />
          <Route path="/SpotArbitrage" element={<SpotArbitrage />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
