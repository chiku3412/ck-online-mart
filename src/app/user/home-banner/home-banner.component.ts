import { Component, ElementRef, HostListener, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';

@Component({
    selector: 'app-home-banner',
    standalone: true,
    imports: [],
    templateUrl: './home-banner.component.html'
})
export class HomeBannerComponent implements OnInit, OnDestroy {
    @ViewChildren('slide') slides!: QueryList<ElementRef>;
    @ViewChild('progressCircle') progressCircle!: ElementRef;
    @ViewChild('container') container!: ElementRef;
    @ViewChild('playPauseBtn') playPauseBtn!: ElementRef;

    currentSlide = 0;
    totalSlides = 0;

    autoplayInterval: any;
    isPlaying = true;

    touchStartX = 0;
    touchEndX = 0;

    ngOnInit(): void {
        setTimeout(() => {
            this.totalSlides = this.slides.length;
            this.updateSlides();
            this.startAutoplay();
        });
    }

    ngOnDestroy(): void {
        this.stopAutoplay();
    }

    updateSlides(): void {
        this.slides.forEach((slide, index) => {
            slide.nativeElement.classList.remove('active', 'prev', 'next');

            if (index === this.currentSlide) {
                slide.nativeElement.classList.add('active');
            } else if (
                index ===
                (this.currentSlide - 1 + this.totalSlides) % this.totalSlides
            ) {
                slide.nativeElement.classList.add('prev');
            } else if (
                index === (this.currentSlide + 1) % this.totalSlides
            ) {
                slide.nativeElement.classList.add('next');
            }
        });

        this.resetProgress();
    }

    nextSlide(): void {
        this.currentSlide =
            (this.currentSlide + 1) % this.totalSlides;

        this.updateSlides();
    }

    prevSlide(): void {
        this.currentSlide =
            (this.currentSlide - 1 + this.totalSlides) %
            this.totalSlides;

        this.updateSlides();
    }

    goToSlide(index: number): void {
        this.currentSlide = index;
        this.updateSlides();
    }

    resetProgress(): void {
        const circle =
            this.progressCircle.nativeElement;

        circle.style.strokeDashoffset = '126';
        void circle.offsetWidth;

        if (this.isPlaying) {
            circle.style.animation = 'none';

            setTimeout(() => {
                circle.style.animation =
                    'progressAnim 5s linear forwards';
            }, 50);
        }
    }

    toggleAutoplay(): void {
        this.isPlaying = !this.isPlaying;

        if (this.isPlaying) {
            this.startAutoplay();
        } else {
            this.stopAutoplay();
        }
    }

    startAutoplay(): void {
        this.stopAutoplay();

        this.autoplayInterval = setInterval(() => {
            this.nextSlide();
        }, 5000);

        this.resetProgress();
    }

    stopAutoplay(): void {
        clearInterval(this.autoplayInterval);

        if (this.progressCircle) {
            this.progressCircle.nativeElement.style.animationPlayState =
                'paused';
        }
    }

    onTouchStart(event: TouchEvent): void {
        this.touchStartX =
            event.changedTouches[0].screenX;

        this.stopAutoplay();
    }

    onTouchEnd(event: TouchEvent): void {
        this.touchEndX =
            event.changedTouches[0].screenX;

        this.handleSwipe();

        if (this.isPlaying) {
            this.startAutoplay();
        }
    }

    handleSwipe(): void {
        const diff = this.touchStartX - this.touchEndX;

        if (Math.abs(diff) > 50) {
            diff > 0 ? this.nextSlide() : this.prevSlide();
        }
    }

    @HostListener('document:keydown', ['$event'])
    handleKeyboard(event: KeyboardEvent): void {
        if (event.key === 'ArrowRight') {
            this.nextSlide();
        }

        if (event.key === 'ArrowLeft') {
            this.prevSlide();
        }
    }

    onMouseMove(event: MouseEvent): void {
        const { clientX, clientY } = event;
        const { innerWidth, innerHeight } = window;

        const xPos =
            (clientX / innerWidth - 0.5) * 20;

        const yPos =
            (clientY / innerHeight - 0.5) * 20;

        this.slides.forEach((slide) => {
            if (
                slide.nativeElement.classList.contains(
                    'active'
                )
            ) {
                const img =
                    slide.nativeElement.querySelector(
                        '.slide-image'
                    );

                if (img) {
                    img.style.transform = `scale(1.05) translate(${xPos}px, ${yPos}px)`;
                }
            }
        });
    }
}
