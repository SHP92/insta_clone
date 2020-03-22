import { prisma } from '../../../../generated/prisma-client';
import { USER_FRAGMENT, ROOM_FRAGMENT, MESSAGE_FRAGMENT } from '../../../fragments';

export default {
    Query: {
        seeRoom: async (_, args, { request, isAuthenticated })=> {
            isAuthenticated(request);

            const { roomId } = args;
            const { user } = request;
            const room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
            const messages = await prisma.room({ id: roomId }).messages().$fragment(MESSAGE_FRAGMENT);
            return { room, messages };
        }
    }
}