import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Jumbotron from "react-bootstrap/Jumbotron";
import "./BestBooks.css";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { withAuth0 } from '@auth0/auth0-react';
import UpdateBookForm from './components/UpdateBookForm'


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
      showUpdateForm: false,
      index: 0,
      bookName:'',
      bookDescription:'',
      bookStatus: ''

    };
  }

  componentDidMount = async () => {
    // we need to make this email dynamic

    let url = `http://localhost:3001/books?email=osqadoomy@gmail.com`;

    let responseData = await axios.get(url);

    this.setState({
      name: responseData.data[0].name,
      description: responseData.data[0].description,
      status: responseData.data[0].status,
      responseData: responseData.data,
      books: responseData.data,

    });
    // console.log(responseData)

    // await axios.get(url).then(response => {
    //     books = response.data
    //     this.setState
    //     let booksArr = books.map(item => {
    //         return item
    //     })
    //     res.json(booksArr)
    // })
  };

  //http://localhost:3001/books/1?email=laithhayajneh98@gmail.com

  // localhost:3001/deleteCat/1?ownerName=razan
  // deleteBook = async(index) =>{
  //   // const { user, isAuthenticated } = useAuth0();
  //   // console.log(this.state.server)
  //   // console.log(this.state)

  //   const id = this.state.books[index]._id
  //   // console.log('this is id ',id)
  //   // console.log('this is index ',index);
  //   let paramsObj = {
  //     emailAddress:"osqadoomy@gmail.com"
  //   }
  //   let bookData = await axios.delete(`${this.state.server}/books/${index}`,{params:paramsObj})

  //   // index: req.params >> ownerName:req.query

  //   // let catsData = await axios.delete(`${this.state.server}/deleteCat`,{params:paramsObj})
  //   // // index: req.query >> ownerName:req.query

  //   // let bookData = await axios.delete(`${this.state.server}/books?email=laithhayajneh98@gmail.com&${index}`)
  //   // // index: req.query >> ownerName:req.query

  //   this.setState({
  //     books:bookData.data
  //   })

  // }

  showupdateBooksForm = async (index) => {
    await this.setState({
      showUpdateForm: true,
      index: index,
      books: this.state.books.find(element => element._id === index)
      // bookName: this.state.books[index].bookName,
      // bookDescription: this.state.books[index].bookDescription,
      // bookStatus: this.state.books[index].bookStatus
    })
  }

  updateBook = async (e) =>{
    // e.preventDefault();
    let bookFormData = {
      bookName:'e.target.bookName.value',
      bookDesc:'e.target.bookDesc.value',
      bookStatus:'e.target.bookStatus.value',
      email: this.props.auth0.user.email
    }
    console.log(bookFormData.email)
    
    let bookData = await axios.put(`${this.state.server}/books/${this.state.index}`, bookFormData)

    this.setState({
      books:bookData.data,

    })
  }


  render() {
    const {user} = this.props.auth0;
    console.log('user from props ',user)
    return (
      <Jumbotron>
        <h1>My Favorite Books</h1>
        <p>This is a collection of my favorite books</p>
        {this.state.responseData.map((book, id) => {
          return (
            <>
              <Card></Card>

              <Card style={{ width: "18rem" }}>
                <Card.Img variant="top" src="holder.js/100px180" />
                <Card.Body>
                  <Card.Title>
                    <p>{book.name}</p>
                  </Card.Title>
                  <Card.Text>
                    <p>{book.description}</p>
                  </Card.Text>
                  <Card.Text>
                    <p>{book.status}</p>
                  </Card.Text>
                  <Button onClick={() => this.deleteBook(id)} variant="primary">
                    Delete
                  </Button>
                  <Button onClick={() => this.updateBook(id)} variant="primary">
                    Update Book
                  </Button>
                  {this.state.showUpdateForm &&
                  <UpdateBookForm
                    book={this.state.book}
                    updateBook = {this.updateBook}
                    showUpdateForm = {this.showupdateBooksForm}
                  />}
                </Card.Body>
              </Card>
            </>
          );
        })}
      </Jumbotron>
    );
  }
}

export default withAuth0(MyFavoriteBooks);
