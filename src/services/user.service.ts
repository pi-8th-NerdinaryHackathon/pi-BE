import {
  getWishFromUserId,
  addOrUpdateUserWish,
  deleteUserWish,
  getUserWishFormUserId,
  addUser,
  getUser,
} from "../repositories/user.repository";

import {
  responseFromUserWish,
  responseFromWish,
  responseFomeUser,
} from "../dtos/user.dto";

import HttpException from "../errors/HttpException";

/**
 * 유저 UUID로 위시리스트 전체 조회
 */
export const listUserWish = async (uuid: string) => {
  const user = await getUser(uuid);
  if (!user) {
    throw new HttpException(403, "유저가 없습니다.");
  }

  const wishList = await getUserWishFormUserId(user.id);
  if (!wishList || wishList.length === 0) {
    return { id: null };
  }

  return wishList.map(responseFromWish); // 여러 개 반환될 수 있음
};

/**
 * 유저 UUID로 위시리스트에 상품 추가 또는 수량 누적
 */
export const addingUserWish = async (
  uuid: string,
  productId: number,
  count: number
) => {
  const user = await getUser(uuid);
  if (!user) {
    throw new HttpException(403, "유저가 없습니다.");
  }

  const userWish = await addOrUpdateUserWish({
    userId: user.id,
    productId,
    count,
  });

  if (!userWish) {
    return { id: null };
  }

  return responseFromUserWish(userWish);
};

/**
 * 유저 UUID로 위시리스트 항목 삭제 (가장 첫 번째 항목 삭제)
 */
export const delUserWish = async (uuid: string) => {
  const user = await getUser(uuid);
  if (!user) {
    throw new HttpException(403, "유저가 없습니다.");
  }

  const userWishes = await getUserWishFormUserId(user.id);
  if (!userWishes || userWishes.length === 0) {
    return { id: null };
  }

  const wish = await deleteUserWish(userWishes[0].id); // 첫 번째 항목 삭제
  return responseFromWish(wish);
};

/**
 * 유저 UUID로 신규 유저 생성
 */
export const addingUser = async (uuid: string) => {
  let user = await getUser(uuid);
  if (user) {
    return responseFomeUser(user);
  }

  user = await addUser({ uuid });
  return responseFomeUser(user);
};
