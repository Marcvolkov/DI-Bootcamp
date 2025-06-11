import React, { Component } from 'react';
import data from '../data/data.json';

class Example3 extends Component {
  render() {
    return (
      <div className="container mt-4">
        <h3>Experiences</h3>
        {data.Experiences.map((experience, index) => (
          <div key={index} className="card mb-4">
            <div className="card-body">
              <div className="d-flex align-items-center mb-3">
                <img 
                  src={experience.logo} 
                  alt={`${experience.companyName} logo`}
                  className="me-3"
                  style={{width: '50px', height: '50px'}}
                />
                <div>
                  <h5 className="card-title mb-0">{experience.companyName}</h5>
                  <a href={experience.url} target="_blank" rel="noopener noreferrer">
                    {experience.url}
                  </a>
                </div>
              </div>
              
              {experience.roles.map((role, roleIndex) => (
                <div key={roleIndex} className="border-top pt-3">
                  <h6>{role.title}</h6>
                  <p>{role.description}</p>
                  <p className="text-muted">
                    {role.startDate} - {role.endDate}
                  </p>
                  <div>
                    <strong>Technologies: </strong>
                    {role.technologies.map((tech, techIndex) => (
                      <span key={techIndex} className="badge bg-primary me-1">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default Example3;