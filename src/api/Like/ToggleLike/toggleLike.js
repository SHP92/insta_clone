import { isAuthenticated } from '../../../middleware';
import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        toggleLike: async(_, args, { request }) => {
            isAuthenticated(request);
            
            const { postId } = args;
            const { user } = request;
            const filter = {
                AND: [
                    {
                        user: {
                            id: user.id
                        }
                    },
                    {
                        post: {
                            id: postId
                        }
                    }
                ]
            };
            
            try {
                const exsitingLike = await prisma.$exists.like(filter)
                if (exsitingLike) {
                    // WHY use deleteManyLikes instead of deleteLike?
                    // CAUSE we don't know deleteLike(id) and other params aren't unique
                    await prisma.deleteManyLikes(filter)
                } else {
                    await prisma.createLike({
                        user: {
                            connect: { id: user.id}
                        },
                        post: {
                            connect: { id: postId }
                        }
                    });
                }
                return true;
            } catch {
                return false;
            }
        }
    }
}