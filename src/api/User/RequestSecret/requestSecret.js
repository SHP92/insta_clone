import { generateSecret, sendSecretMail } from '../../../utils';

export default {
    Mutation: {
        requestSecret: async(_, args, { prisma }) => {
            const { email } = args;
            const secret = generateSecret();

            try {
                await sendSecretMail(email, secret);
                await prisma.updateUser({data: { secret }, where: { email }});
                return true;
            } catch {
                return false;
            }
        }
    }
}