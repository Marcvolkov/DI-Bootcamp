import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      inputValue: '',
      responseMessage: ''
    };
  }

  async componentDidMount() {
    try {
      const response = await fetch('http://localhost:5000/api/hello');
      const data = await response.json();
      this.setState({ message: data.message });
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }

  handleInputChange = (event) => {
    this.setState({ inputValue: event.target.value });
  }

  handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/world', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input: this.state.inputValue })
      });
      const data = await response.json();
      this.setState({ responseMessage: data.message });
    } catch (error) {
      console.error('Error posting data:', error);
    }
  }

  render() {
    return (
      <div className="App">
        <div style={{ padding: '20px' }}>
          <h1>{this.state.message}</h1>
          
          <form onSubmit={this.handleSubmit} style={{ marginTop: '20px' }}>
            <div>
              <input
                type="text"
                value={this.state.inputValue}
                onChange={this.handleInputChange}
                placeholder="Type something..."
                style={{
                  padding: '10px',
                  fontSize: '16px',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  marginRight: '10px',
                  width: '300px'
                }}
              />
              <button 
                type="submit"
                style={{
                  padding: '10px 20px',
                  fontSize: '16px',
                  backgroundColor: '#007bff',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                Submit
              </button>
            </div>
          </form>

          {this.state.responseMessage && (
            <div style={{ 
              marginTop: '20px', 
              padding: '15px', 
              backgroundColor: '#f8f9fa', 
              border: '1px solid #dee2e6',
              borderRadius: '4px'
            }}>
              <p>{this.state.responseMessage}</p>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;
