import React from "react";
import { Route, Link } from "react-router-dom";
import BookContainer from "./components/BookContainer";
import Search from "./components/Search";
import * as BooksAPI from "./BooksAPI";
import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: [],
    isFetching: true
  };

  getAllBooks = async () => {
    try {
      const books = await BooksAPI.getAll();
      if (books) {
        this.setState({ isFetching: false });
      }
      return books;
    } catch (error) {
      console.warn(error);
      this.setState({ isFetching: true });
    }
  };

  updateShelf = (book, shelf) => {
    if (this.state.books) {
      BooksAPI.update(book, shelf).then(() => {
        book.shelf = shelf;
        this.setState(state => ({
          books: state.books.filter(b => b.id !== book.id).concat([book])
        }));
      });
    }
  };

  componentDidMount() {
    this.getAllBooks().then(books => this.setState({ books }));
  }

  render() {
    const { isFetching, books } = this.state;
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => {
            return (
              <div className="list-books">
                <div className="list-books-title">
                  <h1>MyReads</h1>
                </div>
                {isFetching && <div>Loading....</div>}
                <BookContainer books={books} updateShelf={this.updateShelf} />
                <div className="open-search">
                  <Link to="/search">Add a book</Link>
                </div>
              </div>
            );
          }}
        />
        <Route
          path="/search"
          render={() => {
            return <Search books={books} updateShelf={this.updateShelf} />;
          }}
        />
      </div>
    );
  }
}

export default BooksApp;
