import * as db from '../../db/db'

export default async function handler(req, res) {
  try {
    const result = await db.getAllSubscribers();
    res.status(200).json(result);

    if(req.method === "POST") {

      res.status(201).json("created")
    }
  } catch (error) {
    console.log(error.message);
    console.log("it is error");
    res.status(500).json(error)
  }
}
