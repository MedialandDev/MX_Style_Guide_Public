const tabList = document.querySelectorAll('.tab');
tabList.forEach((item) => {
  item.addEventListener('click', (e) => {
    const currentValue = e.target.dataset.value;
    document.querySelectorAll('.list-card').forEach((ele) => {
      ele.classList.add('hidden');
    });
    document.querySelectorAll('.tab').forEach((ele) => {
      ele.classList.remove('is-active');
    });
    if(currentValue === 'all') {
      document.querySelectorAll('.list-card').forEach((ele) => {
        ele.classList.remove('hidden');
      });
    }
    else {
      document.querySelectorAll(`.list-card[data-value="${currentValue}"`).forEach((ele) => {
        ele.classList.remove('hidden');
      });
    }
    item.classList.add('is-active');
  });
});