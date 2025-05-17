import { Request, Response, NextFunction, Router } from "express";
import { ChatbotService } from "../services/chatbot.service";
import { ChatRequestDto } from "../dtos/chatbot.dto";

export class ChatbotController {
  public router: Router;
  private chatbotService: ChatbotService;

  constructor() {
    this.router = Router();
    this.chatbotService = new ChatbotService();
    this.initializeRoutes();
  }

  private initializeRoutes() {
    /**
     * @swagger
     * /api/chat:
     *   post:
     *     summary: OpenAI 기반 챗봇 응답
     *     description: 사용자의 메시지를 ChatGPT로 전송하고 응답을 반환합니다.
     *     tags:
     *       - Chatbot
     *     requestBody:
     *       required: true
     *       content:
     *         application/json:
     *           schema:
     *             type: object
     *             properties:
     *               message:
     *                 type: string
     *                 example: 업사이클링이 뭐야?
     *     responses:
     *       200:
     *         description: 챗봇 응답 성공
     *         content:
     *           application/json:
     *             schema:
     *               type: object
     *               properties:
     *                 response:
     *                   type: string
     *       500:
     *         description: 서버 내부 오류
     */
    this.router.post("/chat", this.sendChatMessage.bind(this));
  }

  private async sendChatMessage(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    try {
      const { message }: ChatRequestDto = req.body;

      if (!message) {
        res.status(400).json({ message: "message 필드는 필수입니다." });
        return;
      }

      const response = await this.chatbotService.sendMessage({ message });
      res.status(200).json({ response });
    } catch (error) {
      next(error);
    }
  }
}
