import type { NewPerson } from "@/db/types.js";
import { db } from "../db/database.js";

export async function createPerson(person: NewPerson) {
  return await db
    .insertInto("person")
    .values(person)
    .returningAll()
    .executeTakeFirstOrThrow();
}

export async function getUserByEmail(email: string) {
  return await db
    .selectFrom("person")
    .where("email", "=", email)
    .selectAll()
    .executeTakeFirst();
}

export async function getUsers() {
  return await db.selectFrom("person").selectAll().execute();
}
