import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog, BlogService } from 'src/assets/services/blogs.service';

@Component({
    selector: 'app-add-blog',
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, MatSelectModule, ReactiveFormsModule, FormsModule],
    templateUrl: './add-blog.component.html'
})
export class AddBlogComponent implements OnInit {
    isEditMode = false;
    blogForm: FormGroup;
    blog: Blog[] = [];
    blogId = '';
    title: string = '';
    blockQuote: string = '';
    otherTitle: string = '';
    category: string = '';
    featuredImage: File | null = null;
    imagePreview: string | null = null;

    constructor(
        private fb: FormBuilder,
        private blogService: BlogService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        this.blogForm = this.fb.group({
            title: ['', Validators.required],
            author: ['', Validators.required],
            readingTime: ['', Validators.required],
            content: ['', Validators.required],
            shortDescription: ['', Validators.required],
            contentOne: ['', Validators.required],
            category: ['', Validators.required],
            otherTitle: ['', Validators.required],
            blockQuote: ['', Validators.required]
        });
    }

    onImageSelect(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.featuredImage = input.files[0];
            const reader = new FileReader();
            reader.onload = () => {
                this.imagePreview = reader.result as string;
            };
            reader.readAsDataURL(this.featuredImage);
        }
    }

    publishBlog(): void {
        if (this.blogForm.invalid) {
            this.blogForm.markAllAsTouched();
            return;
        }
        const formData = new FormData();
        formData.append('title', this.blogForm.get('title')?.value);
        formData.append('author', this.blogForm.get('author')?.value);
        formData.append('readingTime', this.blogForm.get('readingTime')?.value);
        formData.append('content', this.blogForm.get('content')?.value);
        formData.append('contentOne', this.blogForm.get('contentOne')?.value);
        formData.append('shortDescription', this.blogForm.get('shortDescription')?.value);
        formData.append('category', this.blogForm.get('category')?.value);
        formData.append('otherTitle', this.blogForm.get('otherTitle')?.value);
        formData.append('blockQuote', this.blogForm.get('blockQuote')?.value);
        if (this.featuredImage) {
            formData.append(
                'featuredImage',
                this.featuredImage
            );
        }
        if (this.isEditMode) {
            this.blogService
            .updateBlog(this.blogId, formData)
            .subscribe({
                next: (res) => {
                    alert('Blog Updated Successfully');
                    this.router.navigate(['/admin/blog-list']);
                },
                error: (err) => {
                    console.error('Error updating blog', err);
                }
            });
        } else {
            this.blogService
            .addBlog(formData)
            .subscribe({
                next: (res) => {
                    alert('Blog Added Successfully');
                    this.blogForm.reset();
                    this.featuredImage = null;
                    this.imagePreview = null;
                    Object.keys(this.blogForm.controls).forEach(key => {
                        this.blogForm.get(key)?.setErrors(null);
                        this.blogForm.get(key)?.markAsPristine();
                        this.blogForm.get(key)?.markAsUntouched();
                    });
                },
                error: (err) => {
                    console.error('Error adding blog', err);
                }
            });
        }
    }

    // Load Blogs
    loadBlog() {
        this.blogService.getBlogs().subscribe({
            next: (res) => {
                this.blog = res;
                if (this.isEditMode) {
                    const blog = this.blog.find(item => item.id === this.blogId);
                    if (blog) {
                        this.blogForm.patchValue({
                            title: blog.title,
                            author: blog.author,
                            readingTime: blog.readingTime,
                            content: blog.content,
                            contentOne: blog.contentOne,
                            shortDescription: blog.shortDescription,
                            category: blog.category,
                            otherTitle: blog.otherTitle,
                            blockQuote: blog.blockQuote
                        });
                        this.imagePreview = blog.featuredImage;
                    }
                }
            },
            error: (err) => {
                console.log(err);
            }
        });
    }

    // Generate Blog By ID
    generateBlogId(): string {
        if (this.blog.length === 0) {
            return '#BLOG101';
        }
        const maxId = Math.max(
            ...this.blog.map(blog =>
                Number(blog.id.replace('#BLOG', ''))
            )
        );
        return `#BLOG${maxId + 1}`;
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            this.isEditMode = !!id;
            this.blogId = id || '';
            this.loadBlog();
        });
    }
}
