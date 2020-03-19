import { prisma } from "../../../../generated/prisma-client"

export default {
    Query : {
        allUser: async(_,args) => {
            return await prisma.users()
        }
    }
}