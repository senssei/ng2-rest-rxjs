import { Component, OnInit } from '@angular/core';
import { DataService } from './sample/data.service';
import { Observable } from 'rxjs/Observable';
import { Post } from './sample/post';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DataService]
})
export class AppComponent implements OnInit {
  posts: Post[];
  post: Post;


  constructor(private dataService: DataService) { }

  ngOnInit(): void {
    this.getPosts();
    this.post = new Post;
  }

  getPosts() {
    this.dataService.getData().subscribe(posts => this.posts = posts);
  }

  onSubmit() {
    //get after sumbit, fire and forget,
    //alternatives are this.posts.push();

    this.dataService.addPost(this.post).subscribe(() => { this.getPosts(); });
  }

}
