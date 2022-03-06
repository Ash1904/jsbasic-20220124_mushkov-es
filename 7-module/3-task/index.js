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
    this.elem.addEventListener('click', (event) => {
    const width = this.elem.offsetWidth
    let shiftX = event.clientX - this.elem.getBoundingClientRect().left;
    const value = Math.round(this.data.steps * shiftX/width)
    console.log(value)
    
    this.changeValue(value)
    const sliderChange = new CustomEvent('slider-change', {
      detail: value, 
      bubbles: true 
    })
    this.elem.dispatchEvent(sliderChange)
    })
  } 

  changeValue(value) {
    this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active')
    this.elem.querySelectorAll('span')[value].classList.add('slider__step-active')
    this.elem.querySelector('.slider__thumb').style.left = `${value / (this.data.steps - 1) *100}%`
    this.elem.querySelector('.slider__value').innerHTML = value;
    this.elem.querySelector('.slider__progress').style.width = `${value / (this.data.steps - 1) *100}%`
  }

}
