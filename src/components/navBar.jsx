import React, { Component } from "react";
import ReactDOM from "react-dom";
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
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }
  render() {
    return (
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
        <div>
          <Modal
            isOpen={this.state.modalIsOpen}
            // onAfterOpen={this.afterOpenModal}
            onRequestClose={this.closeModal}
            style={customStyles}
            contentLabel="Example Modal"
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

// const NavBar = props => {
//   return (
//     <nav className="navbar navbar-expand-lg navbar-light nav hidden-phone">
//       <a className="navbar-brand navbrand" href="#">
//         <i className="fa fa-video-camera" aria-hidden="true" /> Top Movies
//       </a>
//       <span className="navbar-text">Enjoy Watching </span>
//       <button
//         type="button"
//         className="btn btn-danger btn-circle"
//         data-toggle="modal"
//         data-target="#infoModal"
//       >
//         <i className="fa fa-info-circle info" />
//       </button>

//       <div
//         className="modal fade"
//         id="infoModal"
//         tabindex="-1"
//         role="dialog"
//         aria-labelledby="infoModal"
//         aria-hidden="true"
//       >
//         <div className="modal-dialog" role="document">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h5 className="modal-title" id="infoModal">
//                 About Top Movies
//               </h5>
//               <button
//                 type="button"
//                 className="close"
//                 data-dismiss="modal"
//                 aria-label="Close"
//               >
//                 <span aria-hidden="true">&times;</span>
//               </button>
//             </div>
//             <div className="modal-body">...</div>
//             <div className="modal-footer">
//               <button
//                 type="button"
//                 className="btn btn-secondary"
//                 data-dismiss="modal"
//               >
//                 Close
//               </button>
//               <button type="button" className="btn btn-primary">
//                 Save changes
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

export default NavBar;
