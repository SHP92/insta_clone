import { isAuthenticated } from '../../../middleware';
import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        searchUser: async(_, args, { request }) => {
            // isAuthenticated(request);
            
            const { term } = args;
            return prisma.users({ where: { name_contains: term }});
        }
    }
}