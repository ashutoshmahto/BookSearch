import React from "react";
import "./Search.css";

class BookTile extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(event) {
    event.preventDefault();
    const bookId = event.target.id;
    this.props.getBookDetails(bookId);
  }

  render() {
    const {
      best_book: book,
      original_publication_day: publicationDay,
      original_publication_month: publicationMonth,
      original_publication_year: publicationYear
    } = this.props;

    return (
      <div className="book-tile">
        <div className="book-image">
          <img src={`${book.image_url}`} />
        </div>
        <div className="book-info">
          <h5>
            <a id={book.id} href="/book" onClick={this.handleClick}>
              {book.title}
            </a>
          </h5>
          <h6>{book.author.name}</h6>
        </div>
      </div>
    );
  }
}

export default BookTile;
