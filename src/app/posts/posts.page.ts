import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts/post.service';
import { AuthService } from '../auth.service';
import { Post } from '../posts/post.model';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.page.html',
  styleUrls: ['./posts.page.scss'],
})
export class PostsPage implements OnInit {
  posts: Post[] = [];
  currentUserId: string | undefined; // Trenutni korisnik

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUserId = this.getCurrentUser()?.uid; // Preuzimamo ID trenutnog korisnika
    this.loadPosts();
  }

  loadPosts() {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      // Filtriramo postove kako bi prikazali samo postove trenutnog korisnika
      this.posts = posts
        .filter((post) => post.userId === this.currentUserId)
        .map((post) => ({
          ...post,
          isEditing: false,
          newContent: post.content,
        }));
    });
  }

  addPost(content: string, userName: string) {
    if (content.trim() && userName.trim()) {
      this.postService.addPost(content, userName).subscribe(() => {
        this.loadPosts(); // Ponovo učitaj postove nakon dodavanja

        // Obriši tekstualna polja
        (
          document.querySelector(
            'ion-textarea'
          ) as unknown as HTMLTextAreaElement
        ).value = '';
        (
          document.querySelector('ion-input') as unknown as HTMLInputElement
        ).value = '';
      });
    }
  }

  deletePost(id: string) {
    if (id) {
      this.postService.deletePost(id).subscribe(() => {
        this.posts = this.posts.filter((post) => post.id !== id);
      });
    }
  }

  toggleEdit(post: Post) {
    if (post.isEditing) {
      this.editPost(post.id, post.newContent || post.content);
    } else {
      post.isEditing = true;
    }
  }

  editPost(id: string, content: string) {
    if (id && content) {
      this.postService.editPost(id, content).subscribe(() => {
        this.loadPosts();
      });
    }
  }

  getCurrentUser() {
    return this.authService.getCurrentUser();
  }
}
