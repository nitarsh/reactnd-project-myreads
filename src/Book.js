import React, {Component} from 'react'


class Book extends Component {

  updateBook = (event) => {
    this.props.onUpdateBookShelf(event.target.id, event.target.value)
  }

  render() {
    const { book } = this.props

    return (
      <div className="book">
        <div className="book-top">
          <div
            className="book-cover"
            style={{ backgroundImage: `url(${book.imageLinks.thumbnail})` }}
          />
          <div className="book-shelf-changer">
            <select
              id={book.id}
              defaultValue={book.shelf}
              onChange={(event) => {this.updateBook(event)}}
            >
              <option value="none" disabled>Move to...</option>
              <option value="currentlyReading">Currently Reading</option>
              <option value="wantToRead">Want to Read</option>
              <option value="read">Read</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
        <div className="book-title">{book.title}</div>
        <div className="book-authors">{(book.authors)? book.authors[0]: ""}</div>
      </div>
    )
  }
}


export default Book
