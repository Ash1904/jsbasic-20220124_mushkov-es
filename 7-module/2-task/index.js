import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
  

  this.elem = createElement(`<div class="container">
  <!--Корневой элемент Modal-->
  <div class="modal">
    <!--Прозрачная подложка перекрывающая интерфейс-->
    <div class="modal__overlay"></div>

    <div class="modal__inner">
      <div class="modal__header">
        <!--Кнопка закрытия модального окна-->
        <button type="button" class="modal__close">
          <img src="../../assets/images/icons/cross-icon.svg" alt="close-icon" />
        </button>

        <h3 class="modal__title">
        Cюда нужно добавлять заголовок окна
        </h3>
      </div>

      <div class="modal__body">
        A сюда нужно добавлять содержимое тела модального окна
      </div>
    </div>

  </div>`)
  this.closeModalWindow()
  
  }
  open() {
    const body = document.querySelector('body');
    body.classList.add('is-modal-open')
    body.append(this.elem)
  }
  
  setTitle(title) {
    this.elem.querySelector('.modal__title').textContent = title// textContent стирает старый текст
  }


  setBody(div) {
    const modalBody = this.elem.querySelector('.modal__body');
    modalBody.innerHTML = div;
  }

  close() {
    document.querySelector('body').classList.remove('is-modal-open')
    this.elem.remove()
  }

  closeModalWindow() {
    const btn = this.elem.querySelector('.modal__close');
    btn.addEventListener('click', () => {
    this.elem.remove()
    })
    document.addEventListener('keydown', event => {
      if (event.code === 'Escape') {
        this.elem.remove()
      }
    })
  }
  
}
