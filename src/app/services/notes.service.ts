import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(private http: HttpClient) { }

  getAllNotes() {
    return this.http.get('/api/notes');
  }
  createNote(data) {
    return this.http.post('/api/notes',  data);
  }
  upVote(id, notes) {
    return this.http.put(`/api/notes/${id}/upvote`, {notes: notes});
  }
  downVote(id, notes) {
    return this.http.put(`/api/notes/${id}/downvote`, {notes: notes});
  }
  deleteNote(id) {
    return this.http.delete(`/api/notes/${id}`);
  }
}
