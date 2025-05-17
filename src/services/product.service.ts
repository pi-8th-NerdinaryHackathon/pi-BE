import {
    getProducts,
    getProduct,
    getProductsFromCategory,
    getCategoryList
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

export const listProductCategory = async() => {
    return await getCategoryList();
}