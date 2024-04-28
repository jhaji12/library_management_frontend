import {
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
} from "@chakra-ui/react";
import SearchIcon from "./SearchIcon";
import { useState } from "react";

export const Search = ({
  placeholder,
  onSearch,
  searchQuery,
  setSearchQuery,
}) => {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch(searchQuery);
    }
  };

  return (
    <InputGroup borderRadius="10px" w="100%">
      <InputLeftElement pointerEvents="none">
        <SearchIcon />
      </InputLeftElement>
      <Input
        variant="outline"
        placeholder={placeholder}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
      />
    </InputGroup>
  );
};
