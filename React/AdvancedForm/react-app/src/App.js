import React, { Component } from 'react';
import './App.css';
import { inputTypes } from './forms.js';

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

    this.formRef = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();

    let form = this.formRef.current;
    if(form.checkValidity()) form.submit();
  }

  renderTableRows() {
    const tableRows = Object.keys(inputTypes).map(function(key) {
      const inputObject = inputTypes[key];
      return (
        <TableRow
        key={inputObject.type}
        type={inputObject.type}
        placeholder={inputObject.placeholder}
        label={inputObject.label} />
      );
    });
    
    return tableRows;
  }

  render() {
    let handleSubmit = this.handleSubmit;

    return (
      <form
        style={{display: 'flex', flexDirection: 'column', width: '150px'}}
        ref={this.formRef}
        noValidate >
        <table>
          <tbody>
            {this.renderTableRows()}
          </tbody>
        </table>
        <Input
          type="submit"
          handleSubmit={handleSubmit.bind(this)} />

      </form>
    );
  }
}

class TableRow extends Component {
  render() {
    let id = this.props.type;
    if(id === 'datetime-local') id = 'date';

    return (
      <tr>
        <td>
        <label
          htmlFor={this.props.type}
          style={{display: 'inline-block', width: '120px', fontWeight: 'bold'}} >
          {this.props.label}:
        </label>
        </td>
        <td>
          <Input
            id={id}
            type={this.props.type}
            placeholder={this.props.placeholder} />

        </td>
      </tr>
    );
  }
}

class Input extends Component {
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
  }

  handleInput(e) {
    const name = e.target.name;
    const value = e.target.value;

    this.setState({ [name]: value });
  }

  render() {
    let width = '160px';
    if(this.props.type === 'search') width = '168px';

    if(this.props.type === 'submit') {
      return (
        <input
          type="submit"
          id="submit-form"
          value="Register"
          onClick={(e) => this.props.handleSubmit(e)}
        />
      );
    } else {
      return (
        <input
          type={this.props.type}
          id={this.props.id}
          name={this.props.type}
          placeholder={this.props.placeholder}
          value={this.state.name}
          onChange={(e) => this.handleInput(e)}
          style={{width: width}}
          required
        />
      );
    }
  }
}

export default App;
