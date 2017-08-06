import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

class ListBooks extends Component {
  state = {
    shelves: {
      currentlyReading: 'Currently Reading',
      wantToRead: 'Want To Read',
      read: 'Read'
    }
  }

  render() {
    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          {Object.keys(this.state.shelves).map((key)=>(
            <div key={key}>
              <BookShelf
                title={this.state.shelves[key]}
                books={this.props.books.filter((book) => book.shelf===key)}
                onUpdateBookShelf={this.props.onUpdateBookShelf}
              />
            </div>
          ))}

        </div>
        <div className="open-search">
          <Link to="/search" className="search-books-link"/>
        </div>
      </div>
    )
  }
}

class BookShelf extends Component {
  render() {
    const { books, title, onUpdateBookShelf } = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{title}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book)=>(
              <li key={book.id}>
                <Book
                  book={book}
                  onUpdateBookShelf={onUpdateBookShelf}
                />
              </li>
            ))}
          </ol>
        </div>
      </div>
    )
  }
}


export default ListBooks
