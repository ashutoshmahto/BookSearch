import React from "react";
import "./Modal.css";

class Modal extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: props.isOpen
    };
    this.handleClick = this.handleClick.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.isOpen) {
      return { isOpen: nextProps.isOpen };
    } else return prevState;
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      isOpen: false
    });
  }

  render() {
    const { header, children } = this.props;
    const modalWrapperClass = this.state.isOpen ? "modal show" : "modal";
    return (
      <div id="modal" className={modalWrapperClass}>
        <div className="modal-content">
          <div className="modal-header">
            <button onClick={this.handleClick} type="button" className="close">
              &times;
            </button>
            <h2>{header}</h2>
          </div>
          <div className="modal-body">{children}</div>
        </div>
      </div>
    );
  }
}

export default Modal;
