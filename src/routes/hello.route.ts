import { Router } from "express";
import { getHelloMessage } from "../controllers/hello.controller";

const router = Router();

/**
 * @swagger
 * /hello:
 *   get:
 *     summary: Hello 메시지를 반환합니다.
 *     description: 기본 테스트용 hello API입니다.
 *     tags:
 *       - Hello
 *     responses:
 *       200:
 *         description: 성공적으로 hello 메시지를 반환함
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hello from pi-BE 👋
 *       400:
 *         description: 잘못된 요청
 */
router.get("/", getHelloMessage);

export default router;
