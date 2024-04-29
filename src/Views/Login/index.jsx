import React, { useState } from "react";
import {
  Input,
  Button,
  FormControl,
  FormLabel,
  Flex,
  Box,
  Text,
} from "@chakra-ui/react";
import axios from "axios";
import { constants } from "../../constants";

const BASE_URL = constants.VITE_APP_API_BASE_URL;

export const LoginForm = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginType, setLoginType] = useState("");

  const handleLogin = async () => {
    try {
      if (loginType === "Admin") {
        // Redirect to Django admin portal
        window.location.href = `${BASE_URL}/admin`;
      } else if (loginType === "Librarian") {
        const response = await axios.post(`${BASE_URL}/login/`, {
          username,
          password,
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        onLogin(token);
      }
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <Flex
      w="100%"
      h="100vh"
      direction={"column"}
      gap={4}
      justifyContent={"center"}
      alignContent={"center"}
      alignItems={"center"}
    >
      <Text variant="body1semiBold">Library Management System</Text>
      <Flex w="500px" h="50vh" direction={"column"} gap={4}>
        <FormControl>
          <FormLabel>Select Login Type</FormLabel>
          <Flex justifyContent={"space-evenly"} alignItems={"center"}>
            <Button
              variant={loginType === "Admin" ? "solid" : "outline"}
              colorScheme="blue"
              onClick={() => setLoginType("Admin")}
            >
              Admin
            </Button>
            <Button
              variant={loginType === "Librarian" ? "solid" : "outline"}
              colorScheme="blue"
              onClick={() => setLoginType("Librarian")}
            >
              Librarian
            </Button>
          </Flex>
        </FormControl>
        {loginType === "Librarian" && ( // Render username and password fields only for Librarian login
          <>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
          </>
        )}
        <Button onClick={handleLogin}>Login</Button>
      </Flex>
    </Flex>
  );
};
