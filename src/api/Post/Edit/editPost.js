import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        editPost: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);

            const { postId, caption, loaction, actions } = args;
            const { user } = request;
            const exist = await prisma.$exists.post({ user: { id: user.id }, id: postId });
            if (exist){
                if (actions === "EDIT"){
                    return await prisma.updatePost({ where: { id: postId }, data: { caption, loaction }});
                } else if (actions === "DELETE"){
                    return await prisma.deletePost({ id: postId });
                }
            } else {
                throw Error('no authentication');
            }
        }
    }
}