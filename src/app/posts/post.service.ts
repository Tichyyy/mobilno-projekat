import { Injectable } from '@angular/core';
import {
  Database,
  ref,
  set,
  update,
  remove,
  get,
  child,
  DataSnapshot,
} from '@angular/fire/database';
import { from, Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { Post } from './post.model';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  private postsRef = ref(this.db, 'posts'); // Referenca na 'posts' u Firebase

  constructor(private db: Database, private authService: AuthService) {}

  getPosts(): Observable<Post[]> {
    return new Observable((observer) => {
      get(this.postsRef)
        .then((snapshot: DataSnapshot) => {
          if (snapshot.exists()) {
            const posts = snapshot.val();
            observer.next(this.mapObjectToArray(posts));
          } else {
            observer.next([]);
          }
        })
        .catch((error) => observer.error(error));
    });
  }

  addPost(content: string, userName: string): Observable<void> {
    const postId = this.generateId();
    const post: Post = {
      id: postId,
      content,
      userId: this.authService.getCurrentUser()?.uid || '',
      userName: userName, // Dodajemo ime korisnika
      timestamp: new Date().toISOString(),
    };
    const postRef = ref(this.db, `posts/${postId}`);
    return from(set(postRef, post));
  }

  deletePost(id: string): Observable<void> {
    const postRef = ref(this.db, `posts/${id}`);
    return from(remove(postRef));
  }

  editPost(id: string, content: string): Observable<void> {
    const postRef = ref(this.db, `posts/${id}`);
    return from(update(postRef, { content }));
  }

  private mapObjectToArray(object: any): Post[] {
    const postsArray: Post[] = [];
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        postsArray.push({ id: key, ...object[key] });
      }
    }
    return postsArray;
  }

  private generateId(): string {
    // Možete koristiti neku biblioteku ili funkciju za generisanje jedinstvenog ID-a
    return Math.random().toString(36).substring(2, 15);
  }
}
