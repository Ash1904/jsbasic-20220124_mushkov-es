function initCarousel() {
  const arrowRight = document.querySelector('.carousel__arrow_right');
  const arrowLeft = document.querySelector('.carousel__arrow_left');
  arrowLeft.style.display = 'none';
  const carouse1Inner = document.querySelector('.carousel__inner');
  let counter = 1;
  arrowRight.addEventListener('click', () => {
    counter++;
    switch (counter) {
      case 2: 
        carouse1Inner.style.transform = 'translateX(-988px)';
      break;
      case 3:
        carouse1Inner.style.transform = 'translateX(-988px)'
      break;
      case 4:
        carouse1Inner.style.transform = 'translateX(-1500px)';
        arrowRight.style.display = 'none'
        arrowLeft.style.display = '';
      break;
    }
  })

  arrowLeft.addEventListener('click', () => {
    
    counter--;
    console.log(counter)
    switch (counter) {
      case 3:
        carouse1Inner.style.transform = 'translateX(-1000px)';
        break;
      case 2:
        carouse1Inner.style.transform = 'translateX(-500px)';
      break;
      case 1:
        carouse1Inner.style.transform = 'translateX(0)';
        arrowLeft.style.display = 'none';
        arrowRight.style.display = '';
        break;
    }
  })
}
