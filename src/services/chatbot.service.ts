import OpenAI from "openai";
import { ChatRequestDto } from "../dtos/chatbot.dto";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // 안전하게 .env에서 관리
});

export class ChatbotService {
  async sendMessage(dto: ChatRequestDto): Promise<string> {
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: dto.message,
        },
      ],
    });

    const content = chatCompletion.choices[0]?.message?.content;
    return content || "응답이 없습니다.";
  }
}
