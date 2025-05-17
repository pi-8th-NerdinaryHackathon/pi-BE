export const responseFromProducts = (products: any[]) => {
    return products.map((product) => ({
      product: {
        id: product.id,
        name: product.name,
        detail: product.detail,
        image: product.image,
        price: product.price,
        company: {
          id: product.id,
          name: product.name,
          number: product.number,
          address: product.address,
          adressSpec: product.adressSpec,
          detail: product.detail
        },
        category: {
          id: product.id,
          name: product.name
        },
        material: products[0].ProductMaterials[0].material.name
      }
      }));
};

export const responseFromProduct = (product: any) => {
  return {
    product: {
      id: product.id,
      name: product.name,
      detail: product.detail,
      image: product.image,
      price: product.price,
      company: {
        id: product.id,
        name: product.name,
        number: product.number,
        address: product.address,
        adressSpec: product.adressSpec,
        detail: product.detail
      },
      category: {
        id: product.id,
        name: product.name
      },
      material: product.ProductMaterials[0].material.name
    }
    };
  };