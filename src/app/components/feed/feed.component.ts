import { Component, OnInit } from '@angular/core';
import { PostService } from 'src/app/services/postService/post.service';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss'],
})
export class FeedComponent implements OnInit {
  posts: any[] = [];

  constructor(private postService: PostService) {}

  ngOnInit() {
    this.getPosts()
  }

  getPosts() {
    this.postService.getPosts().subscribe(
      (data) => {
        this.posts = data.posts; // Update the posts array
      },
      (error) => {
        console.error('Error fetching posts:', error);
      }
    );
  }

  toggleLike(post: any) {
    if (post.liked) {
      this.unlikePost(post);
    } else {
      this.likePost(post);
    }
  }

  likePost(post: any) {
    this.postService.likePost(post.id).subscribe(
      (data) => {
        post.likes++;
        post.liked = true;
      },
      (error) => {
        console.log('Error liking the post', error);
      }
    );
  }

  unlikePost(post: any) {
    this.postService.unlikePost(post.id).subscribe(
      (data) => {
        post.likes--;
        post.liked = false;
      },
      (error) => {
        console.log('Error unliking the post', error);
      }
    );
  }
}
