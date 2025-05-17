import { Router, Request, Response, NextFunction } from "express";
import { DetectService } from "../services/detect.service";
import { ImageDetectRequestDto, RequestSearchProductDto } from "../dtos/detect.dto";

export class DetectController {
  public router: Router;
  private detectService: DetectService;

  constructor() {
    this.router = Router();
    this.detectService = new DetectService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post("/image-search", this.detectImage.bind(this));
    this.router.get("/search", this.handleSearchProduct.bind(this))
  }

  /**
   * @swagger
   * /api/search/image-search:
   *   post:
   *     summary: 이미지 라벨 기반 제품 검색
   *     description: 업로드된 이미지에서 추출된 라벨로 제품을 검색합니다.
   *     tags:
   *       - Detect
   *     requestBody:
   *       required: true
   *       content:
   *         application/json:
   *           schema:
   *             type: object
   *             properties:
   *               imageUrl:
   *                 type: string
   *                 example: "https://example.com/image.jpg"
   *     responses:
   *       200:
   *         description: 제품 검색 결과
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 label:
   *                   type: string
   *                 products:
   *                   type: array
   *                   items:
   *                     type: object
   *       400:
   *         description: 잘못된 요청 (imageUrl 누락)
   */
  private async detectImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { imageUrl }: ImageDetectRequestDto = req.body;

      if (!imageUrl) {
        res.status(400).json({ message: "imageUrl이 필요합니다." });
        return;
      }

      const result = await this.detectService.processImage(imageUrl);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @swagger
   * /api/products/search:
   *   get:
   *     summary: 검색어 기반 제품 검색
   *     description: 검색어에서 재료와 매핑하여 해당 재료를 사용하는 제품을 검색합니다.
   *     tags:
   *       - Detect
   *     parameters:
   *       - in: query
   *         name: search
   *         required: true
   *         schema:
   *           type: string
   *         description: can
   *     responses:
   *       200:
   *         description: 제품 검색 결과
   *         content:
   *           application/json:
   *             schema:
   *               type: object
   *               properties:
   *                 label:
   *                   type: string
   *                 products:
   *                   type: array
   *                   items:
   *                     type: object
   *       400:
   *         description: 잘못된 요청 (search 누락)
   */
  private async handleSearchProduct(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try{
      const search:RequestSearchProductDto = req.query;
      console.log(search);
      if(!search.search){
        res.status(400).json({message: "검색어가 없습니다."});
        return;
      }
      console.log(search);
      const result = await this.detectService.getSearchedProduct(search.search);
      res.status(200).json(result);
    }catch(err) {
    next(err);
    }
  }
}
