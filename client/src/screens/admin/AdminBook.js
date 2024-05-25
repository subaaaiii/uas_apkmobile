import axios from 'axios';
import {ScrollView, StyleSheet} from 'react-native';
import {useEffect, useState} from 'react';
import {DataTable} from 'react-native-paper';
import React from 'react';
import {API_URL} from '../../utils/constant';

const AdminBook = () => {
  const [listbooks, setListBooks] = useState([]);
  const fetchBooks = async () => {
    try {
      const response = await axios.get(`${API_URL}/books`);
      setListBooks(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);
  return (
    <ScrollView horizontal>
      <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title style={{width: 25}}>Id</DataTable.Title>
          <DataTable.Title style={{width: 75}}>Name</DataTable.Title>
          <DataTable.Title style={{width: 75}}>Author</DataTable.Title>
          <DataTable.Title style={{width: 75}}>Categories</DataTable.Title>
          <DataTable.Title style={{width: 50}}>Rating</DataTable.Title>
          <DataTable.Title style={{width: 50}}>Pages</DataTable.Title>
          <DataTable.Title style={{width: 75}}>Cover</DataTable.Title>
          <DataTable.Title style={{width: 50}}>Year</DataTable.Title>
          <DataTable.Title style={{width: 100}}>Description</DataTable.Title>
        </DataTable.Header>
        {listbooks.map((book, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={{width: 25}}>{index + 1}</DataTable.Cell>
            <DataTable.Cell style={{width: 75}}>{book.name}</DataTable.Cell>
            <DataTable.Cell style={{width: 75}}>{book.author}</DataTable.Cell>
            <DataTable.Cell style={{width: 75}}>
              {book.category1}, {book.category2}, {book.category3}
            </DataTable.Cell>
            <DataTable.Cell style={{width: 50}}>{book.rating}</DataTable.Cell>
            <DataTable.Cell style={{width: 50}}>{book.pages}</DataTable.Cell>
            <DataTable.Cell style={{width: 75}}>{book.cover}</DataTable.Cell>
            <DataTable.Cell style={{width: 50}}>{book.year}</DataTable.Cell>
            <DataTable.Cell style={{width: 100}}>
              {book.description}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
      </DataTable>
    </ScrollView>
  );
};

export default AdminBook;

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  tableHeader: {
    backgroundColor: '#DCDCDC',
  },
});
