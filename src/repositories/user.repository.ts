import { prisma } from "../db.config";

/**
 * UUID로 사용자 조회
 */
export const getUser = async (uuid: string) => {
  return await prisma.user.findFirst({
    where: { uuid },
  });
};

/**
 * 사용자 ID로 위시 하나 가져오기 (product 포함)
 */
export const getWishFromUserId = async (userId: number) => {
  return await prisma.userWish.findFirst({
    select: {
      product: true,
    },
    where: {
      userId,
    },
  });
};

/**
 * 사용자 ID로 전체 위시리스트 조회 (게이지 출력용)
 */
export const getUserWishFormUserId = async (userId: number) => {
  return await prisma.userWish.findMany({
    where: { userId },
    include: {
      product: true,
    },
  });
};

/**
 * 수량을 누적해서 위시리스트에 추가하거나 업데이트
 */
export const addOrUpdateUserWish = async (data: {
  userId: number;
  productId: number;
  count: number;
}) => {
  const { userId, productId, count } = data;

  const product = await prisma.product.findFirst({
    where: { id: productId },
  });

  if (!product) return null;

  const existing = await prisma.userWish.findFirst({
    where: { userId, productId },
  });

  if (existing) {
    return await prisma.userWish.update({
      where: { id: existing.id },
      data: {
        material_count: {
          increment: count,
        },
      },
    });
  }

  return await prisma.userWish.create({
    data: {
      userId,
      productId,
      material_count: count,
    },
  });
};

/**
 * 위시리스트 항목 삭제
 */
export const deleteUserWish = async (id: number) => {
  return await prisma.userWish.delete({
    where: { id },
  });
};

/**
 * 사용자 생성
 */
export const addUser = async (data: { uuid: string }) => {
  return await prisma.user.create({
    data,
  });
};
