import express from "express";

import {
  createABook,
  deleteById,
  getAllBooks,
  getBookById,
  updateBookById,
} from "./book.controller.js";
import { addBooks } from "./insertdata.js";
import verifyAdminToken from "../../middleware/verifyAdminToken.js";

const router = express.Router();

router.post("/create-book", verifyAdminToken, createABook);

// get all books
router.get("/", getAllBooks);

// get book by id
router.get("/:id", getBookById);

//update by id
router.put("/update/:id", verifyAdminToken, updateBookById);

//delete by id
router.delete("/:id", verifyAdminToken, deleteById);

router.post("/addData", verifyAdminToken , addBooks);

export default router;
