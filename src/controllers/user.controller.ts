import { Request, Response, Router } from "express";
import {
    listUserWish,
    addingUserWish,
    delUserWish
} from "../services/user.service";
import HttpException from "../errors/HttpException";
export const userRouter = Router();
userRouter.get("/", async (req: Request, res: Response) => {
    /**
 * @swagger
 * /api/user:
 *   get:
 *     summary: 유저 위시리스트 조회
 *     tags: [User]
 *     responses:
 *       200:
 *         description: 유저의 위시리스트 상품 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 3
 *                     name:
 *                       type: string
 *                       example: 예시 상품 1
 *                     detail:
 *                       type: string
 *                       example: 이것은 첫 번째 예시 상품입니다.
 *                     image:
 *                       type: string
 *                       format: uri
 *                       example: https://example.com/image1.png
 *                     price:
 *                       type: integer
 *                       example: 12000
 *                     companyId:
 *                       type: integer
 *                       example: 1
 *                     categoryId:
 *                       type: integer
 *                       example: 1
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-05-18T01:06:28.000Z
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       example: 2025-05-18T01:06:28.000Z
 *       500:
 *         description: 서버 오류
 */

    // const userIdHeader = req.get('x-user-Id');
    // if (!userIdHeader) {
    //     throw new Error("id 없음")
    // }
    // const userId = parseInt(userIdHeader);
    // if (isNaN(userId)) {
    //     throw new Error("id가 숫자가 아님")
    // }
    const userId = 1;
    try {
        const user = await listUserWish(userId);
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
 *     summary: 유저 위시리스트에 상품 추가
 *     tags: [User]
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
 *         description: 위시리스트 추가 성공
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
 *       500:
 *         description: 서버 오류
 */
    // const userIdHeader = req.get('x-user-Id');
    // if (!userIdHeader) {
    //     throw new Error("id 없음")
    // }
    // const userId = parseInt(userIdHeader);
    // if (isNaN(userId)) {
    //     throw new Error("id가 숫자가 아님")
    // }
    const userId = 1;
    try {
      const user = await addingUserWish(userId, req.body.productId);
      res.status(200).json(user);
    } catch (error) {
        throw new HttpException(500, "서버 오류입니다.");
    }
});
  
userRouter.delete("/", async (req: Request, res: Response) => {
    /**
 * @swagger
 * /api/user:
 *   delete:
 *     summary: 유저 위시리스트에서 상품 삭제
 *     tags: [User]
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
 *       500:
 *         description: 서버 오류
 */

    // const userIdHeader = req.get('x-user-Id');
    // if (!userIdHeader) {
    //     throw new Error("id 없음")
    // }
    // const userId = parseInt(userIdHeader);
    // if (isNaN(userId)) {
    //     throw new Error("id가 숫자가 아님")
    // }
    const userId = 1;
    try {
      const user = await delUserWish(userId);
      res.status(200).json(user);
    } catch (error) {
        throw new HttpException(500, "서버 오류입니다.");
    }
  });