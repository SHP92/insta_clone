import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        seeUserProfile: async(_, args) => {
            const { id } = args;
            const user = await prisma.user({ id });
            const posts = await prisma.user({ id }).posts();
            const followers = await prisma.user({ id }).followers();
            const followings = await prisma.user({ id }).followings();
            return { user, posts, followers, followings };
        }
    }
}