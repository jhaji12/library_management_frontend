import React, { useState, useEffect } from "react";
import { Text, Flex, Icon, Button } from "@chakra-ui/react";
import { FaBook, FaUsers, FaChartBar } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import books from "../../Resources/books.svg";
import { ApiService } from "../../Services/datasetAPIService";

export const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeState, setActiveState] = useState("");

  const menus = [
    {
      icon: FaChartBar,
      text: "Overview",
      link: "/overview",
    },
    {
      icon: FaBook,
      text: "Books",
      link: "/books",
    },
    {
      icon: FaUsers,
      text: "Members",
      link: "/members",
    },
  ];

  const handleLogout = async () => {
    try {
      await ApiService.logout();
      // Clear user-related data from localStorage or state
      localStorage.removeItem("token");
      window.location.reload();
      // Redirect the user to the login page or perform any other necessary actions
    } catch (error) {
      console.error("Error logging out:", error);
      // Handle error (e.g., show a toast message)
    }
  };

  useEffect(() => {
    const currentPath = location.pathname || "/overview";
    // Check if the current path is a valid menu link
    const isValidMenuLink = menus.some((menu) => menu.link === currentPath);

    // Set active state only if the current path is a valid menu link
    if (isValidMenuLink) {
      setActiveState(currentPath);
    } else {
      // If the current path is not a valid menu link, set it to the default
      setActiveState("/overview");
    }
  }, [location, menus]);

  return (
    <Flex
      w="300px"
      h="calc(100vh - 80px)"
      direction="column"
      justifyContent="space-between"
      borderRight="1px dashed"
      borderColor="gray.200"
      bg="gray.50"
    >
      <Flex
        pt="2"
        direction="column"
        justify="flex-start"
        align="left"
        gap={4}
        h="100%"
      >
        {menus.map((menu, i) => (
          <Flex
            key={i}
            p={4}
            w="90%"
            bgColor="white"
            borderRightRadius="full"
            cursor="pointer"
            alignItems="center"
            justifyContent="flex-start"
            onClick={() => {
              setActiveState(menu.link);
              navigate(menu.link);
            }}
            bg={activeState === menu.link ? "primary.lighter" : ""}
            boxShadow={
              activeState === menu.link
                ? "rgba(50, 50, 93, 0.25) 0px 2px 5px -1px, rgba(0, 0, 0, 0.3) 0px 1px 3px -1px"
                : ""
            }
            _hover={{
              bg: activeState !== menu.link ? "gray.200" : "",
            }}
          >
            <Icon
              as={menu.icon}
              mr="2"
              color={activeState === menu.link ? "primary.main" : "gray.600"}
            />
            <Text
              variant="body3semiBold"
              color={activeState === menu.link ? "primary.main" : "gray.600"}
            >
              {menu.text}
            </Text>
          </Flex>
        ))}
      </Flex>

      {/* <Image src={books} opacity="0.8" /> */}
      <Button w="50%" alignSelf="center" mb={8} onClick={() => handleLogout()}>
        Logout
      </Button>
    </Flex>
  );
};
