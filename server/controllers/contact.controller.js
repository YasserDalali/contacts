import Contact from "../models/Contact.model.js";
import mongoose from "mongoose";

class ContactController {
  static async createContact(req, res) {
    const session = await mongoose.startSession();
    try {
      session.startTransaction();
      const { name, phone = "", email = "", notes = [] } = req.body;
      const userId = req.user._id; // From auth middleware

      if (!name) {
        throw new Error("Please insert a name!");
      }

      const existingEmail = email
        ? await Contact.findOne({ email, userId })
        : null;
      const existingName = await Contact.findOne({ name, userId });
      const existingPhone = await Contact.findOne({ phone, userId });

      if (existingEmail || existingName || existingPhone) {
        throw new Error("Name/Email/Phone already exists for this user");
      }

      const newContact = await Contact.create(
        [
          {
            name,
            phone,
            email,
            notes,
            userId,
            creation_date: new Date(),
          },
        ],
        { session }
      );

      await session.commitTransaction();
      res.status(201).json({
        message: "Successfully added contact",
        data: newContact[0],
      });
    } catch (error) {
      await session.abortTransaction();
      res.status(400).json({
        message: error.message || "Failed to create contact",
      });
    } finally {
      await session.endSession();
    }
  }

  static async deleteContact(req, res) {
    try {
      const contactId = req.params.id;
      const userId = req.user._id;

      const deletedContact = await Contact.findOneAndDelete({
        _id: contactId,
        userId: userId,
      });

      if (!deletedContact) {
        throw new Error("Contact not found or unauthorized");
      }

      res.status(200).json({
        message: "Contact deleted successfully",
        data: deletedContact,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message || "Failed to delete contact",
      });
    }
  }

  static async editContact(req, res) {
    try {
      const contactId = req.params.id;
      const userId = req.user._id;
      const updates = req.body;

      const updatedContact = await Contact.findOneAndUpdate(
        { _id: contactId, userId },
        updates,
        { new: true }
      );

      if (!updatedContact) {
        throw new Error("Contact not found or unauthorized");
      }

      res.status(200).json({
        message: "Contact updated successfully",
        data: updatedContact,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message || "Failed to update contact",
      });
    }
  }

  static async addNote(req, res) {
    try {
      const contactId = req.params.id;
      const userId = req.user._id;
      const { note } = req.body;

      if (!note) {
        throw new Error("Note content is required");
      }

      const updatedContact = await Contact.findOneAndUpdate(
        { _id: contactId, userId },
        { $push: { notes: note } },
        { new: true }
      );

      if (!updatedContact) {
        throw new Error("Contact not found or unauthorized");
      }

      res.status(200).json({
        message: "Note added successfully",
        data: updatedContact,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message || "Failed to add note",
      });
    }
  }

  static async getAllContacts(req, res) {
    try {
      const userId = req.user._id;
      const contacts = await Contact.find({ userId });

      res.status(200).json({
        message: "Contacts retrieved successfully",
        data: contacts,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message || "Failed to retrieve contacts",
      });
    }
  }

  static async getContactById(req, res) {
    try {
      const userId = req.user._id;
      const contactId = req.params.id;

      const contact = await Contact.findOne({
        _id: contactId,
        userId: {
          $oid: userId,
        },
      });

      if (!contact) {
        throw new Error("Contact not found or unauthorized");
      }

      res.status(200).json({
        message: "Contact retrieved successfully",
        data: contact,
      });
    } catch (error) {
      res.status(400).json({
        message: error.message || "Failed to retrieve contact",
      });
    }
  }
}

export default ContactController;
