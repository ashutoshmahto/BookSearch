import React from "react";
import "../Search/Search.css";

const BookDetails = props => {
  const { bookDetails, isFetching } = props;
  const { author } = bookDetails.authors;
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
    <div className="container bookTile">
      <div className="row">
        <div className="col-lg-3 col-md-4 col-sm-12">
          <div className="imageWrapper">
            <img src={`${bookDetails.image_url}`} />
          </div>
        </div>

        <div className="col-lg-9 col-md-8 col-sm-12">
          <div className="detailWrapper">
            <p className="bookTitle">
              <a id={bookDetails.id} href={bookDetails.link} target="_blank">
                {bookDetails.title}
              </a>
              <span>{bookDetails.edition_information}</span>
            </p>
            <p>
              {author.name && <span>{author.name.name}</span>}
              {!author.name &&
                author.map(item => {
                  return <span>{item.name}</span>;
                })}
            </p>
            <p>
              <span>{bookDetails.format}</span>
              <span>Publisher: {bookDetails.publisher}</span>
            </p>
            <p>{bookDetails.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetails;
