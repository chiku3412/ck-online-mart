import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BlogService } from 'src/assets/services/blogs.service';

@Component({
    selector: 'app-blog-details',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './blog-details.component.html'
})
export class BlogDetailsComponent implements OnInit {

    blogDetails: any = null;
    blogId = '';

    constructor(
        private blogService: BlogService,
        private route: ActivatedRoute
    ) {}

    loadBlog() {
        this.blogService.getBlogs().subscribe({
            next: (res) => {
                this.blogDetails = res.find(
                    (blog: any) => blog.id === this.blogId
                );

                console.log('Blog Details:', this.blogDetails);
            },
            error: (err) => console.error(err)
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.blogId = params.get('id') || '';
            this.loadBlog();
        });
    }
}