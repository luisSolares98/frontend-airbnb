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
      nombre: ['', Validators.required],
      mensaje: ['', Validators.required]
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
}
