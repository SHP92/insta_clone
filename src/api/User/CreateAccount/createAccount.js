export default {
    Mutation: {
        createAccount: async(_, args, { prisma }) => {
            const { name, email, bio } = args;
            const user = await prisma.createUser({ name, email, bio });
            return user;
        }
    }
}