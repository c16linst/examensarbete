import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resultVisibility: this.setResultVisibility(),
      search: '',
    }
  }

  setResultVisibility() {
    if(localStorage.getItem('ResultVisibility') === 'true') return true;
    else return false;
  }

  updateSearch(search) {
    localStorage.setItem('search', search);

    this.setState(
      { search: search }
    );
  }

  resultMsg() {
    if(this.state.resultVisibility === true) return <Result search={this.state.search} />
  }

  render() {
    var updateSearch = this.updateSearch;
    var setResultVisibility = this.setResultVisibility;

    return (
      <div>
        <Form updateSearch={updateSearch.bind(this)} setResultVisibility={setResultVisibility.bind(this)} />
        {this.resultMsg()}
      </div>
    );
  }
}

class Result extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: localStorage.getItem('search'),
    }
  }

  render() {
    return (
      <div>
        <h4>Results:</h4>
        {this.state.search}
      </div>
    );
  }
}

class Form extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',
      searchValid: false,
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
    let searchValid = this.state.searchValid;
    searchValid = (validity.valid) ? true : false;

    this.setState(
      { searchValid: searchValid,
        formValid: searchValid }
    );
  }

  checkState() {
    if(this.state.searchValid) {
      this.props.updateSearch(this.state.search);
      this.props.setResultVisibility(true);
      localStorage.setItem('ResultVisibility', true);
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
                  id="search-input"
                  type="search"
                  name="search"
                  placeholder="Search..."
                  style={{width: '160px'}}
                  value={this.state.search}
                  onChange={(e) => this.handleInput(e)}
                  required
                />
              </td>
              <td>{this.state.searchValid.toString()}</td>
            </tr>
          </tbody>
        </table>
        <input
          id="submit-form"
          type="submit"
          value="Search"
        />
      </form>
    );
  }
}

export default App;
