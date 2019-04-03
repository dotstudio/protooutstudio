let debounce = require('lodash/debounce');
let throttle = require('lodash/throttle');

class IndexController {
  constructor() {
    this.$body = $('body');
    this.$window = $(window);
  }

  onInit() {
    __GLOBAL.currentPage = 'index';
  }
  onFetchStart() {
    return new Promise((resolve) => {
      __GLOBAL.currentPage = 'index';
      this.$body.addClass('is-' + __GLOBAL.currentPage);
      this.isExit = false;
      this.scrollTop = 0;
      this.scroll = 0;
      this.curriculumFlag = false;
      this.curriculumDirection = true;
      this.moveDistance = 0;
      this.$mvNews = $('.p-top-mv__news__slider');
      this.$mvNewsPrev = $('.p-top-mv__news__arrow__up');
      this.$mvNewsNext = $('.p-top-mv__news__arrow__down');

      this.$curriculumBtn = $('.p-top-curriculum__btn');
      this.$curriculumBody = $('.p-top-curriculum__body');
      this.$curriculumCover = $('.p-top-curriculum');
      this.hm = new Hammer(this.$curriculumBody[0]);
      this.curriculumBodyWidth = this.$curriculumBody.innerWidth();
      this.curriculumCoverWidth = this.$curriculumCover.innerWidth();

      this.windowHeight = this.$window.innerHeight();
      this.windowWidth = this.$window.innerWidth();

      this.update = () => this._update();
      this.onScroll = (e) => this._onScroll(e);
      this.scrollTicker = () => this._scrollTicker();
      this.onResize = (e) => this._onResize(e);
      this.onResizeEnd = (e) => this._onResizeEnd(e);
      this.onSizeControl = (e) => this._onSizeControl(e);
      this.onCurriculumControl = (e) => this._onCurriculumControl(e);
      // this.$window.on('scroll', this.onScroll);
      this.$window.on('resize.index', this.onResize);
      this.$window.on('resize.index', debounce(this.onResizeEnd, 200));
      this.$curriculumBtn.on('click', this.onCurriculumControl);


      this.hm.on("swipeleft", ()=>{
        if(!this.curriculumDirection) return;
        this.onCurriculumControl;
      });
      this.hm.on("swiperight", ()=>{
        if(this.curriculumDirection) return;
        this.onCurriculumControl;
      });

      this.mvFlg = false;

      window.addEventListener('load', (event) => {
        setTimeout(() => {
          this.$body.addClass('is-loading-end');
        }, 300);
      });

      this.newsSlick();
      this.onResize();
      this.onResizeEnd();
      this.update();

      resolve();
    });
  }
  newsSlick() {
    this.$mvNews.slick({
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      initialSlide: 0,
      autoplay: true,
      autoplaySpeed: 5000,
      vertical: true,
      dots: false,
      arrows: false,
    });
    this.$mvNewsPrev.on('click', () => {
      this.$mvNews.slick('slickPrev');
    });
    this.$mvNewsNext.on('click', () => {
      this.$mvNews.slick('slickNext');
    });
  }
  _onResize(e) {
    if (!this.isResize) {

    }
    this.isResize = true;
  }
  _onSizeControl(e) {
    this.windowWidth = this.$window.innerWidth();
  }
  _onResizeEnd(e) {
    this.isResize = false;
    this.curriculumBodyWidth = this.$curriculumBody.innerWidth();
    this.curriculumCoverWidth = this.$curriculumCover.innerWidth();
    // setTimeout(() => {
    //   this.onSizeControl();
    // }, 300);
  }
  _update() {
    if (this.isExit) {
      cancelAnimationFrame(this.rafID);
      return;
    }
    this.rafID = requestAnimationFrame(this.update);
  }
  _onScroll(e) {
    if (this.ticking || window.__GLOBAL.wheelFlg) return;
    this.ticking = true;

    requestAnimationFrame(this.scrollTicker);
  }
  _scrollTicker() {
    if (!window.__GLOBAL.modalFlg) {
      this.scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    }
    this.scrollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    this.ticking = false;
  }
  onExit() {
    this.isExit = true;
  }
  _onCurriculumControl(e) {
    if (this.curriculumFlag) return;
    this.curriculumFlag = true;
    if (this.curriculumDirection) {
      this.moveDistance = this.curriculumCoverWidth - this.curriculumBodyWidth;
      this.curriculumDirection = false;
      this.$curriculumBtn.removeClass('is-right').addClass('is-left');
    } else {
      this.moveDistance = 0;
      this.curriculumDirection = true;
      this.$curriculumBtn.removeClass('is-left').addClass('is-right');
    }
    TweenLite.to(this.$curriculumBody, 0.5, {
      x: this.moveDistance,
      ease: Power3.easeOut,
    });
    setTimeout(() => {
      this.curriculumFlag = false;
    }, 300);
  }
}

export default IndexController;
