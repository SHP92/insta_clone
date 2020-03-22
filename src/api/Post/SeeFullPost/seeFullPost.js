import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeFullPost: async(_, args) => {
            const { postId } = args;
            const post = await prisma.post({ id: postId });
            const comments = await prisma.post({ id: postId }).comments();
            const files = await prisma.post({ id: postId }).files();
            const user = await prisma.post({ id: postId }).user();

            return { post, comments, files, user };
        }
    }
}