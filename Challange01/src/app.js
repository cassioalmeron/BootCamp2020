const express = require("express");
const cors = require("cors");
const { v4: uuid, validate: isUuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { url, title, techs } = request.body;

  const repository = {
    id: uuid(),
    url,
    title,
    techs,
    likes: 0
  };

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = findRepositoryIndexById(id);

  if (index < 0)
    return response.status(400).json({message: 'The repository does not exists!'})

  const likes = repositories[index].likes;

  const {title, url, techs } = request.body;

  const repository = {
    id,
    title,
    url,
    techs,
    likes
  };

  repositories[index] = repository;

  return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const index = findRepositoryIndexById(id);

  if (index < 0)
    return response.status(400).json({message: 'The repository does not exists!'})

  repositories.splice(index, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    const { id } = request.params;

    const index = findRepositoryIndexById(id);

    if (index < 0)
      return response.status(400).json({message: 'The repository does not exists!'})
    
    const repository = repositories[index];

    repository.likes++;

    return response.json({ likes: repository.likes });
});

// function findRepositoryById(id){
//   const index = findRepositoryIndexById(id);

//   if (index < 0)
//     return null
  
//   return repositories[index];
// }

function findRepositoryIndexById(id){
  const index = repositories.findIndex(repository => repository.id === id);
  return index;
}

module.exports = app;
