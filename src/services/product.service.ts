import {
    getProducts,
    getProduct,
    getProductsFromCategory
} from "../repositories/product.repository";

export const listProduct = async () => {
    return await getProducts();
};
  
export const listSpecProduct = async (productId: number) => {
    return await getProduct(productId);
};

export const listProductsFromCategory = async (categoryId: number) => {
    return await getProductsFromCategory(categoryId);
}