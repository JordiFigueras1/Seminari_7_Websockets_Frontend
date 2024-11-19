import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChatService } from '../../services/chat.service';
import { FormsModule } from '@angular/forms';
import { ChatMessage } from '../../models/chatMessage.model'; 

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  messageText: string = '';       // Texto del mensaje a enviar
  messages: ChatMessage[] = [];  // Lista de mensajes recibidos
  currentUser: string = 'Usuario1'; // Puedes cambiar esto por el nombre del usuario logueado

  constructor(private chatService: ChatService) {}

  ngOnInit(): void {
    const username = prompt('Introduce tu nombre de usuario:');
    this.currentUser = username ? username : `Usuario${Math.floor(Math.random() * 1000)}`;
  
    // Escuchar mensajes del backend
    this.chatService.getMessage().subscribe((message) => {
      this.messages.push(message);
    });
  }
  

  // Enviar un mensaje
  sendMessage(): void {
    if (this.messageText.trim()) {
      const newMessage: ChatMessage = {
        message: this.messageText,
        author: this.currentUser,
        date: new Date().toISOString()
      };

      this.chatService.sendMessage(newMessage);
      this.messageText = ''; // Limpiar el campo de texto
    }
  }
}


