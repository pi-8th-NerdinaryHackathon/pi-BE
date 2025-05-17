export const responseFromProducts = (products: any[]) => {
    return products.map((product) => ({
      product
    }));
};

export const responseFromProduct = (product: any) => {
    return product;
  };