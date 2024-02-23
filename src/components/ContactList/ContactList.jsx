import PropTypes from "prop-types";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  selectContacts,
  selectIsLoading,
  selectError,
  selectFilter,
} from "../../redux/selectors/contactsSelectors";
import {
  deleteContact,
  fetchContacts,
} from "../../redux/operations/operations";
const ContactList = () => {
  const dispatch = useDispatch();

  const filter = useSelector(selectFilter);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectError);
  const contacts = useSelector(selectContacts);

  console.log(contacts);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  const filteredContacts = contacts
    ? contacts.filter((contact) =>
        contact.name.toLowerCase().includes(filter.toLowerCase())
      )
    : [];

  return (
    <ul>
      {filteredContacts.map((contact) => (
        <li key={contact.id}>
          {contact.name}: {contact.phone}
          <button onClick={() => dispatch(deleteContact(contact.id))}>
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default ContactList;

ContactList.propTypes = {
  contacts: PropTypes.array,
};
