import { generateToken } from '../../../utils';

export default {
    Mutation: {
        confirmSecret: async(_, args, { prisma }) => {
            const { email, secret } = args;
            const user = await prisma.user({ email });

            if (user.secret === secret){
                const token = generateToken(user.id);
                return token;
            } else {
                throw Error('invalid token');
            }
        }
    }
}