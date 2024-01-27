import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, from, interval, of, switchMap } from 'rxjs';
import { ChatService } from 'src/app/services/chat.service';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.css'],
})
export class ListChatComponent implements OnInit {
  chatsHost: any = [];
  chatsGuest: any = [];
  loadingHost: boolean = true;
  loadingGuest: boolean = true;
  uuid: string = '';
  userStorage: any = localStorage.getItem('user')
  user: any = JSON.parse(this.userStorage);
  private intervalSubscription: Subscription = new Subscription();
  messageForm: FormGroup;
  messagesJson: any;

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private route: ActivatedRoute, private chatService: ChatService) {
    this.uuid = this.route.snapshot.paramMap.get('uuid') ?? '';
    if (this.uuid) {
      this.getMessageByChatId();

      this.intervalSubscription = interval(3000)
      .pipe(
        switchMap(() => from(this.chatService.getMessagesRefresh(this.uuid)))
      )
      .subscribe(async (data) => {
        if (data) {
          this.messagesJson = data;
        }
      });
    }
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required],
      userId: [ this.user.id, Validators.required],
      chatId: [this.uuid, Validators.required],
    });
  }

  ngOnInit() {
    this.chatService.getChatsHost(this.user.id).subscribe((data: any) => {
      this.chatsHost = data;
      this.loadingHost = false;
    })

    this.chatService.getChatsGuest(this.user.id).subscribe((data: any) => {
      this.chatsGuest = data;
      this.loadingGuest = false;
    })
  }

  ngOnDestroy(): void {
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  getMessageByChatId() {
    this.chatService.getMessages(this.uuid).subscribe((data) => {
      this.messagesJson = data;
    });
  }

  sendMessage() {
    if (this.messageForm.valid) {
      const dataForm = this.messageForm.value;
      console.log(dataForm);
      const url = 'http://147.182.253.73:4000/message/create';

      this.httpClient.post(url, dataForm).subscribe(
        (response) => {
          this.getMessageByChatId();
          console.log('Respuesta del servidor:', response);
        },
        (error) => {
          console.error('Error al enviar datos:', error);
        }
      );
    }
  }
}
