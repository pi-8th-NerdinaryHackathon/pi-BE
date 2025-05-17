import { prisma } from "../db.config";

export class DetectRepository {
  /**
   * 라벨(예: "양말")을 기반으로 material 정보 반환
   */
  public async findMaterialByLabel(label: string) {
    return await prisma.material.findFirst({
      where: {
        name: label.toLowerCase().trim(), // 대소문자, 공백 처리
      },
    });
  }

  /**
   * 해당 재료(materialId)로 연결된 모든 제품 반환
   */
  public async findProductsByMaterialId(materialId: number) {
    return await prisma.product.findMany({
      where: {
        ProductMaterials: {
          some: { materialId },
        },
      },
      include: {
        company: true,
        category: true,
        ProductMaterials: {
          include: { material: true },
        },
      },
    });
  }
}
