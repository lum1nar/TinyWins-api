import * as userService from "./user-service.js";

export async function registerHandler(req: Request, res: Response) {
  const input = {};
  const user = await userService.register(input);
}
