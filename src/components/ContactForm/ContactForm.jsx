import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addContact } from "../../redux/operations/operations";
import { selectContacts } from "../../redux/selectors/contactsSelectors";

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const normalizedName = name.toLowerCase();
    const isAdded = contacts.find(
      (el) => el.name.toLowerCase() === normalizedName
    );

    if (isAdded) {
      console.log(`${name}: is already in contacts`);
      return;
    }

    dispatch(addContact({ name, phone }));
    setName("");
    setPhone("");
  };

  const handleChangeName = (e) => {
    setName(e.target.value);
  };
  const handleChangeNumber = (e) => {
    setPhone(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        value={name}
        onChange={handleChangeName}
        required
      />
      <input
        type="tel"
        name="number"
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        value={phone}
        onChange={handleChangeNumber}
        required
      />
      <button type="submit">Add contact</button>
    </form>
  );
};

export default ContactForm;
