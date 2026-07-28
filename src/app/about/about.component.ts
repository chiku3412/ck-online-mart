import { Component, ElementRef, ViewChild } from '@angular/core';
import Swiper, { EffectCoverflow, Pagination } from 'swiper';

Swiper.use([EffectCoverflow, Pagination]);

@Component({
    selector: 'app-about',
    standalone: true,
    templateUrl: './about.component.html'
})
export class AboutComponent {
    @ViewChild('swiperRef') swiperRef!: ElementRef;

    testimonials = [
        { 
            name: 'Alex Star',
            feedback: 'CK Online Store has completely transformed my shopping experience. The quality of their products is outstanding.',
            avatar: './../../assets/images/client-img1.png'
        },
        { 
            name: 'Alex Star',
            feedback: 'CK Online Store has completely transformed my shopping experience. The quality of their products is outstanding.',
            avatar: './../../assets/images/client-img2.png'
        },
        { 
            name: 'Alex Star',
            feedback: 'CK Online Store has completely transformed my shopping experience. The quality of their products is outstanding.',
            avatar: './../../assets/images/avatar.jpg'
        },
    ]

    ngAfterViewInit(): void {
        setTimeout(() => {
            new Swiper(this.swiperRef.nativeElement, {
                effect: 'coverflow',
                grabCursor: true,
                centeredSlides: true,
                slidesPerView: 4,
                spaceBetween: 30,
                loop: true,

                coverflowEffect: {
                    rotate: 50,
                    stretch: 0,
                    depth: 100,
                    modifier: 1,
                    slideShadows: true,
                },

                breakpoints: {
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                },
            });
        }, 100);
    }
    
}
