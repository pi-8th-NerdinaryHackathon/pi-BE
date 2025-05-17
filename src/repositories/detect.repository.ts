import { prisma } from "../db.config";

export class DetectRepository {
  public async findMaterialByLabel(label: string) {
    return await prisma.material.findFirst({
      where: { name: label },
    });
  }

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

  public async findMaterialIdByMaterialName(searchKeyword: string){
    const materialInfo = await prisma.searchKeyword.findFirst({
        where: {
        keyword: {
        equals: searchKeyword,
      },
    },
    select: {
      material: {
        select: {
          id: true,
          name: true,
        },
      }
    },
  });
    return materialInfo;
  }
  
}
