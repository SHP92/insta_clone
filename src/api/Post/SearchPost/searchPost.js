import { prisma } from "../../../../generated/prisma-client";

export default {
    Query: {
        searchPost: async(_, args) => {
            const { term } = args;
            return prisma.posts({ where: {
                OR: [
                    { loaction_starts_with: term },
                    { caption_starts_with: term }
                ]
            }});
        }
    }
}