// import { UseGuards } from '@nestjs/common';
import {
  SubscribeMessage,
  WebSocketGateway,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({
  namespace: 'chat',
  cors: {
    origin: true,
  },
  Credential: true,
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private chatService: ChatService) {}

  async handleConnection(client: Socket, ...args: any[]) {
    // map users_id set clientSocketsIds
    // on disconnect -> socket remove from map
    // client.join(client.id);
    // console.log(`Client connected To The Chat: ${client.id}`);
  }
  async handleDisconnect(client: Socket) {
    // console.log(`Client disconnected from The Chat: ${client.id}`);
  }

  @SubscribeMessage('joinRoom')
  handleJoinRoom(client: Socket, data: any) {
    const { conversationId } = data;

    client.join(conversationId);
  }

  // @SubscribeMessage('createRoom')
  // async handleCreateRoom(client: Socket, roomName: string) {
  //   await this.chatService.handleCreateRoom(client, roomName, this.userID);
  // }

  // @SubscribeMessage('leaveRoom')
  // async handleLeaveRoom(client: Socket, roomId: string) {
  //   await this.chatService.handleLeaveRoom(client, roomId, this.userID);
  // }

  // @SubscribeMessage('deleteRoom')
  // async handleDeleteRoom(client: Socket, roomId: string) {
  //   await this.chatService.handleDeleteRoom(client, roomId, this.server);
  // }

  // @SubscribeMessage('joinRoom')
  // async handleJoinRoom(client: Socket, roomId: string) {
  //   this.userID = await this.chatService.extractUserId(client);
  //   await this.chatService.handleJoinRoom(client, roomId, this.userID);
  // }

  // @SubscribeMessage('sendMessage')
  // async handleSendMessage(
  //   client: Socket,
  //   data: { roomId: string; message: string },
  // ) {
  //   await this.chatService.handleSendMessage(
  //     client,
  //     data.roomId,
  //     data.message,
  //     this.userID,
  //     this.server,
  //   );
  // }

  // @SubscribeMessage('sendDirectMessage')
  // async handleSendDirectMessage(
  //   client: Socket,
  //   data: { recieverID: string; message: string },
  // ) {
  //   // console.log(data.recieverID);
  //   // console.log(data.message);
  // }
}
