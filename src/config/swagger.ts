import dotenv from "dotenv";
dotenv.config();
export const swaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "pi-BE API Docs",
    version: "1.0.0",
    description: "Nerodinary C조 해커톤 백엔드 Swagger 문서입니다.",
  },
  servers: [
    {
      url: process.env.SWAGGER_SERVER_URL || "http://localhost:3000",
      description: "로컬 서버",
    },
    {
      url: "http://43.203.85.72:3000",
      description: "퍼블릭 서버", // ← 퍼블릭 IP 서버 추가
    },
  ],
};
