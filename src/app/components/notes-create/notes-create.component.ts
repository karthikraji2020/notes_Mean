import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/models/notes.model';

@Component({
  selector: 'app-notes-create',
  templateUrl: './notes-create.component.html',
  styleUrls: ['./notes-create.component.css']
})
export class NotesCreateComponent implements OnInit {
  postList;
  post = {
    title: '',
    url: ''
  };
  constructor(private notesService: NotesService) {
  }
  ngOnInit() {
    this.notesService.getAllNotes().subscribe((data: Note[]) => {
      this.postList = data;
    });
  }
  addPost() {
    const newPost = {
      title: this.post.title,
      url: this.post.url,
    };
    this.notesService.createNote(newPost).subscribe((data: Note) => {
      this.postList.push(data);
      this.sortPosts();
    }, (err) => console.log(err));
    this.post = { title: '', url: ''};
  }
  
  sortPosts() {
    this.postList.sort((a, b) => Number(a.votes) < Number(b.votes));
  }

}
