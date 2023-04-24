import {
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
} from "@chakra-ui/react";
import Conversations from "./Conversations";
import Contacts from "./Contacts";
import ModalConversations from "./ModalConversations";
import ModalContacts from "./ModalContacts";
import { useState } from "react";

export default function Sidebar({ id }: { id: string }) {
  const [modal, setModal] = useState<string>("conversations");
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <div className="w-[250px] ">
      <Tabs variant={"enclosed"} className="h-[95vh] flex flex-col">
        <TabList>
          <Tab>Conversations</Tab>
          <Tab>Contacts</Tab>
        </TabList>
        <TabPanels className="border-r-2 border-solid border-grey-50 h-full flex-1">
          <TabPanel className="h-full flex flex-col justify-between">
            <Conversations />
            <Button
              onClick={() => {
                setModal("conversations");
                onOpen();
              }}
            >
              New Conversation
            </Button>
          </TabPanel>
          <TabPanel className="h-full flex flex-col justify-between">
            <Contacts />
            <Button
              onClick={() => {
                setModal("contacts");
                onOpen();
              }}
            >
              New Contacts
            </Button>
          </TabPanel>
        </TabPanels>
      </Tabs>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{modal}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {modal === "conversations" ? (
              <ModalConversations />
            ) : (
              <ModalContacts />
            )}
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
