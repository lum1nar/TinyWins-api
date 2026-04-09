import type { NewPerson } from "@/db/types.js";
import { db } from "../db/database.js";

export async function insertPerson(person: NewPerson) {
  return await db
    .insertInto("person")
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function selectPersonByEmail(email: string) {
  return await db
    .selectFrom("person")
    .where("email", "=", email)
    .selectAll()
    .executeTakeFirst();
}

export async function selectAllPeople() {
  return await db.selectFrom("person").selectAll().execute();
}
