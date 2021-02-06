import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getVisibleContacts } from '../../redux/contacts-selectors';
import * as contactsOperations from '../../redux/contacts-operations';
import s from './ContactList.module.css';

function ContactList() {
  const contacts = useSelector(getVisibleContacts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(contactsOperations.fetchContacts());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <ul className={s.list}>
      {contacts.map(({ id, name, number }) => (
        <li key={id} className={s.listItem}>
          <p className={s.itemName}>
            {name}: {number}
          </p>
          <button
            type="button"
            onClick={() => dispatch(contactsOperations.deleteContact(id))}
            className={s.deleteBtn}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
}

export default ContactList;
