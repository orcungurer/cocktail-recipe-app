// POST /api/new-cocktail
import { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
};

function handler(req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === "POST") {
    const data = req.body;

    res.status(201).json({ message: "Sent cocktail data successfully!" });
  }
}

export default handler;
