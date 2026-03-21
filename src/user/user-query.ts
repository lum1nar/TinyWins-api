import { db } from "../db/database.js";
import type { NewPerson } from "../db/types.js";

export async function createPerson(person: NewPerson) {
  return await db
    .insertInto("person")
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow();
}
