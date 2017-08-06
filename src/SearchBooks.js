import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import Book from './Book'

class SearchBooks extends Component {

  state = {
    query: '',
    books: []
  }

  updateQuery = (query) => {
    this.setState({query: query.trim()},() => {
      if (this.state.query!=='') {
        this.props.searchBooks(this.state.query).then((books) => {
          if (books) {
            this.setState({books: books})
          }
        })
      }
    })

  }
  onUpdateBookShelf = (id,shelf) => {
    this.props.onUpdateBookShelf(id,shelf)
    this.updateQuery(this.state.query)
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/' className="close-search"/>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.books.map((book) => (
              <li key={book.id}>
                <Book book={book} onUpdateBookShelf={this.onUpdateBookShelf}/>
              </li>
            ))
            }
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchBooks
