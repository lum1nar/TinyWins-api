import bcrypt from "bcrypt";
import type { NewPerson } from "../db/types.js";
import type { registerInput } from "./userSchema.ts";
import * as userRepository from "./userRepository.js";

export const registerUser = async (person: registerInput) => {
  const password_hash = await bcrypt.hash(person.password, 10);

  const newPerson: NewPerson = {
    username: person.name,
    email: person.email,
    password_hash: password_hash,
  };

  return await userRepository.createPerson(newPerson);
};
