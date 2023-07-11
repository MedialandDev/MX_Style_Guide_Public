export const formComponentValid = (validateList) => {
  validateList.forEach(({ selector, ruleList }) => {
    const messageList = document.querySelectorAll(`${selector} .valid-message-box span`)
    const formInput = document.querySelector(`${selector} input`)

    messageList.forEach((item, index) => item.innerText = ruleList[index].text )

    const eventList = ['blur', 'input']
    eventList.forEach((item, index) => {
      formInput.addEventListener(item, (e) => {
        ruleList.forEach(({ rule }, index) => {
          messageList[index].classList.toggle('text-s2-400', rule(e.target.value))
        })
        e.target.classList.toggle('error', ruleList.some(({ rule }) => !rule(e.target.value)))
      })
    })
  })
}
export const paginationOption = {
  el: '.swiper-pagination',
  clickable: true,
};
export const navigationOption = (extrabtn = '') => ({
  nextEl: `.swiper-button-next${extrabtn}`,
  prevEl: `.swiper-button-prev${extrabtn}`,
});

