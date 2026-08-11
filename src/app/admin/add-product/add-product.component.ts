import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Product, ProductService } from 'src/assets/services/product-service';

@Component({
    selector: 'app-add-product',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule
    ],
    templateUrl: './add-product.component.html'
})
export class AddProductComponent implements OnInit {
    productForm: FormGroup;
    mainImage: File | null = null;
    mainImagePreview = '';
    galleryImages: File[] = [];
    galleryImagePreviews: string[] = [];
    isEditMode = false;
    productId = '';
    existingProduct: Product | null = null;
    private readonly serverUrl = 'http://localhost:5000';
    constructor(
        private fb: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private productService: ProductService
    ) {
        this.productForm = this.fb.group({
            name: ['', Validators.required],
            category: ['', Validators.required],
            description: ['', Validators.required],
            oldPrice: ['', Validators.required],
            price: ['', Validators.required],
            stock: ['', Validators.required]
        });
    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            const id = params.get('id');
            // Add Product
            if (!id) {
                this.isEditMode = false;
                return;
            }
            // Edit Product
            this.isEditMode = true;
            this.productId = id;
            this.loadProduct();
        });
    }

    // =====================================
    // LOAD PRODUCT
    // =====================================

    loadProduct(): void {
    this.productService
        .getProductById(this.productId)
        .subscribe({
            next: (product) => {
                this.existingProduct = product;
                this.mainImagePreview = this.getImageUrl(product.image);
                this.galleryImagePreviews = (product.images || []).map(
                    image => this.getImageUrl(image)
                );
                this.productForm.patchValue({
                    name: product.name,
                    category: product.category,
                    description: product.description,
                    oldPrice: product.oldPrice,
                    price: product.price,
                    stock: product.stock
                });
            },

            error: (err) => {
                console.error('Get Product Error:', err);
            }
        });
    }

    // =====================================
    // MAIN IMAGE
    // =====================================

    onMainImage(event: Event): void {
        const input = event.target as HTMLInputElement;
        if ( input.files && input.files.length > 0 ) {
            this.mainImage = input.files[0];
            this.mainImagePreview = URL.createObjectURL(this.mainImage);
        }
    }

    // =====================================
    // GALLERY IMAGES
    // =====================================

    onGalleryImages(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files) {
            this.galleryImages = Array.from(input.files);
            this.galleryImagePreviews = this.galleryImages.map(
                image => URL.createObjectURL(image)
            );
        }
    }

    getImageUrl(image: string): string {
        if (!image) {
            return '';
        }
        if (
            image.startsWith('http') ||
            image.startsWith('blob:') ||
            image.startsWith('data:')
        ) {
            return image;
        }
        return `${this.serverUrl}${image}`;
    }

    // =====================================
    // SUBMIT
    // =====================================

    onSubmit(): void {
        console.log("Click")
        if (this.productForm.invalid) {
            this.productForm.markAllAsTouched();
            return;
        }
        const value = this.productForm.value;
        const formData = new FormData();
        formData.append('name', value.name);
        formData.append('category', value.category);
        formData.append('description', value.description);
        formData.append('oldPrice', value.oldPrice);
        formData.append('price', value.price);
        formData.append('stock', value.stock);
        // Main image
        if (this.mainImage) {
            formData.append('image', this.mainImage);
        }

        // Gallery images
        this.galleryImages.forEach(
            image => { formData.append('images', image); }
        );

        if (this.isEditMode) {
            this.productService
                .updateProduct(this.productId, formData)
                .subscribe({
                    next: () => {
                        alert('Product Updated Successfully');
                        this.router.navigate(['/admin/products']);
                    },
                    error: (err) => {
                        console.error('Update Product Error:', err);
                    }
                });

            return;
        }

        this.productService
            .addProducts(formData)
            .subscribe({
                next: () => {
                    alert('Product Added Successfully');
                    this.router.navigate(['/admin/products']);
                },
                error: (err) => {
                    console.error('Add Product Error:', err);
                }
            });
    }
}
