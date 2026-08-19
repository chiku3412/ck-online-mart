import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Blog, BlogService } from 'src/assets/services/blogs.service';

@Component({
    selector: 'app-blog-list',
    standalone: true,
    imports: [
        CommonModule,
        RouterModule,
        MatTableModule,
        MatButtonModule,
        MatIconModule
    ],
    templateUrl: './blog-list.component.html'
})
export class BlogListComponent implements OnInit {
    blogs: Blog[] = [];
    displayedColumns: string[] = [
        'id',
        'titleImage',
        'category',
        'author',
        'blockQuote',
        'otherTitle',
        'shortDescription',
        'contentOne',
        'content',
        'featureImage',
        'action'
    ];

    constructor(
        private blogService: BlogService
    ) { }
    
    ngOnInit(): void {
        this.loadBlogs();
    }

    loadBlogs(): void {
        this.blogService.getBlogs().subscribe({
            next: (res) => {
                this.blogs = res;
            },
            error: (err) => console.error(err)
        });
    }

    deleteBlog(blog: Blog): void {
        const confirmed = confirm(`Delete Blog "${blog.title}"?`);
        if (!confirmed) {
            return;
        }
        this.blogService.deleteBlog(blog.id).subscribe({
            next: () => {
                this.blogs = this.blogs.filter(item => item.id !== blog.id);
            },
            error: (err) => console.error(err)
        });
    }
}