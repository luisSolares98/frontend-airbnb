import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription, from, interval, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-list-chat',
  templateUrl: './list-chat.component.html',
  styleUrls: ['./list-chat.component.css'],
})
export class ListChatComponent implements OnInit {
  messageForm: FormGroup;
  dataJson: any;
  uuid: string = '';
  messagesJson: any;
  loading: boolean = true;
  userStorage: any = localStorage.getItem('user')
  user: any = JSON.parse(this.userStorage);
  private intervalSubscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private route: ActivatedRoute) {
    this.uuid = this.route.snapshot.paramMap.get('uuid') ?? '';
    if (this.uuid) {
      this.getMessagesDigitalOceans();

      this.intervalSubscription = interval(3000)
      .pipe(
        switchMap(() => from(this.getMessagesDigitalOceansRefresh()))
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
    this.getChatsDigitalOceans();
  }

  getMessagesDigitalOceans() {
    this.httpClient.get(`http://147.182.253.73:4000/message/${this.uuid}`)
      .subscribe((data: any) => {
        this.messagesJson = data;
      });
  }

  ngOnDestroy(): void {
    // Detiene el intervalo cuando el componente se destruye
    if (this.intervalSubscription) {
      this.intervalSubscription.unsubscribe();
    }
  }

  getChatsDigitalOceans():any {
    const {id} = JSON.parse(this.userStorage)
    // http://147.182.253.73:4000/chat/host/${id}
    this.httpClient.get(`http://147.182.253.73:4000/chats`).subscribe((data: any) => {
      this.dataJson = data;
      console.log(data)
      this.loading = false;
    });
  }

  getMessagesDigitalOceansRefresh(): any {
    // Return an observable using 'of'
    return this.httpClient.get(`http://147.182.253.73:4000/message/${this.uuid}`);
  }

  sendMessage() {
    if (this.messageForm.valid) {
      const dataForm = this.messageForm.value;
      console.log(dataForm);
      const url = 'http://147.182.253.73:4000/message/create';

      this.httpClient.post(url, dataForm).subscribe(
        (response) => {
          this.getMessagesDigitalOceans();
          console.log('Respuesta del servidor:', response);
        },
        (error) => {
          console.error('Error al enviar datos:', error);
        }
      );
    }
  }
}
