import { prisma } from '../../../../generated/prisma-client';
import { ROOM_FRAGMENT } from '../../../fragments';

export default {
    Mutation: {
        sendMessage: async (_, args, { request, isAuthenticated }) => {
            isAuthenticated(request);
            
            const { roomId, message, toId } = args;
            const { user } = request;

            let room;
            if ( roomId === undefined ) {
                if (user.id !== toId ) {
                    room = await prisma.createRoom({
                    participants: {
                        connect: [ {id: toId}, {id: user.id }]
                        }
                    }).$fragment(ROOM_FRAGMENT);
                }
            } else {
                room = await prisma.room({ id: roomId }).$fragment(ROOM_FRAGMENT);
            }
            if ( !room ) {
                throw Error('cannot find any room');
            }

            const to = room.participants.filter(
                participant => participant.id !== user.id
            )[0];

            const NewMessage = await prisma.createMessage({
                text: message,
                from: {
                    connect: { id: user.id }
                },
                to: {
                    connect: { id: roomId ? to.id : toId }
                },
                room: {
                    connect: { id: room.id }
                }
            });
            return NewMessage;
        }
    }
}