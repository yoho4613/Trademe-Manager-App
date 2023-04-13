import connection from "./connection";

export function getAllSubscribers(db = connection) {
  return db("subscribers").select();
}

export async function addUser(user, db = connection) {
  console.log(user);
  return await db("subscribers").insert({ ...user });
}
