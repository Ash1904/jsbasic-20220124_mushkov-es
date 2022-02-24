import createElement from "../../assets/lib/create-element.js";

export default class Carousel {
  constructor(slides) {
    this.slide = slides;
   
    const html = this.createSlides();// Чтобы определить то что слева надо точно определить то что справа.
    this.elem = createElement(`<div class="carousel">
    <!--Кнопки переключения-->
    <div class="carousel__arrow carousel__arrow_right">
      <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
    </div>
    <div class="carousel__arrow carousel__arrow_left">
      <img src="../../assets/images/icons/angle-left-icon.svg" alt="icon">
    </div>

    <div class="carousel__inner">
      <!--Верстка 1-ого слайда-->
    ${html}
    </div>
  </div>

</div>`)
    this.data = slides
    this.onClick()
    console.log(this.elem.querySelector('.carousel__arrow_left'))
    this.initCarousel()
  }


  createSlides() {
    return this.slide
      .map(slide => {
        const html = `<div class="carousel__slide" data-id="penang-shrimp">
    <img src="../../assets/images/carousel/${slide.image
          }" class="carousel__img" alt="slide">
    <div class="carousel__caption">
      <span class="carousel__price">€${slide.price.toFixed(2)}</span>
      <div class="carousel__title">Penang shrimp</div>
      <button type="button" class="carousel__button">
        <img src="../../assets/images/icons/plus-icon.svg" alt="icon">
      </button>
    </div>
  </div>`;
        return html;
      })
      .join("");
  }
   initCarousel() {
    const arrowRight = this.elem.querySelector('.carousel__arrow_right');
    const arrowLeft = this.elem.querySelector('.carousel__arrow_left');
    
    const carouse1Inner = this.elem.querySelector('.carousel__inner');
    arrowLeft.style.display = 'none'
    let counter = 0;
    arrowRight.addEventListener('click', () => {
      counter++
      console.log(counter, counter*988)
      carouse1Inner.style.transform = `translateX(${counter*(-988)}px)`
      if (counter > 0) arrowLeft.style.display = 'block'
      if (counter === this.slide.length - 1) {
        arrowLeft.style.display = 'block'
        arrowRight.style.display = 'none'
      }
      
      
    })
    arrowLeft.addEventListener('click', () => {
      counter--
      carouse1Inner.style.transform = `translateX(${counter*(-988)}px)`
      if (counter < this.slide.length) arrowRight.style.display = 'block'
      if (counter === 0) {
        arrowLeft.style.display = 'none'
        arrowRight.style.display = 'block'
      }
    })
  }
  
  onClick() {
    const btn = this.elem.querySelectorAll('.carousel__button');
    btn.forEach((button, index) => {
      button.addEventListener('click', (event) => this.createEvent(event,index))

    })
  }
  createEvent = (event,index) => {
    const target = event.target.closest('img')
    if (target) {
        console.log(this.data)
        const productAdd = new CustomEvent('product-add', {
            detail:this.data[index].id,
            bubbles:true
            
        });
        this.elem.dispatchEvent(productAdd);
    }

}
}
