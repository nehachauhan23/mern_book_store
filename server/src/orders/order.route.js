import express from "express";
import { createNewOrder, getOrdersByEmail } from "./order.controller.js";

const router = express.Router();

//create order 
router.post("/newOrder", createNewOrder);

// get orders by email 
router.get("/email/:email", getOrdersByEmail);

export default router;
