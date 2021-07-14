import React, { Component } from 'react'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import AddBookForm from './AddBookForm'
import { withAuth0 } from '@auth0/auth0-react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

class AddBook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            books: []
        }
    }


 // localhost:3001/deleteCat/1?ownerName=razan



    addBook = async (event) => {
        event.preventDefault();


        // let email = user.email
        // console.log("addbook", email);
        // let bookName = event.target.bookName.value;
        // let bookDesc = event.target.bookDesc.value;
        // let bookStatus = event.target.bookStatus.value;
        // console.log(bookName)

        const BookFormData = {
            bookName: event.target.bookName.value,
            bookDesc: event.target.bookDesc.value,
            bookStatus: event.target.bookStatus.value
        }
        // we need to make this email dynamic
        let bookData = await axios.post(`http://localhost:3001/books?email=osqadoomy@gmail.com`, BookFormData)
        console.log(bookData)
        this.setState({
            books: bookData.data

        })
    }


  














    render() {

        return (
            <div>
                <Modal show={this.props.show} onHide={this.props.close}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                    </Modal.Header>


                    <Modal.Body>

                        <AddBookForm sendData={this.addBook} />
                    </Modal.Body>

                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.close}>
                            Close
                        </Button>
                        
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

// const { user, isAuthenticated } = useAuth0();

export default AddBook