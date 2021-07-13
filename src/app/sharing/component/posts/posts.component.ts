import { Component, Input, OnInit } from '@angular/core';

import { toHTML } from "ngx-editor";
import { Posts } from 'src/app/models/Posts';
@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.scss']
})
export class PostsComponent implements OnInit {
  @Input() editorContent: Posts;
  preview: string = '';
  constructor() { }

  ngOnInit(): void {
    this.preview =  toHTML(JSON.parse(this.editorContent.data));
  }

}
