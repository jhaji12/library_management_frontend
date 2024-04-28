import React from "react";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Text,
  TableContainer,
} from "@chakra-ui/react";

export const BooksTable = ({ data }) => {
  return (
    <TableContainer
      w="80vw"
      h="78vh"
      overflowY="auto"
      border="1px solid #E2E6F0"
      borderRadius={8}
    >
      <Table variant="striped" size="sm">
        <Thead bg="primary.lighter" sx={{ position: "sticky", top: 0 }}>
          <Tr>
            <Th>Book Id</Th>
            <Th>Accession Date</Th>
            <Th>Title</Th>
            <Th>Vendor</Th>
            <Th>Language</Th>
            <Th>Publication</Th>
            <Th>Shelf</Th>
            <Th>Available Copies</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((item, id) => (
            <Tr key={id}>
              <Td>{item.book_id}</Td>
              <Td>{item.accession_date}</Td>
              <Td>{item.title}</Td>
              <Td>{item.vendor}</Td>
              <Td>{item.language}</Td>
              <Td>{item.publication}</Td>
              <Td>{item.shelf_name}</Td>
              <Td>{item.available_copies}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
