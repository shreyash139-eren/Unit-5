const express = require("express");
const {
  addPublisher,
  getPublishers,
  getPublisherById,
  updatePublisher,
  deletePublisher,
  getAllGames
} = require("../controllers/publisher.controller");
const PublisherRouter = express.Router();

PublisherRouter.post("/publishers", addPublisher);

PublisherRouter.get("/publishers", getPublishers);

PublisherRouter.get("/publishers/:id", getPublisherById);

PublisherRouter.put("/publishers/:id", updatePublisher);

PublisherRouter.delete("/publishers/:id", deletePublisher);

PublisherRouter.get("/publishers/:publisherId/games",getAllGames)

module.exports = PublisherRouter;
