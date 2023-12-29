import { useEffect, useState } from "react";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import axios from "axios";

const baseUrl = import.meta.env.VITE_BACKEND_URL;

function OctofolioNewTransaction({ isOpen, onClose }) {
  const [assets, setAssets] = useState();

  const fetchData = () => {
    axios.get(`${baseUrl}/api/octofolio/assets`).then((res) => {
      setAssets(res.data);
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent bg={"black"}>
        <ModalHeader>Add Transaction</ModalHeader>
        <ModalCloseButton />
        <ModalBody></ModalBody>

        <ModalFooter>
          <div colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </div>
          <div variant="ghost">Secondary Action</div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default OctofolioNewTransaction;
