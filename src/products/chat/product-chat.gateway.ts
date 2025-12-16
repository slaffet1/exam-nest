import { 
  WebSocketGateway, 
  WebSocketServer,
  SubscribeMessage, 
  MessageBody,
  ConnectedSocket 
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  cors: {
    origin: '*'  // Permet les connexions depuis n'importe quelle origine
  }
})
export class ProductChatGateway {

  @WebSocketServer()
  server: Server;

  // Quand un client envoie un message
  @SubscribeMessage('message')
  handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() payload: string
  ) {
    console.log('📩 Message reçu du client:', payload);
    
    // Répondre uniquement au client qui a envoyé
    client.emit('message', 'Serveur a reçu: ' + payload);
    
    // OU diffuser à TOUS les clients connectés
    // this.server.emit('message', 'Serveur a reçu: ' + payload);
  }

  // Quand un client se connecte
  handleConnection(client: Socket) {
    console.log('✅ Client connecté:', client.id);
  }

  // Quand un client se déconnecte
  handleDisconnect(client: Socket) {
    console.log('❌ Client déconnecté:', client.id);
  }
}