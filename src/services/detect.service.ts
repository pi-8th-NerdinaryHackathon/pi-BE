import { DetectRepository } from "../repositories/detect.repository";
// import axios from "axios"; // 실제 YOLO 연동 시

export class DetectService {
  private detectRepository: DetectRepository;

  constructor() {
    this.detectRepository = new DetectRepository();
  }

  public async processImage(imageUrl: string) {
    // 🔁 나중에 Python 서버로 요청 예정
    // const { data: label } = await axios.post("http://ai-server/detect", { imageUrl });

    const label = "병뚜껑"; // mock label
    const material = await this.detectRepository.findMaterialByLabel(label);

    if (!material) {
      throw new Error(`'${label}' 라벨에 해당하는 재료를 찾을 수 없습니다.`);
    }

    const products = await this.detectRepository.findProductsByMaterialId(
      material.id
    );

    return {
      label,
      material,
      products,
    };
  }
}
