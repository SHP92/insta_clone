import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        seeFullPost: async(_, args) => {
            const { postId } = args;
            const post = await prisma.post({ id: postId });
            const comments = await prisma.post({ id: postId }).comments().$fragment(COMMENT_FRAGMENT);
            const files = await prisma.post({ id: postId }).files();
            const user = await prisma.post({ id: postId }).user();

            return { post, comments, files, user };
        }
    }
}