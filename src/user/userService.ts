import bcrypt from "bcrypt";
import { db } from "@/db/database.js";
import type { NewPerson } from "@/db/types.js";
import * as userRepository from "./userRepository.js";

export async function getAllUsers() {
	return await userRepository.selectAllPeople();
}

export async function getPersonByEmail(email: string) {
	return await userRepository.selectPersonByEmail(email);
}
