import React from "react";

class SearchComponent extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      searchKey: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({
      searchKey: event.target.value
    });
  }

  handleClick(event) {
    event.preventDefault();
    this.props.search(this.state.searchKey);
  }

  render() {
    return (
      <div className="col-lg-6 col-md-8 col-sm-12">
        <div class="input-group mb-3">
          <input
            type="text"
            class="form-control"
            placeholder="Enter keyword to search..."
            aria-label="Enter keyword to search"
            aria-describedby="btnBookSearch"
            onChange={this.handleChange}
            value={this.state.searchKey}
          />
          <div class="input-group-append">
            <button
              class="btn btn-outline-secondary"
              type="button"
              id="btnBookSearch"
              onClick={this.handleClick}
            >
              Button
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default SearchComponent;
