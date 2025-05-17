import { Request, Response } from "express";
import { sayHello } from "../services/hello.service";
import HttpException from "../errors/HttpException"; // 에러 클래스

export const getHelloMessage = (req: Request, res: Response) => {
  // 예외를 던져 에러 미들웨어 동작 확인
  throw new HttpException(400, "테스트용 에러입니다.");

  // ↓ 아래 코드는 실행되지 않음 (예외 이후 코드 생략)
  // const message = sayHello();
  // res.status(200).json({ message });
};
