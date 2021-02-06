import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from '../../redux/contacts-selectors';
import * as contactsOperations from '../../redux/contacts-operations';
import s from './ContactForm.module.css';

export default function ContactForm() {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleChange = e => {
    const { name, value } = e.currentTarget;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };
  const contactCheck = () => {
    if (
      contacts.find(
        contact => contact.name.toLowerCase() === name.toLowerCase(),
      )
    ) {
      alert(`${name} is already in contacts`);
      return true;
    }
    if (name === '' || number === '') {
      alert('Please fill in all the fields');
      return true;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (contactCheck()) {
      reset();
      return;
    }

    dispatch(contactsOperations.addContact(name, number));

    reset();
  };

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
    <form onSubmit={handleSubmit} className={s.form}>
      <label>
        Name
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={name}
          onChange={handleChange}
          className={s.name}
        />
      </label>
      <label>
        Number
        <input
          type="text"
          name="number"
          placeholder="Enter your mobile number"
          value={number}
          onChange={handleChange}
          className={s.number}
        />
      </label>

      <button type="submit" className={s.button}>
        Add contact
      </button>
    </form>
  );
}
