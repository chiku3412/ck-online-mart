import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import Swiper, { Navigation } from 'swiper';

Swiper.use([Navigation]);

@Component({
    selector: 'app-product-category',
    standalone: true,
    imports: [],
    templateUrl: './product-category.component.html'
})
export class ProductCategoryComponent implements AfterViewInit, OnDestroy {

    @ViewChild('swiperRef') swiperRef!: ElementRef;
    @ViewChild('prevButton') prevButton!: ElementRef<HTMLButtonElement>;
    @ViewChild('nextButton') nextButton!: ElementRef<HTMLButtonElement>;

    private swiper?: Swiper;

    categories = [
        { name: 'Headphones', items: 80, image: './../../assets/images/category/cat-15.png' },
        { name: 'Watch', items: 80, image: './../../assets/images/category/04.png' },
        { name: 'Shoes', items: 80, image: './../../assets/images/category/05.png' },
        { name: 'Mobiles', items: 80, image: './../../assets/images/category/06.png' },
        { name: 'Food', items: 80, image: './../../assets/images/category/cat-15.png' },
        { name: 'Snacks', items: 80, image: './../../assets/images/category/cat-3.png' },
        { name: 'Coffee & Tea', items: 80, image: './../../assets/images/category/cat-14.png' },
        { name: 'Cold Drinks', items: 80, image: './../../assets/images/category/07.png' },
        { name: 'Chocolates', items: 80, image: './../../assets/images/category/08.png' },
        { name: 'Books', items: 80, image: './../../assets/images/category/01.png' },
        { name: 'Toys', items: 80, image: './../../assets/images/category/02.png' },
        { name: 'Goggles', items: 80, image: './../../assets/images/category/03.png' },
    ]

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.swiper = new Swiper(this.swiperRef.nativeElement, {
                spaceBetween: 30,
                loop: false,
                slidesPerView: 1,
                navigation: {
                    nextEl: this.nextButton.nativeElement,
                    prevEl: this.prevButton.nativeElement,
                },
                breakpoints: {
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 8,
                    },
                    1400: {
                        slidesPerView: 10,
                    },
                },
            });
        }, 100);
    }

    ngOnDestroy(): void {
        this.swiper?.destroy();
    }
}
