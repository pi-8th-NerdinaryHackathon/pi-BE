import { Request, Response, Router } from "express";
import { sayHello, sayUserId } from "../services/hello.service";
import HttpException from "../errors/HttpException";

export const helloRouter = Router();

// GET /hello
helloRouter.get("/", async (req: Request, res: Response) => {
  // 에러 발생 테스트
  // throw new HttpException(400, "테스트용 에러입니다.");

  // 정상 응답 코드 (현재는 실행되지 않음)
  const message =  await sayHello();
  res.status(200).json({ message });
});

helloRouter.get("/head", async(req:Request, res: Response) => {
  const userId = await sayUserId(req.header("X-User-Id"));

  res.status(200).json({ userId });
})
