import knex from 'knex'
import config from './knexfile'
import connection from './connection'


export function getAllPostadds(db = connection) {
  return db('posts').select(
    'date_created as dateCreated',
    'id',
    'title',
    'text'
  ) 
}

export async function addUser(user, db = connection) {
  console.log(user)
  return await db('subscribers').insert({ ...user })

}