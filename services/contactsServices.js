import Contact from "../db/models/Contact.js";

export const listContacts = (owner) => {
  return Contact.findAll({ where: { owner } });
};

export const getContact = (payload) => {
  return Contact.findOne({ where: payload });
};

export const removeContact = async (payload) => {
  const contact = await getContact(payload); //this object is linked to entity in the database
  if (!contact) {
    return null;
  }
  await contact.destroy(); //updates entity in the database
  return contact;
};

export const addContact = (payload) => Contact.create(payload);

export const updateContact = async (id, owner, payload) => {
  const contact = await getContact({ id, owner }); //this object is linked to entity in the database
  if (!contact) {
    return null;
  }
  await contact.update(payload); //updates entity in the database
  return contact;
};

export const updateFavoriteContact = async (id, owner, payload) => {
  const contact = await getContact({ id, owner }); //this object is linked to entity in the database
  if (!contact) {
    return null;
  }
  await contact.update(payload); //updates entity in the database
  return contact;
};
