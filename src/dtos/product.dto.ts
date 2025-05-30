export const responseFromProducts = (products: any[]) => {
    return products.map((product) => ({
      product: {
        id: product.id,
        name: product.name,
        detail: product.detail,
        image: product.image,
        price: product.price,
        company: {
          id: product.company.id,
          name: product.company.name,
          number: product.company.number,
          address: product.company.address,
          adressSpec: product.company.adressSpec,
          detail: product.company.detail
        },
        category: {
          id: product.category.id,
          name: product.category.name
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
        id: product.company.id,
        name: product.company.name,
        number: product.company.number,
        address: product.company.address,
        adressSpec: product.company.adressSpec,
        detail: product.company.detail
      },
      category: {
        id: product.category.id,
        name: product.category.name
      },
      material: product.ProductMaterials[0].material.name
    }
    };
  };
