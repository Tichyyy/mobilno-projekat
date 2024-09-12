import { Component, OnInit } from '@angular/core';
import { PostService } from '../posts/post.service';
import { AuthService } from '../auth.service';
import { Post } from '../posts/post.model';

@Component({
  selector: 'app-other-posts',
  templateUrl: './other-posts.page.html',
  styleUrls: ['./other-posts.page.scss'],
})
export class OtherPostsPage implements OnInit {
  posts: Post[] = [];
  currentUserId: string | undefined;

  constructor(
    private postService: PostService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.currentUserId = this.authService.getCurrentUser()?.uid;
    this.loadOtherPosts();
  }

  loadOtherPosts() {
    this.postService.getPosts().subscribe((posts: Post[]) => {
      this.posts = posts.filter((post) => post.userId !== this.currentUserId);
    });
  }
}
