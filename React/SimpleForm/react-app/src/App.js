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
    if(localStorage.getItem('WelcomeVisibility') === 'true') return true;
    else return false;
  }

  updateEmail(email) {
    localStorage.setItem('email', email);

    this.setState(
      { email: email }
    );
  }

  welcomeMsg() {
    if(this.state.welcomeVisibility === true) return <Welcome email={this.state.email} />
  }

  render() {
    var updateEmail = this.updateEmail;
    var setWelcomeVisibility = this.setWelcomeVisibility;

    return (
      <div>
        <Form updateEmail={updateEmail.bind(this)} setWelcomeVisibility={setWelcomeVisibility.bind(this)} />
        {this.welcomeMsg()}
      </div>
    );
  }
}

class Welcome extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: localStorage.getItem('email'),
    }
  }

  render() {
    return (
      <div>
        <p>You have entered the email <b>{this.state.email}</b></p>
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
      localStorage.setItem('WelcomeVisibility', true);
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
                <label
                  htmlFor="email"
                  style={{fontWeight: 'bold', width: '120px'}}>
                  E-mail:
                </label>
              </td>
              <td>
                <input
                  id="email-input"
                  type="email"
                  name="email"
                  placeholder="E-mail"
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
          value="Registrera"
        />
      </form>
    );
  }
}

export default App;
