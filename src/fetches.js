import axios from 'axios';

export const getPosts = (username)=>(
  axios.get(`https://www.reddit.com/user/${username}/submitted.json`)
)

export const getComments = (username) =>(
  axios.get(`https://www.reddit.com/user/${username}/comments.json`)
)
