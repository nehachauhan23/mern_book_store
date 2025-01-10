import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import bookRoutes from "./src/books/book.route.js";
import cors from "cors";
import orderRoutes from "./src/orders/order.route.js"
import userRoutes from "./src/users/user.route.js";
import adminRoute from "./src/stats/admin.stats.js";

const app = express();

const port = process.env.PORT || 3000;

dotenv.config();

//middleware 
app.use(express.json());
app.use(cors({
  origin: ['http://localhost:5174'],
  credentials: true
}))

//routes
app.use("/api/books", bookRoutes);
app.use("/api/orders", orderRoutes);
app.use('/api/auth', userRoutes);
app.use("/api/admin", adminRoute);

async function main(){
  await mongoose.connect(process.env.MONGODB_CONNECTION);
  app.use('/', (req, res) => {
    res.send("Book store server is running");
  });
}

main().then(() => console.log( " mongodb connect successfully")).catch(err => console.log(err));

app.listen(port, () =>{
  console.log(`Listening : ${port}`)
});


