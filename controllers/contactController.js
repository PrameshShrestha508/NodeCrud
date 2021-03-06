// const Product = require("../model/Product");
// import { use } from "express/lib/application";
import Contact from "../models/Contact.js";
import { mailer, mailerAdmin } from "../utils/mailers.js";
export const contactAll = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.json(contacts);
  } catch (error) {
    res.json({ message: "Data is not available" });
  }
};

export const contactDetails = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.contactId);
    res.json(contact);
  } catch (error) {
    res.json({ message: "Data is not available" });
  }
};

export const contactCreate = async (req, res) => {
  let { username, email, message } = req.body;
  //   password = Bcrypt.hashSync(password, 10);
  const contactModel = new Contact({
    username: username,
    email: email,
    message: message,
  });
  try {
    const savedContact = await contactModel.save();
    await mailer(email, username);
    await mailerAdmin({ username, email, message });
    res.send({
      savedContact,
      message: "Contact Added Successfully",
      statusCode: 200,
    });
    // res.send("data created succesffully");
  } catch (error) {
    res.status(400).send(error);
  }
};

export const contactUpdate = async (req, res) => {
  try {
    let { username, email, message } = req.body;
    // password = Bcrypt.hashSync(password, 10);
    const contact = {
      username: username,
      email: email,
      message: message,
    };
    const updateContact = await Contact.findByIdAndUpdate(
      { _id: req.params.contactId },
      contact,
      { new: true }
    );
    res.json({
      updateContact,
      message: "Contact Updated Successfully",
      statusCode: 200,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

export const contactDelete = async (req, res) => {
  try {
    const removecontact = await Contact.findByIdAndDelete(req.params.contactId);
    res.json({
      message: "Contacts Deleted Successfully",
      statusCode: 200,
    });
  } catch (error) {
    res.json({ message: error });
  }
};

// module.exports = {
//   product_all,
//   product_details,
//   product_create,
//   product_update,
//   product_delete,
// };
