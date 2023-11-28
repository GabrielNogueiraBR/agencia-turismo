"use client";

import React from "react";
import { Flex } from "@chakra-ui/react";
import Header from "@/components/Header";

const LayoutClientElement = ({ children }: { children: React.ReactNode }) => {
  return (
    <Flex
      flex="1"
      p="16"
      direction="column"
      justify="flex-start"
      align="center"
    >
      <Header />
      {children}
    </Flex>
  );
};

export default LayoutClientElement;
