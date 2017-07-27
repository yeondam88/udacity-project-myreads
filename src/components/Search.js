import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";

class Search extends React.Component {
  state = {
    query: "",
    searchedBooks: []
  };

  onSearch = query => {
    if (query) {
      BooksAPI.search(query, 20).then(books => {
        this.setState({ searchedBooks: books });
      });
    } else {
      this.setState({ searchedBooks: [] });
    }
  };

  componentDidMount() {
    this.onSearch(this.state.query);
  }

  render() {
    const { updateShelf } = this.props;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              onChange={e => this.onSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.searchedBooks.map((book, index) => {
              const imageLink = book.imageLinks.smallThumbnail;
              return (
                <li key={index}>
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
  }
}

export default Search;
