import { Routes, Route, Navigate } from "react-router-dom";
import { Overview, Books, Members, LoginForm } from "./Views";
import { Box, Flex } from "@chakra-ui/react";
import { Appbar, Sidebar } from "./Components";
import { useState, useEffect } from "react";

const App = () => {
  const [activeState, setActiveState] = useState(window.location.pathname);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if token is present in localStorage
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
    }
  }, []); // Empty dependency array to run only once on component mount

  const handleLogin = (token) => {
    // Store the token in localStorage
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
    return <Navigate to="/" />;
  };

  return (
    <Box bg="framebg">
      {isLoggedIn ? (
        <>
          <Appbar />
          <Flex pt="80px">
            <Sidebar
              activeState={activeState}
              setActiveState={setActiveState}
            />
            <Box flex={1}>
              <Routes>
                <Route path="/overview" element={<Overview />} />
                <Route path="/books" element={<Books />} />
                <Route path="/Members" element={<Members />} />
                <Route path="*" element={<Navigate to="/" />} />
              </Routes>
            </Box>
          </Flex>
        </>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </Box>
  );
};

export default App;
