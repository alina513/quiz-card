import React from 'react';
import { Component } from 'react';
import { nanoid } from 'nanoid';
import { ContactsList } from './ContactsList/ContactList';
import { ContactForm } from './ContactForm/ContactForm';
import { Filter } from './Filter/Filter';

const contactKey = 'contact';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };
  componentDidMount() {
    const savedContacts = window.localStorage.getItem(contactKey);
    if (savedContacts !== null) {
      this.setState({
        contacts: JSON.parse(savedContacts),
      });
    }
  }

  componentDidUpdate(prevProps, prevstate) {
    if (prevstate.contacts !== this.state.contacts) {
      window.localStorage.setItem(
        contactKey,
        JSON.stringify(this.state.contacts)
      );
    }
  }

  addContact = ({ name, number }) => {
    const newContact = {
      name,
      number,
      id: nanoid(),
    };
    if (this.state.contacts.some(contact => contact.name === name)) {
      alert(`${name} is already in contacts`);
    } else {
      this.setState(prevState => ({
        contacts: [...prevState.contacts, newContact],
      }));
    }
  };

  updateFilter = newFilter => {
    this.setState({ filter: newFilter });
  };
  deletecontact = contactId => {
    this.setState(prevState => {
      return {
        contacts: prevState.contacts.filter(item => item.id !== contactId),
      };
    });
  };

  render() {
    const filteredContacts = this.state.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.state.filter.toLowerCase())
    );

    return (
      <div
        style={{
          height: '100vh',
          display: 'block',
          justifyContent: 'center',
          alignItems: 'center',
          fontSize: 40,
          color: '#010101',
          paddingLeft: '20px',
          paddingBottom: '20px',
        }}
      >
        <h1>Phonebook</h1>
        <ContactForm submit={this.addContact} />
        <h2>Contacts</h2>
        <Filter filter={this.state.filter} updateFilter={this.updateFilter} />
        {this.state.contacts.length > 0 && (
          <ContactsList
            contacts={filteredContacts}
            onDelete={this.deletecontact}
          />
        )}
      </div>
    );
  }
}
