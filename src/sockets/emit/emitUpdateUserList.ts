import errorMessage from "../../messages/errorMessage";
import { io } from "../../../app";
import { Socket } from "socket.io";
import { getRedis } from "../../redis/redis";
import { Username } from "../../interfaces/username";
export default async function emitUpdateUserList(redis: any, roomName: string ): Promise <void> {
    try{

        const listUsers = await getRedis(redis,'user',roomName)
        io.to(roomName).emit('update user list',listUsers as Array<Username>)

    }catch(err){
        errorMessage('emitJoinUser', err)
    }
}