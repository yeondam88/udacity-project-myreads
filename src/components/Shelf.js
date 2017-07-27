import React from "react";

const Shelf = props => {
  const { title, books, updateShelf } = props;
  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">
        {title}
      </h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => {
            const imageLink = book.imageLinks.smallThumbnail;
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url(${imageLink})`
                      }}
                    />
                    <div className="book-shelf-changer">
                      <select
                        value={book.shelf}
                        onChange={e => updateShelf(book, e.target.value)}
                      >
                        <option value="none" disabled>
                          Move to...
                        </option>
                        <option value="currentlyReading">
                          Currently Reading
                        </option>
                        <option value="wantToRead">Want to Read</option>
                        <option value="read">Read</option>
                        <option value="none">None</option>
                      </select>
                    </div>
                  </div>
                  <div className="book-title">
                    {book.title}
                  </div>
                  <div className="book-authors">
                    {book.authors}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
};

export default Shelf;
