const createBook = async () => {
  const newBook = {
    title: "Harry Potter and the Chamber of Secrets",
    author: "J.K. Rowling",
    year: 1998,
  };

  try {
    const response = await fetch("http://localhost:3000/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newBook),
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const createdBook = await response.json();
    console.log("Книга успешно создана:", createdBook);
  } catch (error) {
    console.error("Ошибка при создании книги:", error);
  }
};

//createBook();

const updateBook = async (id) => {
  const updatedData = {
    title: "Harry Potter and the Prisoner of Azkaban",
    author: "J.K. Rowling",
    year: 1997,
  };

  try {
    const response = await fetch(`http://localhost:3000/books/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`Ошибка: ${response.status}`);
    }

    const updatedBook = await response.json();
    console.log("Книга успешно обновлена:", updatedBook);
  } catch (error) {
    console.error("Ошибка при обновлении книги:", error);
  }
};

//updateBook(1);

const deleteBook = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/book/${id}`, {
      method: "DELETE",
    });

    if (response.ok) {
      console.log("Книга успешно удалена");
    } else {
      const errorResponse = await response.json();
      console.error("Ошибка при удалении книги:", errorResponse.message);
    }
  } catch (error) {
    console.error("Ошибка при удалении книги:", error);
  }
};

//deleteBook(1);
