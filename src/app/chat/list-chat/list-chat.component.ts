import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

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


  constructor(private formBuilder: FormBuilder, private httpClient: HttpClient, private route: ActivatedRoute) {
    this.uuid = this.route.snapshot.paramMap.get('uuid') || '';
    if (this.uuid) {
      this.getMessagesDigitalOceans();
    }
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required],
      userId: ['b04b168e-922c-40f1-8f31-1833f493d1f9', Validators.required],
      chatId: [this.uuid, Validators.required],
    });
  }
  getMessagesDigitalOceans() {
    this.httpClient.get(`http://147.182.253.73:4000/message/${this.uuid}`)
      .subscribe((data: any) => {
        console.log(data);
        this.messagesJson = data;
      });
  }

  ngOnInit() {
    this.getChatsDigitalOceans();
  }

  getChatsDigitalOceans() {
    this.httpClient.get('http://147.182.253.73:4000/chats').subscribe((data: any) => {
      this.dataJson = data;
    });
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
