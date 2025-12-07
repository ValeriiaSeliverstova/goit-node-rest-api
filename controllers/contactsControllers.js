import * as contactsService from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";

export const getAllContacts = async (req, res) => {
  const { id: owner } = req.user;
  const contacts = await contactsService.listContacts(owner);
  res.json(contacts);
};

export const getOneContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const contact = await contactsService.getContact({ id, owner });
  if (!contact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(contact);
};

export const deleteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const deletedContact = await contactsService.removeContact({ id, owner });
  if (!deletedContact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json({ message: "Contact deleted successfully" });
};

export const createContact = async (req, res) => {
  const { id: owner } = req.user;
  const newContact = await contactsService.addContact({ ...req.body, owner });
  res.status(201).json(newContact);
};

export const updateContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const updatedContact = await contactsService.updateContact(
    id,
    owner,
    req.body
  );
  if (!updatedContact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(updatedContact);
};

export const updateFavoriteContact = async (req, res) => {
  const { id } = req.params;
  const { id: owner } = req.user;
  const updatedFavoriteContact = await contactsService.updateFavoriteContact(
    id,
    owner,
    req.body
  );
  if (!updatedFavoriteContact) {
    throw HttpError(404, `Contact with id=${id} not found`);
  }

  res.json(updatedFavoriteContact);
};
