import { prisma } from '../../../../generated/prisma-client';

export default {
    Query: {
        allRooms: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);

            const { user } = request;
            const rooms = await prisma.rooms({ where: { participants_some: { id: user.id }}});
            return rooms;
        }
    }
}