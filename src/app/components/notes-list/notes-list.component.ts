import { Component, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Note } from 'src/app/models/notes.model';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.css']
})

export class NotesListComponent implements OnInit {
  
  postList;
  post = {
    title: '',
    url: ''
  };
  constructor(private postsService: NotesService) {
  }
  ngOnInit() {
    this.postsService.getAllNotes().subscribe((data: Note[]) => {
      this.postList = data;
    });
  }
  addPost() {
    const newPost = {
      title: this.post.title,
      url: this.post.url,
    };
    this.postsService.createNote(newPost).subscribe((data: Note) => {
      this.postList.push(data);
      this.sortPosts();
    }, (err) => console.log(err));
    this.post = { title: '', url: ''};
  }
  upVote(post) {
    const thePost = this.postList.find(itm => post._id === itm._id);
    thePost.votes = thePost.votes + 1;
    this.postsService.upVote(post._id, post.votes).subscribe((data: Note) => {
      // console.log(data);
    });
    this.sortPosts();
  }
  downVote(post) {
    const thePost = this.postList.find(itm => post._id === itm._id);
    thePost.votes = thePost.votes - 1;
    this.postsService.downVote(post._id, post.votes).subscribe((data: Note) => {
      // console.log(data);
    });
    this.sortPosts();
  }
  deletePost(post) {
    this.postsService.deleteNote(post._id).subscribe((data: Note) => {
    const index = this.postList.indexOf(post);
    this.postList.splice(index, 1);
  });
}
  sortPosts() {
    this.postList.sort((a, b) => Number(a.votes) < Number(b.votes));
  }

}
