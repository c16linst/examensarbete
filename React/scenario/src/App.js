import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <Form />
    );
  }
}

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailValid: false,
      formValid: false
    }
  }

  handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    const validity = e.target.validity;

    this.setState(
      { [name]: value },
      () => { this.validate(validity) }
    );
  }

  validate(validity) {
    let emailValid = this.state.emailValid;
    emailValid = (validity.valid) ? true : false;

    this.setState(
      { emailValid: emailValid,
        formValid: emailValid }
    );
  }

  render() {
    return (
      <form style={{display: 'flex', flexDirection: 'column', width: '150px'}} >
        <input
          type="email"
          name="email"
          placeholder="E-mail"
          value={this.state.email}
          onChange={(e) => this.handleInput(e)}
        />
        <input
          type="submit"
          disabled={!this.state.formValid}
        />
      </form>
    );
  }
}

export default App;
