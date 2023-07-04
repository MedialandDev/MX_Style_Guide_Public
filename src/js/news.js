const tabList = document.querySelectorAll('.tab');
tabList.forEach((item) => {
  item.addEventListener('click', (e) => {
    document.querySelectorAll('.tab').forEach((el) => {
    el.classList.remove('is-active');
    });  

  item.classList.add('is-active');
  const currentValue = e.target.dataset.value;
  if(currentValue === 'all') {
    document.querySelectorAll('.list-card').forEach((el) => {
      el.classList.remove('hidden');
    });
    return
  }
  //Note 待修
  document.querySelectorAll('.list-card').forEach((el) => {
    el.classList.add('hidden');
  });
  document.querySelectorAll(`.list-card[data-value="${currentValue}"]`).forEach((el) => {
    el.classList.toggle('hidden');
  });
});
});