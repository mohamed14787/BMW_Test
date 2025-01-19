import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { MongoClient } from "mongodb";
import csv from "csv-parser";
import mongoose from "mongoose";
import fs from "fs";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5005;
const csvFilePath =
  "/Users/mohamedelshaarawy/Desktop/BMW/BMW_Test/Assets/BMW_data.csv";
const mongoURI = process.env.MONGO_URI;

let collection;

const client = new MongoClient(mongoURI);

const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    const db = client.db("BMW_cars");
    collection = db.collection("BMWVehicles");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1);
  }
};

const processCSV = () => {
  const records = [];
  fs.createReadStream(csvFilePath)
    .pipe(csv())
    .on("data", (row) => {
      records.push(row);
    })
    .on("end", async () => {
      try {
        if (records.length > 0) {
          const result = await collection.insertMany(records);
          console.log(`${result.insertedCount} records inserted successfully!`);
        } else {
          console.log("No data to insert.");
        }
      } catch (error) {
        console.error("Error inserting records:", error);
      }
    });
};

app.get("/cars", async (req, res) => {
  try {
    const cars = await collection.find({}).toArray();
    res.json(cars);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.delete("/cars/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const result = await collection.deleteOne({
      _id: new mongoose.Types.ObjectId(id),
    });
    if (result.deletedCount === 0) {
      res.status(404).send("Car not found");
    } else {
      res.send("Car deleted successfully");
    }
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.get("/cars/search/:Brand", async (req, res) => {
  const { Brand } = req.params;
  try {
    const cars = await collection
      .find({ Brand: { $regex: Brand, $options: "i" } })
      .toArray();
    res.json(cars);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.get("/cars/filter/:field/:operator/:value", async (req, res) => {
  const { field, operator, value } = req.params;

  let filter = {};
  switch (operator) {
    case "contains":
      filter[field] = { $regex: value, $options: "i" };
      break;
    case "equals":
      filter[field] = { $eq: value };
      break;
    case "startsWith":
      filter[field] = { $regex: `^${value}`, $options: "i" };
      break;
    case "endsWith":
      filter[field] = { $regex: `${value}$`, $options: "i" };
      break;

    case "isEmpty":
      filter[field] = { $exists: false };
      break;
    default:
      return res.status(400).send(`Inv "${operator}"`);
  }

  try {
    const cars = await collection.find(filter).toArray();
    res.json(cars);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

app.post("/cars/add", async (req, res) => {
  const car = req.body;
  try {
    const result = await collection.insertOne(car);
    res.json({ _id: result.insertedId, ...car });
  } catch (err) {
    res.status(500).send("Server error");
  }
});
app.listen(port, async () => {
  await connectToDatabase();
  console.log(`Server running on port ${port}`);
});
