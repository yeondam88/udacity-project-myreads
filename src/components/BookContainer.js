import React from "react";
import Shelf from "./Shelf";

const BookContainer = props => {
  const { books, updateShelf } = props;
  return (
    <div className="list-books-content">
      <div>
        <Shelf
          title="Currently Reading"
          books={books.filter(book => book.shelf === "currentlyReading")}
          updateShelf={updateShelf}
        />
        <Shelf
          title="Want To Read"
          books={books.filter(book => book.shelf === "wantToRead")}
          updateShelf={updateShelf}
        />
        <Shelf
          title="Read"
          books={books.filter(book => book.shelf === "read")}
          updateShelf={updateShelf}
        />
      </div>
    </div>
  );
};

export default BookContainer;
