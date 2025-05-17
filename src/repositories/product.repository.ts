import { prisma } from "../db.config";
import { responseFromProducts, responseFromProduct } from "../dtos/product.dto";
export const getProducts = async () => {
    const products = await prisma.product.findMany();
    return responseFromProducts(products);
};

export const getProduct = async (productId: number) => {
    const product = await prisma.product.findFirst({
        where: {
            id: productId
        }
    });
    return responseFromProduct(product);
};

export const getProductsFromCategory = async (categoryId: number) => {
    const products = await prisma.product.findMany({
        where: {
            categoryId: categoryId
        }
    });
    return responseFromProducts(products);
}