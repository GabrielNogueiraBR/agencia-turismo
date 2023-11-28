import { Avatar, Flex, Link, Text, VStack } from "@chakra-ui/react";
import React from "react";

const UserInfo = () => {
  return (
    <Flex direction="row" justify="center" align="center" gap="4">
      <VStack spacing={0} align="flex-end">
        <Text fontSize={'xl'}>Gabriel Nogueira</Text>
        <Link href="/pedidos" color="blueviolet">
          meus pedidos
        </Link>
      </VStack>
      <Avatar size="lg" name="Gabriel Nogueira" />
    </Flex>
  );
};

export default UserInfo;
