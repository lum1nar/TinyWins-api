import bcrypt from "bcrypt";
import type { NewPerson } from "@/db/types.js";
import type { registerInput } from "./userSchema.ts";
import * as userRepository from "./userRepository.js";
import { db } from "@/db/database.js";

export async function getUsers() {
  return await userRepository.getUsers();
}

export async function getUserByEmail(email: string) {
  return await userRepository.getUserByEmail(email);
}
