import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Jumbotron from 'react-bootstrap/Jumbotron';
import './BestBooks.css';
import axios from 'axios';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button'
// import { useAuth0 } from '@auth0/auth0-react';
import UpdateFormModal from './components/UpdateFormModal';
import { withAuth0 } from '@auth0/auth0-react';

class MyFavoriteBooks extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: [],
      description: [],
      status: [],
      responseData: [],
      books: [],
      server: process.env.REACT_APP_SERVER_URL,
      bookId: '',
      showUpdateModal: false,
      book: {},
      id: "",
    }
  }

  componentDidMount = async () => {
    // we need to make this email dynamic
    const SERVER = process.env.REACT_APP_SERVER_URL;
    let url = `${SERVER}/books?email=${this.props.auth0.user.email}`

    let responseData = await axios.get(url)

    this.setState({
      name: responseData.data[0].name,
      description: responseData.data[0].description,
      status: responseData.data[0].status,
      responseData: responseData.data
    })
    console.log(responseData)
    console.log('this is books',this.state.books);

  }





  deleteBook = async (id) => {

    try {

      const SERVER = process.env.REACT_APP_SERVER_URL;

      const booksData = await axios.delete(`${SERVER}/books/${id}?email=${this.props.auth0.user.email}`)

      await this.setState({
        books: booksData.data
      })
    } catch (error) {
      console.error(error);
    }

  }


  ///////////////////////////////////////////////////////////////////////////////////


  showmodal = () => {
    this.setState({
      showModal: true
    })
  }


  handleClose = () => {

    this.setState({
      showUpdateModal: false
    })
  }







  updateModel = async (id) => {
    await this.setState({
      showUpdateModal: true,
      id: id,
      book: this.state.responseData.find(element => element._id === id),
      // name:this.state.name,
      // disc:this.state.books[id].description
      
      // status:this.state.responseData[id].status
    })
    console.log(this.state.book)
  }

  updateBook = async (event) => {
    event.preventDefault();

    const bookFormData = {
      email: this.props.auth0.user.email,
      bookName: event.target.bookName.value,
      bookDescription: event.target.bookDesc.value,
      bookStatus: event.target.bookStatus.value,
      
    }

    try {
      const SERVER = process.env.REACT_APP_SERVER_URL;
console.log('uuyyyuyu',this.state.bookId)
      const booksData = await axios.put(`${SERVER}/books/${this.state.id}`, bookFormData)

      this.setState({
        books: booksData.data
      })
    } catch (error) {
      console.error(error);
    }

  }





















  render() {
    return (
      <Jumbotron>
        <h1 >My Favorite Books</h1>
        <p>
          This is a collection of my favorite books
        </p>
        {this.state.responseData.map(book => {
          return (
            <>
              <Card>



              </Card>



              <Card style={{ width: '18rem' }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title><p>{book.name}</p></Card.Title>
                  <Card.Text>
                    <p>{book.description}</p>
                  </Card.Text>
                  <Card.Text>
                    <p>{book.status}</p>
                  </Card.Text>
                  <Button variant="outline-warning" onClick={() => this.updateModel(book._id)}>Update Book</Button>
                  <UpdateFormModal show={this.state.showUpdateModal} updateBook={this.updateBook} closing={this.handleClose} book={this.state.book} />

                  <Button variant="outline-danger" onClick={() => this.deleteBook(book._id)}>Delete Book</Button>
                </Card.Body>
              </Card>
            </>
          )
        })}
      </Jumbotron>
    )
  }
}

export default withAuth0(MyFavoriteBooks);
