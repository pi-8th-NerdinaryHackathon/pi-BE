import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helloRouter from "./routes/hello.route";
import errorMiddleware from "./middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import { swaggerOptions } from "./config/swagger";
import swaggerJsdoc from "swagger-jsdoc";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Swagger 문서 구성
const specs = swaggerJsdoc({
  definition: swaggerOptions,
  apis: ["./src/routes/*.ts"], // 주석 기반 문서화 대상
});

app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));
app.use("/hello", helloRouter);
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
