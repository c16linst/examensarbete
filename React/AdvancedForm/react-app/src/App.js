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
      search: ''
    }

    this.formRef = React.createRef();
  }

  handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
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
      </tr>
    );
  }

  handleSubmit(e) {
    e.preventDefault();

    let form = this.formRef.current;
    if(form.checkValidity()) form.submit();
  }

  render() {
    return (
      <form
        style={{display: 'flex', flexDirection: 'column', width: '150px'}}
        ref={this.formRef}
        noValidate >
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
          onClick={(e) => this.handleSubmit(e)}
        />
      </form>
    );
  }
}

export default App;
