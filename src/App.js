import React, { Component } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import {getPosts, getComments} from './fetches';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      "posts" : {},
      "comments" : {},
      "username" : ""
    }
    this.updateUsername = this.updateUsername.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
  }

  // componentWillMount(){
  //    axios.get("https://www.reddit.com/user/ZadocPaet/submitted.json").then((r)=>console.log(r));
  // }

  updateUsername(e){
    this.setState({"username" : e.target.value});
  }

  fetchPosts(){
    getPosts(this.state.username)
    .then((r)=>this.setState({"posts" : r.data.data.children}));
    getComments(this.state.username)
    .then((r)=>this.setState({"comments" : r.data.data.children}));
  }

  buildLis(obj){
    let ar = [];
    for (let i = 0; i < 25; i++) {
      if (obj[i]){
        ar.push(obj[i]);
      } else {
        break;
      }
    }
    ar.sort((a,b)=> b.data.score - a.data.score)
    return ar.map((el, i)=>{
      if (i === 0){
        console.log(el);
      }
      return(
        <li className="info" key={i}>{this.buildLi(el.data)}</li>
      )
    })
  }

  buildLi(post){
    let link = post.link_permalink || post.permalink;
    let title = post.link_title || post.title;
    let score = post.score;
    let body = post.body || '';
    return(
      <div>
        <h5>Score: {score}</h5>
        <h5>Title: {title}</h5>
        <h5>Link: {link}</h5>
        <p>{body}</p>
      </div>
    )
  }

  render() {
    return (
      <div className="App">
        <div>
          <input onInput={this.updateUsername} value={this.state.username}/>
          <button onClick={this.fetchPosts}>Get Comments/Posts</button>
        </div>
        <div>
          Posts:
          <ul>
            {this.buildLis(this.state.posts)}
          </ul>
          Comments:
          <ul>
            {this.buildLis(this.state.comments)}
          </ul>
          <br/>
        </div>

      </div>
    );
  }
}

export default App;
