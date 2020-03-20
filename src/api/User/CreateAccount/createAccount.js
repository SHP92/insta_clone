import { prisma } from '../../../../generated/prisma-client';

export default {
    Mutation: {
        createAccount: async(_, args) => {
            const { name, email, bio } = args;
            const user = await prisma.createUser({ name, email, bio });
            return user;
        }
    }
}