
import Book from "./book.model.js";


export const createABook = async (req, res) => {
  try {
    console.log("data: ", req.body);
    const newBook = await Book({ ...req.body });
    await newBook.save();
    res.status(200).send({
      message: "Book posted successfully",
      book: newBook,
    });
  } catch (error) {
    console.error("Error creating book", error);
    res.status(500).send({
      message: "Failed to create book",
    });
  }
}

export const getAllBooks = async(req, res) =>{
  try {
    const books = await Book.find();
    res.status(200).send(books);
    console.log("books were fetched:", books);
    

  } catch (error) {
    console.error("Error fetching books", error);
    res.status(500).send({
      message: "Failed to fetch books"
    })
  }
}

export const getBookById = async(req, res) => {
  try{
    const {id} = req.params;
    const book = await Book.findById(id);    
    if(!book){
      res.status(404).send({
        message: "Book not found"
      })
    }
    res.status(200).send(book);
  }catch(error){
    console.error("Error fetching the book data" , error);
    res.status(500).send({ message: "Error fetching the book data"})
  }
}

export const updateBookById = async(req, res) => {
  try{
    const {id} = req.params;
    const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true});
    if(!updatedBook){
      res.status(404).send({ message: "Book is not found "})
    }
    res.status(200).send({
      message: "Book updated successfully",
      book: updatedBook
    });
  }catch(error){
    console.error("Error updating the book data" , error);
    res.status(500).send({ message: "Error updating the book data"})
  }
}

export const deleteById = async(req, res) =>{
  try{
    const {id} = req.params;
    const deletedBook = await Book.findByIdAndDelete(id);
    if(!deletedBook){
      res.status(404).send({ message: "Book not found!"});
    }
    res.status(200).send({
      message: "Book deleted successfully",
      id: id
    })
  }catch{
    console.error("Error deleting the book", error);
    res.status(500).send({
      message: "Error deleting the book"
    })
  }
}

