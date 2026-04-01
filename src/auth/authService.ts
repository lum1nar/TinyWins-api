import type { NewPerson } from "@/db/types.js";
import * as userRepository from "@/user/userRepository.js";
import * as userService from "@/user/userService.js";
import bcrypt from "bcrypt";
import type { LoginInput, RegisterInput } from "./authSchema.js";
import jwt from "jsonwebtoken";
import { HttpError } from "@/middleware/errorHandler.js";
import { env } from "@/config.js";

export const registerUser = async (data: RegisterInput) => {
  const password_hash = await bcrypt.hash(data.password, 10);

  const newPerson: NewPerson = {
    username: data.name,
    email: data.email,
    password_hash: password_hash,
  };

  return await userRepository.createPerson(newPerson);
};

export const login = async function (data: LoginInput) {
  const user = await userService.getUserByEmail(data.email);

  if (!user) {
    throw new HttpError(401, "Invalid Credentails");
  }

  const isValid = await bcrypt.compare(data.password, user?.password_hash);

  if (!isValid) {
    throw new HttpError(401, "Invalid Credentails");
  }

  const payload = { id: user.id, username: user.username };

  const token = jwt.sign(payload, env.JWT_SECRET, {
    expiresIn: "7d",
  });

  return token;
};
