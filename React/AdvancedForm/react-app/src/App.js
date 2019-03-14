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
      tel: '',
      url: '',
      number: '',
      password: '',
      date: '',
      month: '',
      week: '',
      search: '',
      textValid: false,
      emailValid: false,
      telValid: false,
      urlValid: false,
      numberValid: false,
      passwordValid: false,
      dateValid: false,
      monthValid: false,
      weekValid: false,
      searchValid: false,
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
    let textValid = this.state.textValid;
    let emailValid = this.state.emailValid;
    let telValid = this.state.telValid;
    let urlValid = this.state.urlValid;
    let numberValid = this.state.numberValid;
    let passwordValid = this.state.passwordValid;
    let dateValid = this.state.dateValid;
    let monthValid = this.state.monthValid;
    let weekValid = this.state.weekValid;
    let searchValid = this.state.searchValid;

    switch(name) {
      case 'text':
        textValid = (validity.valid) ? true : false;
        break;
      case 'email':
        emailValid = (validity.valid) ? true : false;
        break;
      case 'tel':
        telValid = (validity.valid) ? true : false;
        break;
      case 'url':
        urlValid = (validity.valid) ? true : false;
        break;
      case 'number':
        numberValid = (validity.valid) ? true : false;
        break;
      case 'password':
        passwordValid = (validity.valid) ? true : false;
        break;
      case 'datetime-local':
        dateValid = (validity.valid) ? true : false;
        break;
      case 'month':
        monthValid = (validity.valid) ? true : false;
        break;
      case 'week':
        weekValid = (validity.valid) ? true : false;
        break;
      case 'search':
        searchValid = (validity.valid) ? true : false;
        break;
      default:
        break;
    }

    this.setState(
      { textValid: textValid,
        emailValid: emailValid,
        telValid: telValid,
        urlValid: urlValid,
        numberValid: numberValid,
        passwordValid: passwordValid,
        dateValid: dateValid,
        monthValid: monthValid,
        weekValid: weekValid,
        searchValid: searchValid,
        formValid:  this.state.textValid &&
                    this.state.emailValid &&
                    this.state.telValid &&
                    this.state.urlValid &&
                    this.state.numberValid &&
                    this.state.passwordValid &&
                    this.state.dateValid &&
                    this.state.monthValid &&
                    this.state.weekValid &&
                    this.state.searchValid }
    );
  }

  tablerow(type, placeholder, label, options) {
    var width = '160px';
    if(options === 'search') width = '168px';

    var id = type;
    if(options === 'date') id = 'date';

    return (
      <tr>
        <td>
        <label
          htmlFor={type}
          style={{display: 'inline-block', width: '120px', fontWeight: 'bold'}} >
          {label}:
        </label>
        </td>
        <td>
          <input
            type={type}
            id={id}
            name={type}
            placeholder={placeholder}
            value={this.state.name}
            onChange={(e) => this.handleInput(e)}
            style={{width: width}}
            required
          />
        </td>
        <td>{this.inputValidity(type)}</td>
      </tr>
    );
  }

  inputValidity(type) {
    switch(type) {
      case 'text':
        return this.state.textValid.toString();
      case 'email':
        return this.state.emailValid.toString();
      case 'tel':
        return this.state.telValid.toString();
      case 'url':
        return this.state.urlValid.toString();
      case 'number':
        return this.state.numberValid.toString();
      case 'password':
        return this.state.passwordValid.toString();
      case 'datetime-local':
        return this.state.dateValid.toString();
      case 'month':
        return this.state.monthValid.toString();
      case 'week':
        return this.state.weekValid.toString();
      case 'search':
        return this.state.searchValid.toString();
      default:
        break;
    }
  }

  render() {
    return (
      <form style={{display: 'flex', flexDirection: 'column', width: '150px'}} >
        <table>
          <tbody>
            {this.tablerow('text', 'Anything', 'Text')}
            {this.tablerow('email', 'example@test.com', 'E-mail')}
            {this.tablerow('tel', '+4676 123 45 67', 'Telephone')}
            {this.tablerow('url', 'http://www.exampleweb.ex', 'URL')}
            {this.tablerow('number', '12345', 'Number')}
            {this.tablerow('password', 'Anything', 'Password')}
            {this.tablerow('datetime-local', '2019-01-01T09:30', 'Date-time', 'date')}
            {this.tablerow('month', '2019-01', 'Month')}
            {this.tablerow('week', '2019-W01', 'Week')}
            {this.tablerow('search', 'Anything', 'Search', 'search')}
          </tbody>
        </table>
        <input
          type="submit"
          id="submit-form"
          value="Register"
        />
      </form>
    );
  }
}

export default App;
