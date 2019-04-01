import React, { Component } from "react";
import Modal from "react-modal";
const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: 0
  }
};

class NavBar extends Component {
  constructor() {
    super();
    this.state = {
      modalIsOpen: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  render() {
    return (
      /** navigation bar */
      <nav className="navbar navbar-expand-lg navbar-light nav hidden-phone">
        <a className="navbar-brand navbrand" href="#">
          <i className="fa fa-video-camera" aria-hidden="true" /> Top Movies
        </a>
        <span className="navbar-text">Enjoy Watching </span>
        <button
          type="button"
          className="btn btn-danger btn-circle"
          data-toggle="modal"
          data-target="#infoModal"
          onClick={this.openModal}
        >
          <i className="fa fa-info-circle info" />
        </button>
        {/* Modal Container 
            https://www.npmjs.com/package/react-modal
         */}
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            onRequestClose={this.closeModal}
            style={customStyles}
          >
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="infoModal">
                    About Top Movies
                  </h5>
                  <button
                    type="button"
                    className="close"
                    data-dismiss="modal"
                    aria-label="Close"
                    onClick={this.closeModal}
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
                <div className="modal-body">
                  <ul>
                    <li>Top Movies shows all movies with rate more than 6</li>
                    <li>Movies can be filtered with genres & years</li>
                    <li>
                      By selecting the movie , you can see more details about
                      the movie like staff , revenue , ...etc
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </Modal>
        </div>
      </nav>
    );
  }
}

export default NavBar;
