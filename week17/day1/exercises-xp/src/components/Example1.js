import React, { Component } from 'react';
import data from '../data/data.json';

class Example1 extends Component {
  render() {
    return (
      <div className="container mt-4">
        <h3>Social Medias</h3>
        <ul className="list-group">
          {data.SocialMedias.map((social, index) => (
            <li key={index} className="list-group-item">
              <a href={social} target="_blank" rel="noopener noreferrer">
                {social}
              </a>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Example1;