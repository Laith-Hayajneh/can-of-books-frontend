import React, { Component } from "react";
import Modal from 'react-bootstrap/Modal'


export class UpdateBookForm extends Component {
  render() {
    return (
      <div>
        <Modal show={this.props.showUpdateForm} >
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <form onSubmit={this.props.updateBook}>
              <input
                placeholder="Update book name"
                type="text"
                defaultValue={this.props.books.bookName}
              />

              <br />
              <input
                placeholder="Update book description "
                type="text"
                defaultValue={this.props.books.bookName}
              />
              <br />
              <br />
              <input
                placeholder="Update book Status"
                type="text"
                defaultValue={this.props.books.bookName}
              />
              <input type="submit" value="Update Book" />
            </form>
          </Modal.Body>

          <Modal.Footer>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UpdateBookForm;
