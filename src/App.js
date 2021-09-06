// import logo from './logo.svg';
import "./App.css";
import { Component } from "react";

import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";

import { v1 as uuid } from "uuid";

class App extends Component {
  state = {
    contacts: [],
    filter: "",
  };

  componentDidMount() {
    const contactsStorage = JSON.parse(localStorage.getItem("contacts"));
    if (contactsStorage) {
      this.setState({ contacts: contactsStorage });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.contacts !== prevState.contacts) {
      localStorage.setItem("contacts", JSON.stringify(this.state.contacts));
    }
  }

  addContact = ({ name, number }) => {
    if (
      this.state.contacts.some(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    ) {
      return alert(`${name} is already in contacts.`);
    } else {
      const newContact = {
        id: uuid(),
        name,
        number,
      };
      this.setState(({ contacts }) => ({
        contacts: [newContact, ...contacts],
      }));
    }
  };

  deleteContact = (id) => {
    this.setState((prevState) => ({
      contacts: prevState.contacts.filter((contact) => contact.id !== id),
    }));
  };

  changeFilter = (e) => {
    this.setState({ filter: e.currentTarget.value });
  };

  filterContacts = () => {
    const normalizeFilter = this.state.filter.toLowerCase();

    return this.state.contacts.filter((contact) =>
      contact.name.toLowerCase().includes(normalizeFilter)
    );
  };

  render() {
    return (
      <div className="App">
        <h1>Phonebook</h1>
        <ContactForm onSubmit={this.addContact} />

        <div className="countainer">
          <h2>Contacts</h2>
          <Filter onChange={this.changeFilter} />
          <ContactList
            contacts={this.filterContacts()}
            OnDeleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}

export default App;
