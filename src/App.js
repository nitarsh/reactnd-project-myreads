import React from 'react'
import {Route} from 'react-router-dom'

import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'

class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => (this.setState({books: books})))
  }

  searchBooks = (query) => {
    return BooksAPI.search(query, 20)
  }

  updateBookShelf = (bookId, shelf) => {
    BooksAPI.update({id: bookId}, shelf)
    BooksAPI.getAll().then((books) => (this.setState({books: books})))
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() => (
          <ListBooks
            books={this.state.books}
            onUpdateBookShelf={this.updateBookShelf}
          />)}/>
        <Route exact path='/search' render={({history}) => (
          <SearchBooks
            searchBooks={this.searchBooks}
            onUpdateBookShelf={this.updateBookShelf}
          />)}/>
      </div>
    )
  }
}

export default BooksApp
