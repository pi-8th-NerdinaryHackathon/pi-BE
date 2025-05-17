import { Request, Response, Router } from "express";
import {
    listProduct,
    listSpecProduct,
    listProductsFromCategory
} from "../services/product.service";
import HttpException from "../errors/HttpException";
export const productRouter = Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Product:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 3
 *         name:
 *           type: string
 *           example: 예시 상품 1
 *         detail:
 *           type: string
 *           example: 이것은 첫 번째 예시 상품입니다.
 *         image:
 *           type: string
 *           example: https://example.com/image1.png
 *         price:
 *           type: integer
 *           example: 12000
 *         companyId:
 *           type: integer
 *           example: 1
 *         categoryId:
 *           type: integer
 *           example: 1
 *         createdAt:
 *           type: string
 *           format: date-time
 *           example: 2025-05-17T21:50:29.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           example: 2025-05-17T21:50:29.000Z
 */

/**
 * @swagger
 * tags:
 *   name: Product
 *   description: 상품 관련 API
 */

/**
 * @swagger
 * /api/products:
 *   get:
 *     summary: 전체 상품 목록 조회
 *     tags: [Product]
 *     responses:
 *       200:
 *         description: 전체 상품 목록 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   product:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: 서버 오류
 */
productRouter.get("/", async (req: Request, res: Response) => {
  try {
    const products = await listProduct();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "서버 오류입니다." });
  }
});

/**
 * @swagger
 * /api/products/category/{categoryId}:
 *   get:
 *     summary: 카테고리별 상품 조회
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: categoryId
 *         schema:
 *           type: integer
 *         required: true
 *         description: 카테고리 ID
 *     responses:
 *       200:
 *         description: 해당 카테고리의 상품 목록
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   product:
 *                     $ref: '#/components/schemas/Product'
 *       500:
 *         description: 서버 오류
 */
productRouter.get("/category/:categoryId", async (req: Request, res: Response) => {
  try {
    const categoryId = parseInt(req.params.categoryId);
    const products = await listProductsFromCategory(categoryId);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "서버 오류입니다." });
  }
});

/**
 * @swagger
 * /api/products/{id}:
 *   get:
 *     summary: 상품 상세 조회
 *     tags: [Product]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: 상품 ID
 *     responses:
 *       200:
 *         description: 상품 상세 정보 반환
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 product:
 *                   $ref: '#/components/schemas/Product'
 *       500:
 *         description: 서버 오류
 */
productRouter.get("/:id", async (req: Request, res: Response) => {
  try {
    const productId = parseInt(req.params.id);
    const product = await listSpecProduct(productId);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "서버 오류입니다." });
  }
});
