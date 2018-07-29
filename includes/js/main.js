window.onload = () => {
  const main = {
    init() {
      this.getImages();
      this.prevSlide();
      this.nextSlide();
    },
    slidesNumber: document.getElementsByClassName('header__slide').length,
    slides: document.getElementsByClassName('header__slide'),
    images: [],
    apiSource: 'https://picsum.photos/1000/400/?random',
    arrowLeft: document.querySelector('.fa-arrow-circle-left'),
    arrowRight: document.querySelector('.fa-arrow-circle-right'),
    getImages(url) {
      let offset = 0;
      for (let i = 0; i < this.slidesNumber; i++) {
        fetch(this.apiSource)
        .then((response) => {
          this.images.push({mainInfo: response, offset: offset});
          offset -= 100;
          if (this.images.length === this.slidesNumber) {
            this.setBackground();
          }
        });
      }
    },
    setBackground() {
      this.images.forEach((item, i) => {
        this.slides[i].style.left = `${this.images[i].offset}%`;
        this.slides[i].style.backgroundImage = 'url(' + item.mainInfo.url + ')';
      })
    },
    prevSlide() {
      this.arrowLeft.addEventListener('click', () => {
        // disable prev button when the first slide image is about to apper
        if (this.slides[0].style.left === "100%") {
          // the last slider's movement
          for (let j = 0; j < this.slidesNumber; j++) {
            this.images[j].offset -= 100;
            this.slides[j].style.left = `${this.images[j].offset}%`;
          }
          this.arrowLeft.classList.add('fas-disable');
          return;
        }
        // remove disable state from the opposite button
        // if we move in the opposite direction
        for (let i = 0; i < this.slidesNumber; i++) {
          if (this.arrowRight.classList.contains('fas-disable')) {
            this.arrowRight.classList.remove('fas-disable');
          }
          this.images[i].offset -= 100;
          this.slides[i].style.left = `${this.images[i].offset}%`;
        }
        // prevent multiple function calling if
        // user clicks more than two times per one second
        this.arrowLeft.classList.add('fas-disable-for-second');
        setTimeout(() => {
          this.arrowLeft.classList.remove('fas-disable-for-second');
        }, 500);
      });
    },
    nextSlide() {
      this.arrowRight.addEventListener('click', () => {
        // disable next button when the last slide image is about to apper
        if (this.slides[this.slides.length - 1].style.left === "-100%") {
          // last slider's movement
          for (let j = 0; j < this.slidesNumber; j++) {
            this.images[j].offset += 100;
            this.slides[j].style.left = `${this.images[j].offset}%`;
          }
          this.arrowRight.classList.add('fas-disable');
          return;
        }
        // remove disable state from the opposite button
        // if we move in the opposite direction
        for (let i = 0; i < this.slidesNumber; i++) {
          if (this.arrowLeft.classList.contains('fas-disable')) {
            this.arrowLeft.classList.remove('fas-disable');
          }
          this.images[i].offset += 100;
          this.slides[i].style.left = `${this.images[i].offset}%`;
        }
        // prevent multiple function calling if
        // user clicks more than two times per one second
        this.arrowRight.classList.add('fas-disable-for-second');
        setTimeout(() => {
          this.arrowRight.classList.remove('fas-disable-for-second');
        }, 500);
      });
    }
  }
  main.init();
}
