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

const paginationOption = {
  el: '.swiper-pagination',
  clickable: true,
};
const navigationOption = (extrabtn = '') => ({
  nextEl: `.swiper-button-next${extrabtn}`,
  prevEl: `.swiper-button-prev${extrabtn}`,
});
const slideSetting = () => ({
  loop: true,
  autoplay: {
    delay: 5000,
		disableOnInteraction: false
  }
});
function mouseFuc(value) {
  document.addEventListener('mouseenter', event => {
    const el = event.target;
    if (el && el.matches && el.matches(value)) {
      el.swiper.autoplay.stop();
      el.classList.add('swiper-paused');
      const activeNavItem = el.querySelector('.swiper-pagination-bullet-active');
      activeNavItem.style.animationPlayState="paused";
    }
  }, true);
  document.addEventListener('mouseleave', event => {
    const el = event.target;
    if (el && el.matches && el.matches(value)) {
      el.swiper.autoplay.start();
      el.classList.remove('swiper-paused');
      const activeNavItem = el.querySelector('.swiper-pagination-bullet-active');
      activeNavItem.classList.remove('swiper-pagination-bullet-active');
      setTimeout(() => {
        activeNavItem.classList.add('swiper-pagination-bullet-active');
      }, 10);
    }
  }, true);
};

//Swiper 共用輪播 多圖
export function multSwiperImage() {
  const swiperImages = new Swiper('.swiper-images', {
    pagination: paginationOption,
    navigation: navigationOption(),
    ...slideSetting(),
    slidesPerView : '1.25',  
    centeredSlides: true,
    spaceBetween : 4,
    on: {
      transitionStart: function() {
      },
      slideChangeTransitionEnd: function() {
        const { dataset } = document.querySelector('.swiper-slide-active');
        const imageText = document.querySelector('.image-text');
        imageText.innerText = dataset.text
      },
    },
  });
  mouseFuc('.swiper-images');
};
//Swiper 共用輪播 首頁banner
export function bannerSwiper() {
  const swiperBanner = new Swiper('.swiper-banner', {
    pagination: paginationOption,
    navigation: navigationOption(),
    ...slideSetting(),
  });
  mouseFuc('.swiper-banner');
};

//分頁選擇器 - 公用
export function pageSelector(PageNumberView = 5){
  const pagingFirst = document.querySelector('.page-first') || [];
  const pagingPrev = document.querySelector('.page-prev') || [];
  const pagingNext = document.querySelector('.page-next') || [];
  const pagingLast = document.querySelector('.page-last')|| [];
  const totalPage = document.querySelector('.page-content').childElementCount || [];
  const pageNumberList = document.querySelectorAll('.page-number') || [];

  function updateCurrentPage() {
    const currentPage = parseInt(new URL(document.location).searchParams.get('page')) || 1;
    if(totalPage > 0) {
      pageNumberList.forEach((el,index) => {
        el.classList.toggle('is-active', currentPage === index + 1);
      });
      //檢查Arrow Button 狀態
      const { dataset } = document.querySelector('.page-number.is-active') || [];
      pagingFirst.classList.toggle('is-disable', dataset.value === '1');
      pagingPrev.classList.toggle('is-disable', dataset.value === '1');
      pagingNext.classList.toggle('is-disable', dataset.value === totalPage.toString());
      pagingLast.classList.toggle('is-disable', dataset.value === totalPage.toString());
    };
    //選擇器顯示狀態 (預設 > 5) START
    function showPage(firstVal, lastVal) {
      for(let i = firstVal; i <= lastVal; i++) {
        pageNumberList[i - 1].classList.toggle('lg:flex');
      };
    }
    //預設 PageNumberView = 5
    if(totalPage > PageNumberView) {
      const PageNumberCount = Math.floor(PageNumberView / 2);   // 當 PageNumberView = 5,default = 2
      const startPageNumber = currentPage <= PageNumberCount ? 1 : currentPage - PageNumberCount; // 當前頁面小於等於 PageNumberView 時為1 ,其餘為與 PageNumberCount的相差
      // 狀態 - 顯示最後面前 n 個
      if(currentPage > totalPage - PageNumberCount) {
        showPage(totalPage - PageNumberView + 1, totalPage);
        return
      }
      //狀態 - 其他狀態
      showPage(startPageNumber, startPageNumber + PageNumberView - 1);
      return
    }
    pageNumberList.forEach(el =>{
      el.classList.add('lg:flex');
    });
    //選擇器顯示狀態 (預設 > 5) END
  };

  function updateLocation(currentPage) {
    const newUrl = new URL(document.location);
    const catalogUrl = newUrl.searchParams.get('catalog') ? `&catalog=${newUrl.searchParams.get('catalog')}` : '';
    window.location.href = newUrl.pathname + (`?page=${currentPage}${catalogUrl}`);
  };
  updateCurrentPage();

  // 第一頁
  pagingFirst.onclick = () => {
    updateLocation(1);
  };
  // 上一頁
  pagingPrev.onclick = () => {
    updateLocation(Number(new URL(document.location).searchParams.get('page') || 1) - 1);    
  };
  //下一頁
  pagingNext.onclick = () => {
    updateLocation(Number(new URL(document.location).searchParams.get('page') || 1) + 1);    
  };
  //最後頁
  pagingLast.onclick = () => {
    updateLocation(totalPage);  
  };
  // 數字按鈕設定click
  pageNumberList.forEach(el => {
    el.addEventListener('click', function() {
      updateLocation(Number(this.dataset.value));
    });
  });
};
export function tabChange() {
  const currentCatalog = new URL(document.location).searchParams.get('catalog') || 0;
  const tabList = document.querySelectorAll('.tab') || [];
  //TAB 切換js  START
  tabList.forEach((item) => {
    item.addEventListener('click', (e) => {
      document.querySelectorAll('.tab').forEach((el) => { 
        el.classList.remove('is-active');
      });  
      const { value, catalog } = e.target.dataset;
      window.location.href = `${new URL(document.location).pathname }?catalog=${catalog}`;
      if(value === 'all') {
        document.querySelectorAll('.list-card').forEach((el) => {
          el.classList.remove('hidden');
        });
        return
      };
      document.querySelectorAll('.list-card').forEach((el) => {
        el.classList.toggle('hidden', el.dataset.value !== value);
      });
    });
  });
  tabList.forEach(item => {
    item.classList.toggle('is-active', item.dataset.catalog === currentCatalog.toString());
  });
  //TAB 切換js END
};

//複製按鈕 START
export function copyFunction() {
  const copyButtonList = document.querySelectorAll('.copy-button');
  copyButtonList.forEach(el => {
    el.addEventListener('click', async function() {
      const link = this.getAttribute('data-link');
      const tempInput = document.createElement('input');
      tempInput.style.visibility = 'hidden';
      tempInput.value = link;
      document.body.appendChild(tempInput);
      tempInput.select();
      await navigator.clipboard.writeText(tempInput.value);
      document.body.removeChild(tempInput);
      alert(`你已經複製 ${link}`);
    });
  });
};
//複製按鈕 END

