import React from "react";
import "../Search/Search.css";

const BookDetails = props => {
  const { bookDetails, isFetching } = props;
  if (isFetching) {
    return (
      <div>
        <div class="spinner-grow" role="status">
          <span class="sr-only">Loading...</span>
        </div>
        Please wait while we are getting details...
      </div>
    );
  }

  return (
    <div className="bookTile">
      <div className="imageWrapper">
        <img src={`${bookDetails.image_url}`} />
      </div>
      <div className="detailWrapper">
        <p className="bookTitle">
          <a id={bookDetails.id} href={bookDetails.link} target="_blank">
            {bookDetails.title}
          </a>
        </p>
      </div>
    </div>
  );
};

export default BookDetails;
