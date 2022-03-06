import createElement from '../../assets/lib/create-element.js';// сам импортировал
export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.data = {steps, value}
    this.span = this.createSpan()
    this.elem = createElement(`<!--Корневой элемент слайдера-->
    <div class="slider">
  
      <!--Ползунок слайдера с активным значением-->
      <div class="slider__thumb" style="left: ${this.data.value / (this.data.steps - 1) *100}%;">
        <span class="slider__value">${this.data.value}</span>
      </div>
  
      <!--Заполненная часть слайдера-->
      <div class="slider__progress" style="width: ${this.data.value / (this.data.steps - 1) *100}%;"></div>
  
      <!--Шаги слайдера-->
      <div class="slider__steps">
      ${this.span}
      </div>
    </div>`
    )
    this.createEvent()
  }
  createSpan() {
    let span = ''
    for (let i = 0; i < this.data.steps; i++) {// через map
      if (i === this.data.value) {
        span += '<span class="slider__step-active"></span>'
      }
      else {
        span += '<span></span>'
      }

    }
    return span;
  }
  createEvent() {
    let progress = this.elem.querySelector('.slider__progress');
    let sliderValue = this.elem.querySelector('.slider__value');
    let thumb = this.elem.querySelector('.slider__thumb');
    thumb.ondragstart = () => false;
    thumb.addEventListener('pointerdown', () => {
      
      const moveAt = (left, width, value) => {
        thumb.style.left = left;
        progress.style.width = width;
        sliderValue.innerHTML = value;
        this.elem.classList.add('slider_dragging')
      }
      let value = 0
      const onMouseMove = (event) => {
        let left = event.clientX - this.elem.getBoundingClientRect().left;//this свой контекст у функции
        let leftRelative = left / this.elem.offsetWidth;
        let leftPercents = leftRelative * 100;
        let segments = this.data.steps - 1;
        let approximateValue = leftRelative * segments;
        value = Math.round(approximateValue);
        moveAt(`${(value / (this.data.steps -1) * this.elem.offsetWidth)}px`, `${(value / (this.data.steps -1) * this.elem.offsetWidth)}px`, value)
        this.changeValue(value)
      }
      document.addEventListener('pointermove', onMouseMove)
      

      document.body.onpointerup = () => {
        document.removeEventListener('pointermove', onMouseMove)
        document.body.onpointerup = null;
        this.elem.classList.remove('slider_dragging')
        const sliderChange = new CustomEvent('slider-change', {
          detail: value, 
          bubbles: true 
        })
        this.elem.dispatchEvent(sliderChange)
      }
    }) 
  } 

  changeValue(value) {
    this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active')
    this.elem.querySelectorAll('span')[value].classList.add('slider__step-active')
    // this.elem.querySelector('.slider__thumb').style.left = `${value / (this.data.steps - 1) *100}%`
    // this.elem.querySelector('.slider__value').innerHTML = value;
    // this.elem.querySelector('.slider__progress').style.width = `${value / (this.data.steps - 1) *100}%`
  }

}
