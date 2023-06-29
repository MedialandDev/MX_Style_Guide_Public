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
        // e.target.classList.toggle('border-s2-400', ruleList.every(({ rule }) => rule(e.target.value)))
      })
    })
  })
}
