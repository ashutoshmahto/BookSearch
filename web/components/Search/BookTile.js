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
      <div className="bookTile">
        <div className="imageWrapper">
          <img src={`${book.image_url}`} />
        </div>
        <div className="detailWrapper">
          <p className="bookTitle">
            <a id={book.id} href="/book" onClick={this.handleClick}>
              {book.title}
            </a>
          </p>
          <p>Written By: {book.author.name}</p>
          <p>
            Published On:
            {`${publicationDay}-${publicationMonth}-${publicationYear}`}
          </p>
        </div>
      </div>
    );
  }
}

export default BookTile;
