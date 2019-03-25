import React, { Component } from 'react';
import { inputTypes } from './forms.js';
import { inputAmount } from './random-numbers-10000-1-20.js';
import { inputType } from './random-numbers-10000-1-10.js';
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

    this.formRef = React.createRef();
  }

  handleSubmit(e) {
    e.preventDefault();

    let form = this.formRef.current;
    if(form.checkValidity()) form.submit();
  }

  // Returns a matrix with a specified amount of forms that
  // contains different input types
  createFormsMatrix(amount) {
    var type = inputType;
    var formsMatrix = [];

    for(let i = 0; i < amount; i++) {
      formsMatrix.push(inputAmount[i]);

      var inputs = [];
      for(let y = 0; y < inputAmount[i]; y++) {
        inputs[y] = type[y];
        formsMatrix[i] = inputs;

        type.shift();
      }
    }

    return formsMatrix;
  }

  // Create a new array of forms with TableRows inside
  // Each TableRow will contain an input based on the formsMatrix
  generateTableRows(formsMatrix) {
    var forms = [];
    var tableRows = [];

    formsMatrix.forEach(function(form) {
      form.forEach(function(type, index) {
        var inputObject = inputTypes[type-1];

        tableRows.push(
          <TableRow
          key={'input' + index}
          type={inputObject.type}
          placeholder={inputObject.placeholder}
          label={inputObject.label} />
        );
      });

      forms.push(tableRows);
      tableRows = [];
    });

    return forms;
  }

  renderTableRows() {
    // formsAmount is the only variable that should be changed!
    // It sets the amount of different forms that should exist
    const formsAmount = 4;
    const forms = this.generateTableRows(this.createFormsMatrix(formsAmount));

    // formIndex will be set in the GreaseMonkey script
    var formIndex = localStorage.getItem('formIndex');
    if(formIndex === null || formIndex === '') formIndex = 0;

    // The forms array contains a set of TableRows at index formIndex
    return forms[formIndex];
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
