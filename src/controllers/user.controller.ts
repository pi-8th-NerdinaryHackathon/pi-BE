import { Request, Response, Router } from "express";
import {
  listUserWish,
  addingUserWish,
  delUserWish,
  addingUser,
} from "../services/user.service";
import HttpException from "../errors/HttpException";

export const userRouter = Router();

userRouter.get("/wishlist", async (req: Request, res: Response) => {
  /**
   * @swagger
   * /api/user/wishlist:
   *   get:
   *     summary: 유저 위시리스트 조회
   *     tags: [User]
   *     parameters:
   *       - in: header
   *         name: x-user-Id
   *         required: true
   *         schema:
   *           type: string
   *         description: 유저의 UUID
   *     responses:
   *       200:
   *         description: 유저의 위시리스트 상품 반환
   *         content:
   *           application/json:
   *             schema:
   *               type: array
   *               items:
   *                 type: object
   *                 properties:
   *                   id:
   *                     type: integer
   *                   name:
   *                     type: string
   *                   detail:
   *                     type: string
   *                   image:
   *                     type: string
   *                   price:
   *                     type: integer
   *                   companyId:
   *                     type: integer
   *                   categoryId:
   *                     type: integer
   *                   material_count:
   *                     type: integer
   *                   createdAt:
   *                     type: string
   *                     format: date-time
   *                   updatedAt:
   *                     type: string
   *                     format: date-time
   *       401:
   *         description: uuid가 없습니다.
   *       403:
   *         description: 유저가 없습니다.
   *       500:
   *         description: 서버 오류입니다.
   */
  const uuid = req.get("x-user-Id");
  if (!uuid) throw new HttpException(401, "uuid가 없습니다.");
  try {
    const user = await listUserWish(uuid);
    res.status(200).json(user);
  } catch (error) {
    throw new HttpException(500, "서버 오류입니다.");
  }
});

userRouter.post("/wishlist", async (req: Request, res: Response) => {
  /**
   * @swagger
   * /api/user/wishlist:
   *   post:
   *     summary: 유저 위시리스트에 상품 추가 (수량 누적)
   *     tags: [User]
   *     parameters:
   *       - in: header
   *         name: x-user-Id
   *         required: true
   *         schema:
   *           type: string
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               productId:
   *                 type: integer
   *               count:
   *                 type: integer
   *     responses:
   *       200:
   *         description: 위시리스트 수량 증가 성공
   *       401:
   *         description: uuid가 없습니다.
   *       403:
   *         description: 유저가 없습니다.
   *       500:
   *         description: 서버 오류입니다.
   */
  const uuid = req.get("x-user-Id");
  if (!uuid) throw new HttpException(401, "uuid가 없습니다.");
  const { productId, count } = req.body;
  try {
    const user = await addingUserWish(uuid, productId, count);
    res.status(200).json(user);
  } catch (error) {
    throw new HttpException(500, "서버 오류입니다.");
  }
});

userRouter.delete("/wishlist", async (req: Request, res: Response) => {
  /**
   * @swagger
   * /api/user/wishlist:
   *   delete:
   *     summary: 유저 위시리스트 삭제
   *     tags: [User]
   *     parameters:
   *       - in: header
   *         name: x-user-Id
   *         required: true
   *         schema:
   *           type: string
   *     responses:
   *       200:
   *         description: 위시리스트 삭제 성공
   *       401:
   *         description: uuid가 없습니다.
   *       403:
   *         description: 유저가 없습니다.
   *       500:
   *         description: 서버 오류입니다.
   */
  const uuid = req.get("x-user-Id");
  if (!uuid) throw new HttpException(401, "uuid가 없습니다.");
  try {
    const user = await delUserWish(uuid);
    res.status(200).json(user);
  } catch (error) {
    throw new HttpException(500, "서버 오류입니다.");
  }
});

userRouter.post("/", async (req: Request, res: Response) => {
  /**
   * @swagger
   * /api/user:
   *   post:
   *     summary: 유저 추가 (헤더 기반 UUID 사용)
   *     tags: [User]
   *     parameters:
   *       - in: header
   *         name: x-user-Id
   *         required: true
   *         schema:
   *           type: string
   *         description: 유저의 UUID
   *     responses:
   *       200:
   *         description: 유저 추가 성공
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                 uuid:
   *                   type: string
   *       401:
   *         description: uuid가 없습니다.
   *       500:
   *         description: 서버 오류입니다.
   */
  const uuid = req.get("x-user-Id");
  if (!uuid) {
    throw new HttpException(401, "uuid가 없습니다.");
  }
  try {
    const user = await addingUser(uuid);
    res.status(200).json(user);
  } catch (error) {
    throw new HttpException(500, "서버 오류입니다.");
  }
});
