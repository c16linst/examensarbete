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
      username: '',
      email: '',
      fname: '',
      lname: '',
      phone: '',
      age: '',
      address: '',
      zipcode: '',
      website: '',
      password: '',
      usernameValid: false,
      emailValid: false,
      fnameValid: false,
      lnameValid: false,
      phoneValid: false,
      ageValid: false,
      addressValid: false,
      zipcodeValid: false,
      websiteValid: false,
      passwordValid: false,
      formValid: false
    }
  }

  handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;
    const validity = e.target.validity;

    this.setState(
      { [name]: value },
      () => { this.validate(name, validity) }
    );
  }

  validate(name, validity) {
    let usernameValid = this.state.usernameValid;
    let emailValid = this.state.emailValid;
    let fnameValid = this.state.fnameValid;
    let lnameValid = this.state.lnameValid;
    let phoneValid = this.state.phoneValid;
    let ageValid = this.state.ageValid;
    let addressValid = this.state.addressValid;
    let zipcodeValid = this.state.zipcodeValid;
    let websiteValid = this.state.websiteValid;
    let passwordValid = this.state.passwordValid;

    switch(name) {
      case 'username':
        usernameValid = (validity.valid) ? true : false;
        break;
      case 'email':
        emailValid = (validity.valid) ? true : false;
        break;
      case 'fname':
        fnameValid = (validity.valid) ? true : false;
        break;
      case 'lname':
        lnameValid = (validity.valid) ? true : false;
        break;
      case 'phone':
        phoneValid = (validity.valid) ? true : false;
        break;
      case 'age':
        ageValid = (validity.valid) ? true : false;
        break;
      case 'address':
        addressValid = (validity.valid) ? true : false;
        break;
      case 'zipcode':
        zipcodeValid = (validity.valid) ? true : false;
        break;
      case 'website':
        websiteValid = (validity.valid) ? true : false;
        break;
      case 'password':
        passwordValid = (validity.valid) ? true : false;
        break;
      default:
        break;
    }

    this.setState(
      { usernameValid: usernameValid,
        emailValid: emailValid,
        fnameValid: fnameValid,
        lnameValid: lnameValid,
        phoneValid: phoneValid,
        ageValid: ageValid,
        addressValid: addressValid,
        zipcodeValid: zipcodeValid,
        websiteValid: websiteValid,
        passwordValid: passwordValid,
        formValid:  this.state.usernameValid &&
                    this.state.emailValid &&
                    this.state.fnameValid &&
                    this.state.lnameValid &&
                    this.state.phoneValid &&
                    this.state.ageValid &&
                    this.state.addressValid &&
                    this.state.zipcodeValid &&
                    this.state.websiteValid &&
                    this.state.passwordValid }
    );
  }

  tablerow(type, name, placeholder, label) {
    return (
      <tr>
        <td>
        <label
          htmlFor={name}
          style={{display: 'inline-block', width: '120px'}} >
          {label}:
        </label>
        </td>
        <td>
          <input
            type={type}
            name={name}
            placeholder={placeholder}
            value={this.state.name}
            onChange={(e) => this.handleInput(e)}
            style={{width: '160px'}}
            required
          />
        </td>
        <td>
          {this.inputValidity(name)}
        </td>
      </tr>
    );
  }

  inputValidity(name) {
    switch(name) {
      case 'username':
        return this.state.usernameValid.toString();
      case 'email':
        return this.state.emailValid.toString();
      case 'fname':
        return this.state.fnameValid.toString();
      case 'lname':
        return this.state.lnameValid.toString();
      case 'phone':
        return this.state.phoneValid.toString();
      case 'age':
        return this.state.ageValid.toString();
      case 'address':
        return this.state.addressValid.toString();
      case 'zipcode':
        return this.state.zipcodeValid.toString();
      case 'website':
        return this.state.websiteValid.toString();
      case 'password':
        return this.state.passwordValid.toString();
    }
  }

  render() {
    return (
      <form style={{display: 'flex', flexDirection: 'column', width: '150px'}} >
        <table>
          <tbody>
            {this.tablerow('text', 'username', 'Username123', 'Username')}
            {this.tablerow('email', 'email', 'example@email.com', 'E-mail')}
            {this.tablerow('text', 'fname', 'John', 'First name')}
            {this.tablerow('text', 'lname', 'Doe', 'Last name')}
            {this.tablerow('text', 'phone', '+4676 123 45 67', 'Phone number')}
            {this.tablerow('number', 'age', '23', 'Age')}
            {this.tablerow('text', 'address', 'Addressway 10', 'Address')}
            {this.tablerow('number', 'zipcode', '12345', 'Zip code')}
            {this.tablerow('url', 'website', 'http://www.exampleweb.ex', 'Website')}
            {this.tablerow('password', 'password', '', 'Password')}
          </tbody>
        </table>
        <input
          type="submit"
          value="Registrera"
          disabled={!this.state.formValid}
        />
      </form>
    );
  }
}

export default App;
