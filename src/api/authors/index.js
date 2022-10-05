import express from "express";
import fs from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import uniqid from "uniqid";

const authorsJSONPath = join(
  dirname(fileURLToPath(import.meta.url)),
  "authors.json"
);

const authorRouter = express.Router();

authorRouter.post("/", (req, res) => {
  const newAuthor = { ...req.body, id: uniqid(), createdAt: new Date() };

  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath));

  authorsArray.push(newAuthor);

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray));

  res.status(201).send({ id: newAuthor.id });
});

authorRouter.get("/", (req, res) => {
  const file = fs.readFileSync(authorsJSONPath);

  const authors = JSON.parse(file);

  res.send(authors);
});

authorRouter.get("/:authorId", (req, res) => {
  const authorID = req.params.authorId;

  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath));

  const foundAuthor = authorsArray.find((author) => author.id === authorID);

  res.send(foundAuthor);
});

authorRouter.put("/:authorId", (req, res) => {
  const authorsArray = JSON.parse(fs.readFileSync(authorsJSONPath));

  const index = authorsArray.findIndex(
    (author) => author.id === req.params.authorId
  );
  const oldAuthor = authorsArray[index];

  const updatedAuthor = { ...oldAuthor, ...req.body, updatedAt: new Date() };

  authorsArray[index] = updatedAuthor;

  fs.writeFileSync(authorsJSONPath, JSON.stringify(authorsArray));

  res.send(updatedAuthor);
});

authorRouter.delete("/:authorId", (req, res) => {
  const AuthorsArray = JSON.parse(fs.readFileSync(authorsJSONPath));

  const remainingAuthors = AuthorsArray.filter(
    (author) => author.id !== req.params.authorId
  );

  fs.writeFileSync(authorsJSONPath, JSON.stringify(remainingAuthors));

  res.status(204).send("deleted");
});
export default authorRouter;
