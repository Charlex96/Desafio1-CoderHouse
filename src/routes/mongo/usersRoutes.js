import { Router } from "express";
import upload from "../middlewares/multer.js";
import { upgradeToPremium, uploadDocuments } from "../../controllers/users.controller.js";

const router = Router();

router.patch("/premium/:uid", upgradeToPremium);
router.post("/:uid/documents", upload.array('document'), uploadDocuments);

export default router;
