let debounce = require('lodash/debounce');

class PeopleController {
  constructor() {
    this.$body = $('body');
    this.$window = $(window);
  }

  onInit() {
    __GLOBAL.currentPage = 'people';
  }
  onFetchStart() {
    return new Promise((resolve) => {
      __GLOBAL.currentPage = 'people';
      this.$body.addClass('is-' + __GLOBAL.currentPage);
      this.isExit = false;
      this.bottomFlg = false;
      this.$recruitArea = $('.c-recruit');
      this.$rightArea = $('.p-people__rightArea');
      this.windowHeight = this.$window.innerHeight();

      this.update = () => this._update();
      this.onScroll = (e) => this._onScroll(e);
      this.scrollTicker = () => this._scrollTicker();
      this.onResize = (e) => this._onResize(e);
      this.onResizeEnd = (e) => this._onResizeEnd(e);
      this.onSizeControl = (e) => this._onSizeControl(e);

      this.$window.on('scroll', this.onScroll);
      this.$window.on('resize.index', this.onResize);
      this.$window.on('resize.index', debounce(this.onResizeEnd, 200));

      this.onSizeControl();
      this.update();
      this.onResize();

      resolve();
    });
  }
  _onResize(e) {
    if (!this.isResize) {
      // this.resizeScrollTop = window.scrollY;
    }
    this.isResize = true;
  }
  _onResizeEnd(e) {
    this.isResize = false;
  }
  _onSizeControl(e) {
    this.windowHeight = this.$window.innerHeight();
    this.bottomPoint = this.$recruitArea.offset().top - this.windowHeight;
  }
  _update() {
    if (this.isExit) {
      cancelAnimationFrame(this.rafID);
      return;
    }
    console.log(this.bottomPoint);
    console.log(this.scrollTop);
    if (this.scrollTop < this.bottomPoint && !this.bottomFlg) {
      this.bottomFlg = true;
      this.$rightArea.removeClass('is-absolute');
    } else if (this.scrollTop >= this.bottomPoint && this.bottomFlg) {
      this.bottomFlg = false;
      this.$rightArea.addClass('is-absolute');
    }


    this.rafID = requestAnimationFrame(this.update);
  }
  _onScroll(e) {
    if (this.ticking || window.__GLOBAL.wheelFlg) return;
    this.ticking = true;
    requestAnimationFrame(this.scrollTicker);
  }
  _scrollTicker() {
    this.scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    this.ticking = false;
  }
  onExit() {
    this.isExit = true;
  }
}

export default PeopleController;
