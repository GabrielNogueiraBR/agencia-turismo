"use client";

import React from "react";
import { Tabs, TabList, Tab, TabPanels, TabPanel } from "@chakra-ui/react";

const ClientElement = () => {
  return (
    <Tabs w="60%" fontSize="lg">
      <TabList>
        <Tab fontSize="xl">Todos</Tab>
        <Tab fontSize="xl">Reserva de Hotel</Tab>
        <Tab fontSize="xl">Voos</Tab>
        <Tab fontSize="xl">Ingressos</Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <p>one!</p>
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default ClientElement;
