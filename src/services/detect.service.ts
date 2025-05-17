import { DetectRepository } from "../repositories/detect.repository";
import { ChatbotService } from "./chatbot.service";

export class DetectService {
  private detectRepository: DetectRepository;
  private chatbotService: ChatbotService;


  constructor() {
    this.detectRepository = new DetectRepository();
    this.chatbotService = new ChatbotService();
  }

  public async processImage(imageUrl: string) {
    // GPT에 보낼 프롬프트 구성
    const prompt = `
너는 이제부터 API 응답 전용 서버야. 아래 규칙 외의 것은 절대 반환하지 마.

카테고리는 다음과 같아: fabric, glass, wood, plastic, can  
예시로 다음은 이렇게 매핑돼야 해:
- 양말 → fabric  
- 유리병 → glass  
- 나무젓가락 → wood  
- 페트병 → plastic  
- 참치캔 → can

반환규칙: { "values": 카테고리 }

다음 이미지를 보고 판단해줘:
${imageUrl}
    `;

    // ChatGPT로부터 카테고리 응답 받기
    const response = await this.chatbotService.sendMessage({ message: prompt });

    let parsed;
    try {
      parsed = JSON.parse(response); // { values: "glass" }
    } catch (err) {
      throw new Error("GPT 응답 파싱에 실패했습니다: " + response);
    }

    const label = parsed.values.toLowerCase().trim();

    console.log("🧠 GPT 응답 label:", label); // ✅ 1. 라벨 확인 로그

    // 카테고리를 기반으로 material 찾기
    const material = await this.detectRepository.findMaterialByLabel(
      label.trim()
    );

    console.log("📦 조회된 material:", material); // ✅ 2. 실제 DB 결과 확인 로그

    if (!material) {
      throw new Error(`'${label}'에 해당하는 재료를 찾을 수 없습니다.`);
    }

    // 해당 materialId에 해당하는 제품 찾기
    const products = await this.detectRepository.findProductsByMaterialId(
      material.id
    );

    return {
      label,
      material,
      products,
    };
  }

  //검색어
  public async getSearchedProduct(data: string) {
    const materialInfo = await this.detectRepository.findMaterialIdByMaterialName(data);
    console.log(materialInfo)
    if(!materialInfo){
      return [];
    }

    const products = await this.detectRepository.findProductsByMaterialId(materialInfo.material.id);

    if(!products) { 
      return [];
    }


   return products;
  }
}
