import { prisma } from '../../../../generated/prisma-client';
import { generateToken } from '../../../utils';

export default {
    Mutation: {
        confirmSecret: async(_, args) => {
            const { email, secret } = args;
            const user = await prisma.user({ email });

            if (user.secret === secret){
                await prisma.updateUser({ 
                    where: { id: user.id},
                    data: { secret: '' }
                });
                const token = generateToken(user.id);
                return token;
            } else {
                throw Error('invalid token');
            }
        }
    }
}