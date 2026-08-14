import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { BlogService } from 'src/assets/services/blogs.service';

@Component({
    selector: 'app-blogs',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatSelectModule, CommonModule, RouterModule],
    templateUrl: './blogs.component.html'
})
export class BlogsComponent implements OnInit {
    blogs: any[] = [];

    constructor(
        private blogService: BlogService
    ) {}

    loadBlogs() {
        this.blogService.getBlogs().subscribe({
            next: (res) => {
                this.blogs = res;
            },
            error: (err) => console.error(err)
        });
    }

    ngOnInit(): void {
        this.loadBlogs();
    }
}
