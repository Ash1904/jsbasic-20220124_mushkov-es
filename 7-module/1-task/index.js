import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {// Почему все не писать в constructor
    this.categories = categories;
    this.link = this.createLink();
    this.elem = createElement(`<!--Корневой элемент RibbonMenu-->
    <div class="ribbon">
      <!--Кнопка прокрутки влево-->
      <button class="ribbon__arrow ribbon__arrow_left">
        <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
      </button>
      <nav class="ribbon__inner">
      ${this.link}
      </nav>
      <!--Кнопка прокрутки вправо-->
      <button class="ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
        <img src="../../assets/images/icons/angle-icon.svg" alt="icon">
      </button>
    </div>`)
    this.scroll()//Что было бы если this.scroll = this.scroll()
    this.onClick()
  }

  createLink() {
  return  this.categories.map(category =>  
    `
    <a href="#" class="ribbon__item" data-id=${category.id}>${category.name}</a>
    `
    ).join('')

  }

  
  scroll() {
    
    const arrowRight = this.elem.querySelector('.ribbon__arrow_right');
    const arrowLeft = this.elem.querySelector('.ribbon__arrow_left');
    const ribbonInner = this.elem.querySelector('.ribbon__inner');
   
    arrowRight.addEventListener('click', () => {
      arrowLeft.classList.add('ribbon__arrow_visible')
      ribbonInner.scrollBy(350 ,0);
    })

    arrowLeft.addEventListener('click', () => {
      arrowRight.classList.add('ribbon__arrow_visible')
      ribbonInner.scrollBy(-350 ,0);
    })
    ribbonInner.addEventListener('scroll', () => {
      let scrollWidth = ribbonInner.scrollWidth;
      let scrollLeft = ribbonInner.scrollLeft;
      let clientWidth = ribbonInner.clientWidth;
      let scrollRight = scrollWidth - scrollLeft - clientWidth
      if (scrollLeft === 0) {
        arrowLeft.classList.remove('ribbon__arrow_visible');
      }
      if (scrollRight === 0) {
        arrowRight.classList.remove('ribbon__arrow_visible');
      }
    })
    document.body.addEventListener('click', event => {
      if (event.target.tagName == 'A') {
        event.preventDefault();
        this.elem.querySelector('.ribbon__item_active').classList.remove('ribbon__item_active')
        event.target.classList.add('ribbon__item_active')
      }
    })
  }
  onClick() {
    const link = this.elem.querySelectorAll('.ribbon__item');
    link.forEach((element, index) => {
      element.addEventListener('click', event => this.createEvent(index))
    }) 
  }
  createEvent = (index) => {
    
    const categories = new CustomEvent('ribbon-select', { 
        detail: this.categories[index].id, 
        bubbles: true 
      })
      this.elem.dispatchEvent(categories)
    
  }
  
}
