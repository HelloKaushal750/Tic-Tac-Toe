const express = require("express");
const { GameModel } = require("../model/Game.model");
const { v4: uuidv4 } = require("uuid");

const GameController = express.Router();

GameController.get("/games", async (req, res) => {
  try {
    const games = await GameModel.find();
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

GameController.get("/games/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const games = await GameModel.findOne({ _id: id });
    res.status(200).json(games);
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

GameController.post("/games", async (req, res) => {
  try {
    const { playerX, playerO, data, result } = req.body;
    const game = new GameModel({
      _id: uuidv4(),
      playerX,
      playerO,
      data,
      result,
      datetime: new Date(),
    });
    const savedGame = await game.save();
    if (savedGame) {
      res.status(200).json({ message: "Game added successfully" });
    } else {
      res.status(400).json({ error: "Bad request" });
    }
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

module.exports = { GameController };
