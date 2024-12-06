import express, { Request, Response } from "express";
import { port } from "./env.config";
import { getResult } from "./gemini";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json({ message: "Hi!, How can I help you?" });
});

app.post("/ask", async (req: Request, res: Response) => {
  const schema = JSON.stringify(req.body.schema);
  const item = req.body.item;
  const result = await getResult(schema,item );
  res.json(result);
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
