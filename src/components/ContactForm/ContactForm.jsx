import React from 'react';
import { Component } from 'react';
import css from './ContactForm.module.css';
export class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = event => {
    event.preventDefault();

    const name = this.state.name;
    const number = this.state.number;

    this.props.submit({ name, number });
    event.target.reset();
  };

  render() {
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <label className={css.label} htmlFor="name">
          Name
        </label>
        <input
          className={css.input}
          type="text"
          name="name"
          id="name"
          onChange={this.handleInputChange}
          required
        />
        <label className={css.label} htmlFor="number">
          Number
        </label>
        <input
          className={css.input}
          type="tel"
          name="number"
          id="number"
          onChange={this.handleInputChange}
          required
        />
        <button className={css.button} type="submit">
          Add contact
        </button>
      </form>
    );
  }
}
