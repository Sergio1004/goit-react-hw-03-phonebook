// import logo from './logo.svg';
import "./App.css";
import { Component } from "react";

import ContactForm from "./components/ContactForm/ContactForm";
import ContactList from "./components/ContactList/ContactList";
import Filter from "./components/Filter/Filter";

import { v1 as uuid } from "uuid";

class App extends Component {
  state = {
    contacts: [
      { id: "id-1", name: "Rosie Simpson", number: "459-12-56" },
      { id: "id-2", name: "Hermione Kline", number: "443-89-12" },
      { id: "id-3", name: "Eden Clements", number: "645-17-79" },
      { id: "id-4", name: "Annie Copeland", number: "227-91-26" },
    ],
    filter: "",
  };

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
