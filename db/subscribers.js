import { addUser } from "./db";

export default async function handler(req, res) {
  try {
    if (req.method === "POST") {
      const result = await addUser(req.body);
      console.log(result)
      res.status(200).json({ result });
    }
  } catch (error) {
    console.log(error.message);
    console.log("it is error");
    res.status(401)
  }
}
