import { responseFromProduct, responseFromProducts } from "../dtos/product.dto";
import {
    getProducts,
    getProduct,
    getProductsFromCategory,
    getCategoryList
} from "../repositories/product.repository";

export const listProduct = async () => {
    const products = await getProducts();
    return responseFromProducts(products);
    
};
  
export const listSpecProduct = async (productId: number) => {
    const product = await getProduct(productId);
    return responseFromProduct(product); 
};

export const listProductsFromCategory = async (categoryId: number) => {
    const products = await getProductsFromCategory(categoryId);
    return responseFromProducts(products);
}

export const listProductCategory = async() => {
    return await getCategoryList();
}