import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import errorMiddleware from "./middlewares/error.middleware";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";
import { swaggerOptions } from "./config/swagger";
import { helloRouter } from "./controllers/hello.controller";
import { DetectController } from "./controllers/detect.controller";
import { productRouter } from "./controllers/product.controller";
import { userRouter } from "./controllers/user.controller";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ Swagger 문서 구성
const specs = swaggerJsdoc({
  definition: swaggerOptions,
  apis: ["./src/controllers/*.ts"],
});

const detectController = new DetectController();

app.use(cors());
app.use(express.json());

// ✅ Swagger 문서 라우트
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

// ✅ API 라우트
app.use("/hello", helloRouter);
app.use("/api/search", detectController.router);
app.use("/api/products", productRouter);
app.use("/api/user", userRouter);

// ✅ 에러 핸들링
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
