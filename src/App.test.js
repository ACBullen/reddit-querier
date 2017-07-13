import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import renderer from "react-test-renderer";
import {shallow} from "enzyme";
import rest from 'rest';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
});

it('fetches posts and comments', ()=> {
  const component = shallow(<App />);
  component.state.username = "kijafa";
  component.find('button').simulate('click');
  return component.state.posts.length === 25 && component.state.comments.length === 25;
});
