import express from "express";
import cors from "cors";
import sequelize from "./config/db.js";
import Book from "./models/book.js";

const app = express();
const PORT = process.env.PORT || "3000";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("My Server");
});

app.post("/books", async (req, res) => {
  const { title, author, year } = req.body;

  try {
    const book = await Book.create({ title, author, year });
    res.status(201).json(book);
  } catch (error) {
    res.status(500).send({ message: "Error creating book" });
  }
});

app.put("/books/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const book = await Book.findOne({ where: { id: id } });

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    await Book.update(updatedData, {
      where: { id: id },
    });

    const updatedBook = await Book.findOne({ where: { id: id } });
    res.json(updatedBook);
  } catch (error) {
    res
      .status(500)
      .send({ message: "Error updating book", error: error.message });
  }
});

app.delete("/book/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const book = await Book.findOne({ where: { id: id } });

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    await Book.destroy({ where: { id: id } });
    res.status(204).send();
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error deleting book", error: err.message });
  }
});

app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log(`server connect to port http://localhost:${PORT}`);
  } catch (error) {
    console.error("Error to connect", error);
  }
});
