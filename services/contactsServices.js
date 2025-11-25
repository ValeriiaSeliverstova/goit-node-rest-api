import Contact from "../db/models/contact.js";

export function listContacts() {
  const data = Contact.findAll();
  return data;
}

export const getContactById = (contactId) => Contact.findByPk(contactId);

export const removeContact = async (contactId) => {
  const contact = await getContactById(contactId); //this object is linked to entity in the database
  if (!contact) {
    return null;
  }
  await contact.destroy(); //updates entity in the database
  return contact;
};

export const addContact = (payload) => Contact.create(payload);

export const updateContact = async (contactId, payload) => {
  const contact = await getContactById(contactId); //this object is linked to entity in the database
  if (!contact) {
    return null;
  }
  await contact.update(payload); //updates entity in the database
  return contact;
};

export const updateFavoriteContact = async (contactId, payload) => {
  const contact = await getContactById(contactId); //this object is linked to entity in the database
  if (!contact) {
    return null;
  }
  await contact.update(payload); //updates entity in the database
  return contact;
};
