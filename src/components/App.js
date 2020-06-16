import React, { Component } from 'react';
import axios from 'axios'
import './App.css';
import Post from './Post/Post'
import Header from './Header/Header';
import Compose from './Compose/Compose';

class App extends Component {
  constructor() {
    super();

    this.state = {
      posts: []
    };

    this.updatePost = this.updatePost.bind( this );
    this.deletePost = this.deletePost.bind( this );
    this.createPost = this.createPost.bind( this );
  }
  
  componentDidMount() {
    axios.get('https://practiceapi.devmountain.com/api/posts').then( results => {
      this.setState({posts: results.data});
    });
  }


  updatePost(id, text) {
    axios.put(`https://practiceapi.devmountain.com/api/posts?id=${ id }`, {text}).then(data =>{
    this.setState({
      posts: data.data
      })
    })
  }

  deletePost(id) {
    axios.delete(`https://practiceapi.devmountain.com/api/posts?id=${ id }`).then(data =>{
    this.setState({
      posts: data.data
      })
    })
  }

  createPost(text) {
    axios.post(`https://practiceapi.devmountain.com/api/posts`, {text}).then(data => {
    this.setState({
      posts: data.data
      })
    })
  }

  render() {
    const { posts } = this.state;
    const mapped = posts.map( post => (
      <Post key={ post.id }
        deletePostFn={this.deletePost} 
        updatePostFn={this.updatePost} 
        text={ post.text}
        date={ post.date }
        id={post.id} />))
    return (
      <div className="App__parent">
        <Header />

        <section className="App__content">

          <Compose createPostFn={this.createPost}/>
          {mapped}
        </section>
      </div>
    );
  }
}

export default App;
