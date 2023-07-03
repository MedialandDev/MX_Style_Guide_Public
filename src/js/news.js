const tabList = document.querySelectorAll('.tab');
tabList.forEach((item) => {
  item.addEventListener('click', (e) => {
    const currentValue = e.target.dataset.value;
    document.querySelectorAll('.listcard').forEach((ele) => {
      ele.classList.add('hidden');
    });
    document.querySelectorAll('.tab').forEach((ele) => {
      ele.classList.remove('is-active');
    });
    if(currentValue === 'all') {
      document.querySelectorAll('.listcard').forEach((ele) => {
        ele.classList.remove('hidden');
      });
    }
    else {
      document.querySelectorAll(`.listcard[data-value="${currentValue}"`).forEach((ele) => {
        ele.classList.remove('hidden');
      });
    }
    item.classList.add('is-active');
  });
});