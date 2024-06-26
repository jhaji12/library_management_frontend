import React from "react";
import {
  Box,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";

export const OverdueBooksTable = ({ data }) => {
  return (
    <TableContainer
      w="100%"
      h="65vh"
      overflowY="auto"
      border="1px solid #E2E6F0"
      borderRadius={8}
    >
      <Table variant="striped" size="sm">
        <Thead bg="primary.lighter" sx={{ position: "sticky", top: 0 }}>
          <Tr>
            <Th>Book Id</Th>
            <Th>Student/Faculty</Th>
            <Th>Name</Th>
            <Th>Class</Th>
            <Th>Admission Number</Th>
            <Th>Book Title</Th>
            <Th>Due Date</Th>
            <Th>Overdue Amount</Th>
          </Tr>
        </Thead>
        <Tbody>
          {data?.map((book, id) => (
            <Tr key={id}>
              <Td>{book.book_id}</Td>
              <Td>{book.student_name ? "Student" : "Faculty"}</Td>
              <Td>
                {book.student_name ? book.student_name : book.faculty_name}
              </Td>
              <Td>{book.student_name ? book.school_class : ""}</Td>
              <Td>{book.student_name ? book.adm_number : ""}</Td>
              <Td>{book.title}</Td>
              <Td>{book.return_date}</Td>
              <Td>{book.overdue_amount}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};
