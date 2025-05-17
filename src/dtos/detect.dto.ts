export class ImageDetectRequestDto {
  imageUrl!: string;
}

export class RequestSearchProductDto{
  search?: string;
}
  
// export class ResponseSearchProductDto{
//   product_id: number;
//   name: string;
//     "detail": "인형",
//     "image": "a",
//     "price": 3,
//     "companyId": 1,
//     "categoryId": 1,
//     "createdAt": "2025-05-18T01:16:26.000Z",
//     "updatedAt": "2025-05-18T01:17:43.000Z",
//     "company": {
//       "id": 1,
//       "name": "a company",
//       "number": "010",
//       "address": "11",
//       "adressSpec": "11",
//       "detail": "123"
//     },
//     "category": {
//       "id": 1,
//       "name": "aa"
//     },
//     "ProductMaterials": [
//       {
//         "id": 1,
//         "productId": 1,
//         "materialId": 3,
//         "material": {
//           "id": 3,
//           "name": "can"
//         }
//       }
//     ]
// }