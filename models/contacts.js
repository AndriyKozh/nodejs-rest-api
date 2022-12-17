const fs = require("fs/promises");
const filePath = require("./filePath");
const { v4: uuidv4 } = require("uuid");

const listContacts = async () => {
  const data = await fs.readFile(filePath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const results = await listContacts();
  const result = results.find((contact) => contact.id === contactId.toString());

  return result;
};

// const removeContact = async (contactId) => {
//   const contacts = await listContacts();

//   const filter = contacts.filter((contact) => contact.id !== contactId);
//   if (filter.length < contacts.length) {
//     await fs.writeFile(filePath, JSON.stringify(filter));
//     return contacts;
//   }
//   return null;
// };
const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index !== -1) {
    const [result] = contacts.splice(index, 1);
    await fs.writeFile(filePath, JSON.stringify(contacts, null, 2));
    return result;
  }

  return null;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const results = await listContacts();

  const newContact = { id: uuidv4(), name, email, phone };
  results.push(newContact);
  await fs.writeFile(filePath, JSON.stringify(results));
  console.log(newContact);
  return newContact;
};

const updateContact = async (contactId, body) => {
  const { name, email, phone } = body;
  const results = await listContacts();
  const contactIndex = results.findIndex((product) => product.id === contactId);
  if (contactIndex !== -1) {
    results[contactIndex].phone = phone;
    results[contactIndex].name = name;
    results[contactIndex].email = email;

    await fs.writeFile(filePath, JSON.stringify(results, null, 3));
    return results[contactIndex];
  } else {
    return null;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
