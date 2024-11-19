import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { ChatMessage } from '../models/chatMessage.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  constructor(private socket: Socket) {}

  // Enviar un mensaje JSON al backend
  sendMessage(msg: ChatMessage) {
    this.socket.emit('sendMessage', msg);
  }

  // Escuchar mensajes JSON emitidos por el backend
  getMessage(): Observable<ChatMessage> {
    return new Observable<ChatMessage>((observer) => {
      this.socket.on('message-receive', (data: ChatMessage) => {
        observer.next(data);
      });
    });
  }
}
