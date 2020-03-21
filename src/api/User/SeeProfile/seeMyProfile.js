import { prisma } from "../../../../generated/prisma-client";
import { USER_FRAGMENT } from "../../../fragments";

export default {
    Query: {
        seeMyProfile: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            return await prisma.user({ id: request.user.id }).$fragment(USER_FRAGMENT);
        },

        me: async(_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            const user =  await prisma.user({ id: request.user.id });
            const posts = await prisma.user({ id: request.user.id }).posts();
            const followers = await prisma.user({ id: request.user.id }).followers();
            const followings = await prisma.user({ id: request.user.id }).followings();
            return { user, posts, followers, followings };
        }
    }
}