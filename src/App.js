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

  // doing a state change with mutation
  _update_book_state = (bookId, shelf) => {
    let books_cpy = [...this.state.books];
    let book = books_cpy.filter(b => {return b.id === bookId})
    if(book.length > 0){
      book[0].shelf = shelf
      this.setState({books:books_cpy})
    }
    else {
      BooksAPI.get(bookId).then(book => {
        this.setState({books:books_cpy.concat(book)},()=>{
        })
      })
    }
  }


  updateBookShelf = (bookId, shelf) => {
    BooksAPI.update({id: bookId}, shelf)
    this._update_book_state(bookId, shelf)
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
            shelfBooks={this.state.books.reduce(
              (r,book) => {
                r[book.id] = book
                return r
              },{}
            )}
          />)}/>
      </div>
    )
  }
}

export default BooksApp
