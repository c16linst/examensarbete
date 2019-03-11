import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      welcomeVisibility: this.setWelcomeVisibility(),
      email: '',
    }
  }

  setWelcomeVisibility() {
    if(localStorage.getItem('welcomeVisibility') === 'true') return true;
    else return false;
  }

  updateEmail(email) {
    localStorage.setItem('email', email);

    this.setState(
      { email: email }
    );
  }

  resultMsg() {
    if(this.state.welcomeVisibility === true) return <Result email={this.state.email} />
  }

  render() {
    var updateEmail = this.updateEmail;
    var setWelcomeVisibility = this.setWelcomeVisibility;

    return (
      <div className="App">
        <Form updateEmail={updateEmail.bind(this)} setWelcomeVisibility={setWelcomeVisibility.bind(this)} />
      </div>
    );
  }
}

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: localStorage.getItem('email'),
    }
  }

  render() {
    return (
      <div>
        <h4>Results:</h4>
        {this.state.email}
      </div>
    );
  }
}

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      emailValid: false,
      formValid: false,
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

  checkState() {
    if(this.state.emailValid) {
      this.props.updateEmail(this.state.email);
      this.props.setWelcomeVisibility(true);
      localStorage.setItem('welcomeVisibility', true);
    }
  }

  render() {
    return (
      <form
        onSubmit={() => this.checkState()}
        style={{display: 'flex', flexDirection: 'column', width: '150px'}}>
        <table>
          <tbody>
            <tr>
              <td>
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  placeholder="example@test.com"
                  style={{width: '160px'}}
                  value={this.state.email}
                  onChange={(e) => this.handleInput(e)}
                  required
                />
              </td>
              <td>{this.state.emailValid.toString()}</td>
            </tr>
          </tbody>
        </table>
        <input
          id="submit-form"
          type="submit"
          value="Submit"
        />
      </form>
    );
  }
}

export default App;
