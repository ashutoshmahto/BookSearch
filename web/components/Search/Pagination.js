import React from "react";

class Pagination extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: props.currentPage
    };
    this.handlePrevious = this.handlePrevious.bind(this);
    this.handleNext = this.handleNext.bind(this);
    this.handlePageClick = this.handlePageClick.bind(this);
    this.generatePageNumbers = this.generatePageNumbers.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.currentPage !== prevState.currentPage) {
      return { currentPage: nextProps.currentPage };
    } else return prevState;
  }

  handlePrevious(event) {
    event.preventDefault();
    if (this.state.currentPage > 1) {
      const { search, searchQuery } = this.props;
      search(searchQuery, this.state.currentPage - 1);
    }
  }

  handleNext(event) {
    const { pageEnd, totalResults } = this.props;
    if (pageEnd < totalResults) {
      event.preventDefault();
      const { search, searchQuery } = this.props;
      search(searchQuery, this.state.currentPage + 1);
    }
  }

  handlePageClick(event, pageNum) {
    event.preventDefault();
    const { search, searchQuery } = this.props;
    search(searchQuery, pageNum);
  }

  generatePageNumbers(currentPage) {
    if (currentPage > 4) {
      return [currentPage - 3, currentPage - 2, currentPage - 1, currentPage];
    }
    return [1, 2, 3, 4];
  }

  render() {
    const { currentPage } = this.state;
    const { pageEnd, totalResults } = this.props;
    const pages = this.generatePageNumbers(currentPage);
    const pagelinkClass =
      this.state.currentPage > 1 ? "page-item" : "page-item disabled";
    const nextPageLinkClass =
      pageEnd < totalResults ? "page-item" : "page-item disabled";

    return (
      <nav aria-label="Book Search pagination">
        <ul className="pagination justify-content-center">
          <li className={pagelinkClass}>
            <a
              className="page-link"
              href="#"
              tabindex="-1"
              aria-disabled="true"
              onClick={this.handlePrevious}
            >
              Previous
            </a>
          </li>
          {pages &&
            pages.map(item => {
              return (
                <li className="page-item">
                  <a
                    className="page-link"
                    href="#"
                    onClick={event => {
                      this.handlePageClick(event, item);
                    }}
                  >
                    {item}
                  </a>
                </li>
              );
            })}
          <li className={nextPageLinkClass}>
            <a className="page-link" href="#" onClick={this.handleNext}>
              Next
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}

export default Pagination;
