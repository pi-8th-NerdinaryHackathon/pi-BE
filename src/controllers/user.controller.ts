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
   *                     example: 3
   *                   name:
   *                     type: string
   *                     example: 예시 상품 1
   *                   detail:
   *                     type: string
   *                     example: 이것은 첫 번째 예시 상품입니다.
   *                   image:
   *                     type: string
   *                     format: uri
   *                     example: https://example.com/image1.png
   *                   price:
   *                     type: integer
   *                     example: 12000
   *                   companyId:
   *                     type: integer
   *                     example: 1
   *                   categoryId:
   *                     type: integer
   *                     example: 1
   *                   createdAt:
   *                     type: string
   *                     format: date-time
   *                     example: 2025-05-18T01:06:28.000Z
   *                   updatedAt:
   *                     type: string
   *                     format: date-time
   *                     example: 2025-05-18T01:06:28.000Z
   *       401:
   *         description: uuid가 없습니다.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 status:
   *                   type: integer
   *                   example: 401
   *                 message:
   *                   type: string
   *                   example: uuid가 없습니다.
   *       403:
   *         description: 유저가 없습니다.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 status:
   *                   type: integer
   *                   example: 403
   *                 message:
   *                   type: string
   *                   example: 유저가 없습니다.
   *       500:
   *         description: 서버 오류입니다.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 status:
   *                   type: integer
   *                   example: 500
   *                 message:
   *                   type: string
   *                   example: 서버 오류입니다.
   */
  const userIdHeader = req.get("x-user-Id");
  if (!userIdHeader) {
    throw new HttpException(401, "uuid가 없습니다.");
  }
  const uuid = userIdHeader;
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
   *         description: 유저의 UUID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               productId:
   *                 type: integer
   *                 example: 3
   *               count:
   *                 type: integer
   *                 example: 50
   *             required:
   *               - productId
   *               - count
   *     responses:
   *       200:
   *         description: 위시리스트 추가 또는 수량 증가 성공
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   example: 11
   *                 userId:
   *                   type: integer
   *                   example: 1
   *                 productId:
   *                   type: integer
   *                   example: 3
   *                 material_count:
   *                   type: integer
   *                   example: 150
   *       401:
   *         description: uuid가 없습니다.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 status:
   *                   type: integer
   *                   example: 401
   *                 message:
   *                   type: string
   *                   example: uuid가 없습니다.
   *       403:
   *         description: 유저가 없습니다.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 status:
   *                   type: integer
   *                   example: 403
   *                 message:
   *                   type: string
   *                   example: 유저가 없습니다.
   *       500:
   *         description: 서버 오류입니다.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 status:
   *                   type: integer
   *                   example: 500
   *                 message:
   *                   type: string
   *                   example: 서버 오류입니다.
   */

  const userIdHeader = req.get("x-user-Id");
  if (!userIdHeader) {
    throw new HttpException(401, "uuid가 없습니다");
  }

  const uuid = userIdHeader;
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
   *     summary: 유저 위시리스트에서 상품 삭제
   *     tags: [User]
   *     parameters:
   *       - in: header
   *         name: x-user-Id
   *         required: true
   *         schema:
   *           type: string
   *         description: 유저의 UUID
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               productId:
   *                 type: integer
   *                 example: 3
   *     responses:
   *       200:
   *         description: 위시리스트 삭제 성공
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 id:
   *                   type: integer
   *                   example: 11
   *                 userId:
   *                   type: integer
   *                   example: 1
   *                 productId:
   *                   type: integer
   *                   example: 3
   *       401:
   *         description: uuid가 없습니다.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 status:
   *                   type: integer
   *                   example: 401
   *                 message:
   *                   type: string
   *                   example: uuid가 없습니다.
   *       403:
   *         description: 유저가 없습니다.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 status:
   *                   type: integer
   *                   example: 403
   *                 message:
   *                   type: string
   *                   example: 유저가 없습니다.
   *       500:
   *         description: 서버 오류입니다.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 status:
   *                   type: integer
   *                   example: 500
   *                 message:
   *                   type: string
   *                   example: 서버 오류입니다.
   */

  const userIdHeader = req.get("x-user-Id");
  if (!userIdHeader) {
    throw new HttpException(401, "uuid가 없습니다.");
  }
  const uuid = userIdHeader;
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
   *     summary: 유저 추가
   *     tags: [User]
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               uuid:
   *                 type: string
   *                 example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
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
   *                   example: 1
   *                 uuid:
   *                   type: string
   *                   example: "a1b2c3d4-e5f6-7890-abcd-ef1234567890"
   *                 createdAt:
   *                   type: string
   *                   format: date-time
   *                   example: 2025-05-18T02:12:00.000Z
   *       401:
   *         description: uuid가 없습니다.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 status:
   *                   type: integer
   *                   example: 401
   *                 message:
   *                   type: string
   *                   example: uuid가 없습니다.
   *       500:
   *         description: 서버 오류입니다.
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 success:
   *                   type: boolean
   *                   example: false
   *                 status:
   *                   type: integer
   *                   example: 500
   *                 message:
   *                   type: string
   *                   example: 서버 오류입니다.
   */

  try {
    if (!req.body.uuid) {
      throw new HttpException(401, "uuid가 없습니다.");
    }
    const user = await addingUser(req.body.uuid);
    res.status(200).json(user);
  } catch (error) {
    throw new HttpException(500, "서버 오류입니다.");
  }
});
