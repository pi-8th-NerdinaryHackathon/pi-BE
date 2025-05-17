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

  //검색어
  public async getSearchedProduct(data: string) {
    const materialInfo = await this.detectRepository.findMaterialIdByMaterialName(data);
    console.log(materialInfo)
    if(!materialInfo){
      throw new Error(`'${data.search}'는 매핑되는 재료가 없습니다.`)
    }
    const products = await this.detectRepository.findProductsByMaterialId(materialInfo.material.id);

    if(!products) { 
      throw new Error(`'${data.search}'는 해당되는 제품을 찾을수 없습니다.`);
    }


   return products;
  }
}
