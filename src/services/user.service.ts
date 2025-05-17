import {
    getWishFromUserId,
    addUserWish,
    deleteUserWish,
    getUserWishFormUserId
} from "../repositories/user.repository";
import {
    responseFromUserWish,
    responseFromWish,
 } from "../dtos/user.dto";
export const listUserWish = async (userId: number) => {
    const wish = await getWishFromUserId(userId);
    return responseFromWish(wish)
};
  
export const addingUserWish = async (userId: number, productId: number) => {
    console.log(productId, productId)
    const data = {
        userId: userId,
        productId: productId
    }
    const userWish = await addUserWish(data);
    return responseFromUserWish(userWish);
};

export const delUserWish = async (userId: number) => {
    const userWish = await getUserWishFormUserId(userId)
    if (!userWish) {
        return null;
    }
    const wish = await deleteUserWish(userWish.id);
    return responseFromWish(wish);
}