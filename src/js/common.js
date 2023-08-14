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
}
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
}
//Swiper 共用輪播 首頁banner
export function bannerSwiper() {
  const swiperBanner = new Swiper('.swiper-banner', {
    pagination: paginationOption,
    navigation: navigationOption(),
    ...slideSetting(),
  });
  mouseFuc('.swiper-banner');
}

//分頁選擇器 & Tab - 公用
export function pageSelector(isTab){
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
  function updateCurrentPage() {
    pageNumberList.forEach((el,index) => {
      if(totalPage > 0) {
        el.classList.toggle('is-active', currentPage === index + 1);
      }
    })
    //檢查Arrow Button 狀態
    const { dataset } = document.querySelector('.page-number.is-active') || [];
    pagingFirst.classList.toggle('is-disable', dataset.value === '1')
    pagingPrev.classList.toggle('is-disable', dataset.value === '1')
    pagingNext.classList.toggle('is-disable', dataset.value === totalPage.toString())
    pagingLast.classList.toggle('is-disable', dataset.value === totalPage.toString())
  }
  function updateLocation() {
    let catalog = isTab ? `?catalog=${currentCatalog}&`: '?';
    window.location.href = new URL(document.location).pathname + catalog + `page=${ currentPage }`;
  }
  updateCurrentPage();

  // 第一頁
  pagingFirst.onclick = () => {
    currentPage = 1;
    updateLocation();
  }
  // 上一頁
  pagingPrev.onclick = () => {
    if(currentPage > 1) {
      currentPage--;
      updateLocation();    
    }
  }
  //下一頁
  pagingNext.onclick = () => {
    if(currentPage < totalPage) {
      currentPage++;
      updateLocation();    
    }
  }
  //最後頁
  pagingLast.onclick = () => {
    currentPage = totalPage;
    updateLocation();  
  }
  // 數字按鈕設定click
  pageNumberList.forEach(el => {
    el.addEventListener('click', function() {
      currentPage = Number(this.dataset.value);
      updateLocation();
    })
  });
  //選擇器顯示狀態 > 5時 START
  if(totalPage > 5) {
    for(let i = 0 ; i < 5 ; i++) {
      pageNumberList[i].classList.toggle('lg:flex', currentPage === 1)
    };
    //中間數
    if(currentPage > 1 && currentPage !== totalPage) {
      const nextCount =  totalPage - currentPage > 4 ? 4 : totalPage - currentPage;
      const preCount = 4 - nextCount; 
      for(let i = currentPage - preCount; i <= currentPage + nextCount ; i++){
        pageNumberList[i - 1].classList.toggle('lg:flex')
      } 
    };
    //尾數
    if(currentPage === totalPage) {
    for(let i = totalPage ; i > totalPage - 5 ; i--) {
      pageNumberList[i - 1].classList.add('lg:flex')
      }
    };
  }
  else {
    pageNumberList.forEach(el =>{
      el.classList.add('lg:flex')
    })
  }
  //選擇器顯示狀態 > 5時 END
  //TAB 切換js  START
  if(isTab) {
    const tabList = document.querySelectorAll('.tab') || [];
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
    tabList.forEach(item => {
      item.classList.toggle('is-active', item.dataset.catalog === currentCatalog.toString());
    })
    //TAB 切換js END
  }
}

//複製按鈕 START
export function copyFunction() {
  const copyButtonList = document.querySelectorAll('.copy-button');
  copyButtonList.forEach(el => {
    el.addEventListener('click', async function() {
      let link = this.getAttribute('data-link');
      // 輸入框
      let tempInput = document.createElement('input');
      tempInput.style.position = 'absolute';
      tempInput.style.left = '-9999px';
      tempInput.value = link;
      document.body.appendChild(tempInput);
  
      tempInput.select();
      tempInput.setSelectionRange(0, link.length);
      await navigator.clipboard.writeText(tempInput.value);
      document.body.removeChild(tempInput);
      alert(`你已經複製 ${link}`);
    });
  });
}
//複製按鈕 END

