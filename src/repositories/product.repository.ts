import { prisma } from "../db.config";
import { responseFromProducts, responseFromProduct } from "../dtos/product.dto";
export const getProducts = async () => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      detail: true,
      image: true,
      price: true,
      company: true,
      category: true,
      ProductMaterials: {
        select: {
          material: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return products;
};

export const getProduct = async (productId: number) => {
  const product = await prisma.product.findFirst({
    select: {
      id: true,
      name: true,
      detail: true,
      image: true,
      price: true,
      company: true,
      category: true,
      ProductMaterials: {
        select: {
          material: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    where: {
      id: productId,
    },
  });
  return product;
};

export const getProductsFromCategory = async (categoryId: number) => {
  const products = await prisma.product.findMany({
    select: {
      id: true,
      name: true,
      detail: true,
      image: true,
      price: true,
      company: true,
      category: true,
      ProductMaterials: {
        select: {
          material: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    where: {
      categoryId: categoryId,
    },
  });
  return products;
};

export const getProductsFromMaterial = async (materialId: number) => {
  const products = await prisma.product.findMany({
    where: {
      ProductMaterials: {
        some: {
          materialId: materialId, // 중간 테이블 기준
        },
      },
    },
    include: {
      company: true,
      category: true,
      ProductMaterials: {
        include: {
          material: true,
        },
      },
    },
  });

  return responseFromProducts(products);
};

export const getCategoryList = async () => {
  const categories = await prisma.category.findMany({
    select:{
      id: true,
      name: true
    }
  });
  console.log(categories);
  return categories;
}