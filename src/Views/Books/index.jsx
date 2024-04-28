import React, { useState, useEffect } from "react";
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Flex,
  Button,
} from "@chakra-ui/react";
import { BooksTable, LentBooksTable, AddBookModal } from "../../Components";
import { ApiService } from "../../Services/datasetAPIService";

export const Books = () => {
  const [books, setBooks] = useState([]);
  const [lent, setLent] = useState([]);
  const [returned, setReturned] = useState([]);
  const [addBookModal, setAddBookModal] = useState({ open: false, data: null });
  const [bookDetails, setBookDetails] = useState({
    book_id: "",
    title: "",
    vendor: "",
    language: "",
    publication: "",
    shelf_name: "",
    available_copies: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    try {
      // Make API call to add the book
      const response = await ApiService.books.addBook(bookDetails);
      console.log("Book added successfully:", response);
      // Reset book details after submission
      setBookDetails({
        book_id: "",
        title: "",
        vendor: "",
        language: "",
        publication: "",
        shelf_name: "",
        available_copies: 0,
      });
      // Close the modal
      setAddBookModal({ open: false, data: null });
      // Refetch books data to update the table
      fetchBooks();
    } catch (error) {
      console.error("Error adding book:", error);
      // Handle error
    }
  };

  // Function to fetch books data
  const fetchBooks = async () => {
    try {
      const booksData = await ApiService.books.getAll();
      setBooks(booksData);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  // Function to fetch lent books data
  const fetchLentBooks = async () => {
    try {
      const lentData = await ApiService.issues.getLendBooks();
      setLent(lentData);
    } catch (error) {
      console.error("Error fetching issued books:", error);
    }
  };

  // Function to fetch returned books data
  const fetchReturnedBooks = async () => {
    try {
      const returnedData = await ApiService.issues.getReturnedBooks();
      setReturned(returnedData);
    } catch (error) {
      console.error("Error fetching issued books:", error);
    }
  };

  // Fetch data on initial component mount
  useEffect(() => {
    fetchBooks();
    fetchLentBooks();
    fetchReturnedBooks();
  }, []);

  return (
    <Flex p={4} pos="relative">
      <Tabs
        w="100%"
        onChange={(index) => {
          // Fetch data based on tab index
          if (index === 0) {
            console.log(index);
            fetchBooks();
          } else if (index === 1) {
            console.log(index);
            fetchLentBooks();
          } else if (index === 2) {
            console.log(index);
            fetchReturnedBooks();
          }
        }}
      >
        <TabList>
          <Tab>All Books</Tab>
          <Tab>Lent</Tab>
          <Tab>Returned</Tab>
        </TabList>

        <TabPanels w="100%">
          <TabPanel>
            <BooksTable data={books} />
          </TabPanel>
          <TabPanel>
            <LentBooksTable data={lent} />
          </TabPanel>
          <TabPanel>
            <LentBooksTable data={returned} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      {/* <Button
        pos="absolute"
        right={4}
        onClick={() => setAddBookModal({ open: true, data: null })}
      >
        + Add Book
      </Button> */}
      <AddBookModal
        isOpen={addBookModal.open}
        data={addBookModal.data}
        onClose={() => setAddBookModal({ open: false, data: null })}
        bookDetails={bookDetails}
        handleInputChange={handleInputChange}
        handleSubmit={handleSubmit}
      />
    </Flex>
  );
};
