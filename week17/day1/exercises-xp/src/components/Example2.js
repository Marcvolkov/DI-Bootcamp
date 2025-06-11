import React, { Component } from 'react';
import data from '../data/data.json';

class Example2 extends Component {
  render() {
    return (
      <div className="container mt-4">
        <h3>Skills</h3>
        {data.Skills.map((skillArea, index) => (
          <div key={index} className="mb-4">
            <h4>{skillArea.Area}</h4>
            <div className="row">
              {skillArea.SkillSet.map((skill, skillIndex) => (
                <div key={skillIndex} className="col-md-6 mb-2">
                  <div className={`card ${skill.Hot ? 'border-danger' : 'border-secondary'}`}>
                    <div className="card-body">
                      <h6 className="card-title">
                        {skill.Name} 
                        {skill.Hot && <span className="badge bg-danger ms-2">Hot</span>}
                      </h6>
                    </div>
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

export default Example2;