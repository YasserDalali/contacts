import { Router } from "express";
import ContactController from "../controllers/contact.controller.js";

const contactRouter = Router();
contactRouter.get("/", ContactController.getAllContacts)
contactRouter.get("/:id", ContactController.getContactById)
contactRouter.post("/", ContactController.createContact)
contactRouter.delete("/:id", ContactController.addNote)
contactRouter.put("/:id/edit", ContactController.addNote)
contactRouter.put("/contact/:id/addnote", ContactController.addNote)

export default contactRouter;