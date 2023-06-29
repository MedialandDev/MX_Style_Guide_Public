import '@/css/tailwind.css'
import '@/css/component.styl'
import '@/css/main.styl'

console.log('main')


//header漢堡選單 
const hamburger = document.querySelector('.hamburger');
hamburger.addEventListener('click', function() {
  // this.classList.toggle('is-open');
  this.querySelector('i:nth-child(1)').classList.toggle('translate-y-1');
  this.querySelector('i:nth-child(2)').classList.toggle('-translate-y-1');
  this.querySelector('.menu-wrap').classList.toggle('left-full');
})