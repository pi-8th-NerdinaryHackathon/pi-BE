import { prisma } from "../db.config";

export const getUser = async (uuid: string) => {
    const user = prisma.user.findFirst({
        where: {
            uuid: uuid
        }
    })
    return user;
}

export const getWishFromUserId = async (userId: number) => {
    const wish = await prisma.userWish.findFirst({
        select: {
            product: true
        },
        where: {
            userId: userId,
        }
    });
    return wish;
};

export const addUserWish = async (data: {
    userId: number;
    productId: number;
}) => {
    const product = await prisma.product.findFirst({
        where: {
            id: data.productId
        }
    })

    if(!product)
        return null;

    const userWish = await prisma.userWish.create({
        data 
    });
    return userWish;
};

export const getUserWishFormUserId = async (userId: number) => {
    const userWish = await prisma.userWish.findFirst({
        where: {
            userId: userId,
        }
    });
    return userWish;
};

export const deleteUserWish = async (id: number) => {
    const wish = await prisma.userWish.delete({
        where: {
            id: id
        }
    });
    return wish;
}
export const addUser = async (data: {
    uuid: string
}) => {
    const user = await prisma.user.create({
        data
    })
    return user;
}