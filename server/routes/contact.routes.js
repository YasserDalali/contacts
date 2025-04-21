import { Router } from "express";
import ContactController from "../controllers/contact.controller.js";
import AuthMiddleware from "../middlewares/auth.middleware.js";

const contactRouter = Router();
contactRouter.get("/", AuthMiddleware.authz, ContactController.getAllContacts) // ✅
contactRouter.get("/:id", AuthMiddleware.authz, ContactController.getContactById) 
contactRouter.post("/", AuthMiddleware.authz, ContactController.createContact) // ✅
contactRouter.delete("/:id", AuthMiddleware.authz, ContactController.deleteContact)
contactRouter.put("/:id/edit", AuthMiddleware.authz, ContactController.editContact)
contactRouter.put("/contact/:id/addnote", AuthMiddleware.authz, ContactController.addNote)

export default contactRouter;