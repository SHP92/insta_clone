import { prisma } from "../../generated/prisma-client";

export default {
    User: {
        amIFollowing: async(parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            const exist = await prisma.$exists.user({
                where: {
                    AND: [
                        { id: parentId },
                        { followers_some: {id: user.id} }
                    ]
                }
            });
    
            if (exist) {
                return true;
            } else {
                return false;
            }
        },
        itsMe: (parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return user.id === parentId;
        }
    },
    Post: {
        isLiked: async(parent, _, { request }) => {
            const { user } = request;
            const { id: parentId } = parent;
            return await prisma.$exists.like({
                AND: [
                    { user: { id: user.id }},
                    { post: {id: parentId }}
                ]
            });
        },
        likeCount: (parent) => {
            return prisma.likesConnection({
                where: { post: { id: parent.id }}
            }).aggregate().count();
        },
        files: parent => prisma.post({ id: parent.id }).files(),
        comments: parent => prisma.post({ id: parent.id }).comments(),
        user : parent => prisma.post({ id: parent.id }).user()
    }
}