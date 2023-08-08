import { multSwiperImage } from "./common";
// 複製按鈕
const copyButtons = document.querySelectorAll('.copy-button');
copyButtons.forEach(function(el) {
  el.addEventListener('click', function() {
    let link = this.getAttribute('data-link');
    // 輸入框
    let tempInput = document.createElement('input');
    tempInput.style.position = 'absolute';
    tempInput.style.left = '-9999px';
    tempInput.value = link;
    document.body.appendChild(tempInput);
    tempInput.select();
    tempInput.setSelectionRange(0, link.length);
    document.execCommand('copy');
    document.body.removeChild(tempInput);
    alert(`你已經複製 ${link}`);
  });
});
// if(import.meta.env.DEV) {
  multSwiperImage();
// }