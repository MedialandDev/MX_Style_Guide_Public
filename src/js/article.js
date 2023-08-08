// 分頁選擇器
const pagingFirst = document.querySelector('.page-first') || [];
const pagingPrev = document.querySelector('.page-prev') || [];
const pagingNext = document.querySelector('.page-next') || [];
const pagingLast = document.querySelector('.page-last')|| [];
const totalPage = document.querySelector('.page-content').childElementCount || [];
const pageNumberList = document.querySelectorAll('.page-number') || [];

// 抓取當前頁碼 START
let currentCatalog = new URL(document.location).searchParams.get('catalog') || 0;
let currentPage = parseInt(new URL(document.location).searchParams.get('page')) || 1;
// 抓取當前頁碼 END

// update Page
function updateCurrentPage() {
  pageNumberList.forEach((el,index) => {
    el.classList.toggle('is-active', currentPage === index + 1)
  })
  //檢查Arrow Button 狀態
  const { dataset } = document.querySelector('.page-number.is-active') || [];
  pagingFirst.classList.toggle('is-disable', dataset.value === '1')
  pagingPrev.classList.toggle('is-disable', dataset.value === '1')
  pagingNext.classList.toggle('is-disable', dataset.value === totalPage.toString())
  pagingLast.classList.toggle('is-disable', dataset.value === totalPage.toString())
}
// 當只有 totalPage > 0 才觸發
if(totalPage > 0) { 
  updateCurrentPage();
}
// 第一頁
pagingFirst.onclick = () => {
  currentPage = 1;
  updateCurrentPage();
  window.location.href = `${ new URL(document.location).pathname }?catalog=${ currentCatalog }&page=${ currentPage }`;
}
// 上一頁
pagingPrev.onclick = () => {
  if(currentPage > 1) {
    currentPage--;
    updateCurrentPage();
    window.location.href = `${ new URL(document.location).pathname }?catalog=${ currentCatalog }&page=${ currentPage }`;
  }
}
//下一頁
pagingNext.onclick = () => {
  if(currentPage < totalPage) {
    currentPage++;
    updateCurrentPage();
    window.location.href = `${ new URL(document.location).pathname }?catalog=${ currentCatalog }&page=${ currentPage }`;
  }
}
//最後頁
pagingLast.onclick = () => {
  currentPage = totalPage;
  updateCurrentPage();
  window.location.href = `${ new URL(document.location).pathname }?catalog=${ currentCatalog }&page=${ currentPage }`;
}

// 數字按鈕設定click
pageNumberList.forEach(el => {
  el.addEventListener('click', function() {
    currentPage = Number(this.dataset.value);
    updateCurrentPage();
    window.location.href = `${ new URL(document.location).pathname }?catalog=${ currentCatalog }&page=${ currentPage }`;
  })
})

// tab切換js  START
const tabList = document.querySelectorAll('.tab');
  tabList.forEach((item) => {
    item.addEventListener('click', (e) => {
      document.querySelectorAll('.tab').forEach((el) => {
      el.classList.remove('is-active');
    });  
    const { value, catalog } = e.target.dataset;
    if(value === 'all') {
      document.querySelectorAll('.list-card').forEach((el) => {
        el.classList.remove('hidden');
      });
    }
    window.location.href = `${new URL(document.location).pathname }?catalog=${catalog}`;
    document.querySelectorAll('.list-card').forEach((el) => {
      el.classList.toggle('hidden', el.dataset.value !== value)
    });
  });
  });
//tab 狀態修改
tabList.forEach(item => {
  item.classList.toggle('is-active', item.dataset.catalog === currentCatalog.toString());
})