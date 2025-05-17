import {
    getWishFromUserId,
    addUserWish,
    deleteUserWish,
    getUserWishFormUserId,
    addUser,
    getUser
} from "../repositories/user.repository";
import {
    responseFromUserWish,
    responseFromWish,
    responseFomeUser
 } from "../dtos/user.dto";
import HttpException from "../errors/HttpException";
export const listUserWish = async (uuid: string) => {
    const user = await getUser(uuid);
    if (!user) {
        throw new HttpException(403, "유저가 없습니다.");
    }
    // product 에러
    const wish = await getWishFromUserId(user.id);
    if (!wish) {
        return {id: null}
    }
    return responseFromWish(wish)
};
  
export const addingUserWish = async (uuid: string, productId: number) => {
    const user = await getUser(uuid);
    if (!user) {
        throw new HttpException(403, "유저가 없습니다.");
    }
    const data = {
        userId: user.id,
        productId: productId
    }
    // product 에러
    const userWish = await addUserWish(data);
    if (!userWish) {
        return {id: null}
    }
    return responseFromUserWish(userWish);
};

export const delUserWish = async (uuid: string) => {
    const user = await getUser(uuid);
    if (!user) {
        throw new HttpException(403, "유저가 없습니다.");
    }
    const userWish = await getUserWishFormUserId(user.id)
    if (!userWish) {
        return {id: null}
    }
    const wish = await deleteUserWish(userWish.id);
    return responseFromWish(wish);
}

export const addingUser = async (uuid: string) => {
    let user = await getUser(uuid);
    if (user) {
        return responseFomeUser(user); 
    }
    const data = {
        uuid: uuid
    }
    user = await addUser(data);
    return responseFomeUser(user);
}