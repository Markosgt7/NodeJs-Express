//esta es la forma como se crea un servidor usando solo node.js sin express
//const http = require("http");
//ahora usamos express
const express = require("express");
const app = express();

app.use(express.json()); // Middleware para parsear JSON en el cuerpo de las peticiones

let persons = [
  {
    id: 1,
    name: "John Doe",
    number: "123-456-7890",
  },
  {
    id: 2,
    name: "Jane Smith",
    number: "987-654-3210",
  },
  {
    id: 3,
    name: "Alice Johnson",
    number: "555-555-5555",
  },
  {
    id: 4,
    name: "Bob Brown",
    number: "444-444-4444",
  },
  {
    id: 5,
    name: "Charlie White",
    number: "333-333-3333",
  },
];

/* 
esta es la forma como se crea un servidor usando solo node.js sin express
app = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(notes));
}); */

//ahora usamos express
app.get("/", (req, res) => {
  res.send("<h1>Hello Everybody !</h1>");
});

// Endpoint to get all persons
app.get("/api/persons", (req, res) => {
  res.json(persons);
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

app.post("/api/persons", (req, res) => {
  const person = req.body;
  if (!person || !person.name || !person.number) {
    return res.status(400).json({ error: "Name or number is missing" });
  }
  // Check for duplicate name
  const existingPerson = persons.find((p) => p.name === person.name);
  if (existingPerson) {
    return res.status(400).json({ error: "Name must be unique" });
  }
  const newPerson = {
    id: persons.length > 0 ? Math.floor(Math.random() * 10000) + 1 : 1,
    name: person.name,
    number: person.number,
  };

  persons.push(newPerson);
  res.status(201).json(newPerson);
});

app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  persons = persons.filter((person) => person.id !== id);
  res.status(204).end();
});

// Endpoint to get a info
app.get("/info", (req, res) => {
  const info = `<p>Phonebook has info for ${persons.length} people</p>
                <p>${new Date()}</p>`;
  res.send(info);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
