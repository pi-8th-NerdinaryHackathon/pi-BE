import { Router, Request, Response, NextFunction } from "express";
import { DetectService } from "../services/detect.service";
import multer from "multer";
import { uploadToS3, RequestSearchProductDto } from "../utils/s3Uploader";

const upload = multer({ storage: multer.memoryStorage() });

export class DetectController {
  public router: Router;
  private detectService: DetectService;

  constructor() {
    this.router = Router();
    this.detectService = new DetectService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.post(
      "/image-search",
      upload.single("image"),
      this.detectImage.bind(this)
    );
    this.router.get("/", this.handleSearchProduct.bind(this));
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
   *         multipart/form-data:
   *           schema:
   *             type: object
   *             properties:
   *               image:
   *                 type: string
   *                 format: binary
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
   *         description: 잘못된 요청 (파일 누락)
   */
  private async detectImage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const file = req.file;
      if (!file) {
        res.status(400).json({ message: "image 파일이 필요합니다." });
        return;
      }

      // S3에 이미지 업로드 후 URL 반환
      const imageUrl = await uploadToS3(file);

      // S3 URL 기반 분석
      const result = await this.detectService.processImage(imageUrl);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }

  /**
   * @swagger
   * /api/search:
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
    try {
      const search: RequestSearchProductDto = req.query;
      console.log(search);
      if (!search.search) {
        res.status(400).json({ message: "검색어가 없습니다." });
        return;
      }
      console.log(search);
      const result = await this.detectService.getSearchedProduct(search.search);
      res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}
