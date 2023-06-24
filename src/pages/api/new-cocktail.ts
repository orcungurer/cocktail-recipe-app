// POST /api/new-cocktail
import { NextApiRequest, NextApiResponse } from "next";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

type ResponseData = {
  message: string;
};

async function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "POST") {
    const data = req.body;

    // console.log("process.env", process.env);

    const mongodbUri: string = process.env.MONGODB_URI ?? "";
    
    const client = await MongoClient.connect(mongodbUri);

    const db = client.db();

    const suggestedCocktailsCollection = db.collection("new-cocktail");

    const result = await suggestedCocktailsCollection.insertOne(data);

    console.log("result", result);
    
    client.close();

    res.status(201).json({ message: "Sent cocktail data successfully!" });
  }
}

export default handler;
