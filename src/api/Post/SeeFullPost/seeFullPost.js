import { prisma } from "../../../../generated/prisma-client";
import { COMMENT_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        seeFullPost: async(_, args) => {
            const { postId } = args;
            const post = await prisma.post({ id: postId });
            const comments = await prisma.post({ id: postId }).comments().$fragment(COMMENT_FRAGMENT);
            const likeCount = await prisma.likesConnection({
                where: { post: { id: postId }}
            }).aggregate().count();

            return { post, comments, likeCount };
        }
    }
}