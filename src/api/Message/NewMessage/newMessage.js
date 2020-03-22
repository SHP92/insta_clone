import { prisma } from '../.././../../generated/prisma-client';

export default {
    Subscription: {
        newMessage: {
            subscribe: async (_, args) => {
                const { roomId } = args;
                const newMessage = await prisma.$subscribe.message({
                    AND: [
                        { mutation_in: "CREATED"},
                        {
                            node: {
                                room: { id: roomId }
                            }
                        }
                    ]
                }).node();
                return newMessage;
            },
            resolve: payload => payload
        }
    }
}