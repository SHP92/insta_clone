import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        searchUser: async(_, args) => {
            const { term } = args;
            return prisma.users({ where: { name_contains: term }});
        }
    }
}