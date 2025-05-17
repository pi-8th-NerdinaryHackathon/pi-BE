export const swaggerOptions = {
  openapi: "3.0.0",
  info: {
    title: "pi-BE API Docs",
    version: "1.0.0",
    description: "Nerodinary C조 해커톤 백엔드 Swagger 문서입니다.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "로컬 서버",
    },
  ],
};
