let throttle = require('lodash/throttle');
let debounce = require('lodash/debounce');

import SplitSpan from '../util/SplitSpan';
import ScrollCanceler from '../util/ScrollCanceler';
// import WayPointManager from '../module/WayPointManager';

class CommonController {
  constructor() {
    //element
    this.$window = $(window);
    this.$body = $('body');
    this.$header = $('.p-header');
    this.$mv = $('.p-top-mv');
    this.$pageTop = $('.p-pageTop');
    this.$navOpenBtn = $('.p-header__spBtn__open');
    this.$navCloseBtn = $('.p-header__spBtn__close');
    this.$rightContactBtn = $('.p-header__contact');
    this.$spContactBtn = $('.p-header__spContact');
    this.$toaboutBtn = $('.nav-about');
    this.$tocurriculumBtn = $('.nav-curriculum');
    this.$tomemberBtn = $('.nav-member');
    this.$tocontactBtn = $('.contact-link');
    // this.$navItem = $('.p-header__fixed__navi__item');
    this.windowHeight = this.$window.outerHeight();
    this.windowWidth = this.$window.innerWidth();
    this.bodyHeight = this.$body.innerHeight();

    this.$aboutArea = $('.p-top-about');
    this.$curriculumArea = $('.p-top-curriculum');
    this.$memberArea = $('.p-top-member');
    this.$footer = $('.p-footer');

    this.aboutTop = this.$aboutArea.offset().top - 50;
    this.curriculumTop = this.$curriculumArea.offset().top - 50;
    this.memberTop = this.$memberArea.offset().top - 50;
    this.footerTop = this.$footer.offset().top - 50;

    this.$loadFlag = $('#load-flag')
    //modules
    this.ScrollCanceler = new ScrollCanceler();
    //flags
    this.isLoad = false; //初回のロードが完了しているかどうか？
    this.isFirst = true; //初回の接続かどうか
    this.isFetch = false; //ページ遷移中かどうか
    this.isExit = false;
    this.navAnimationFlag = false;

    this.$mv.css('height', this.windowHeight);
    this.$header.css('height', this.windowHeight);
  }

  onInit() {
    //event
    this.update = () => this._update();
    this.scrollTicker = () => this._scrollTicker();
    this.onScroll = (e) => this._onScroll(e);
    this.onResize = (e) => this._onResize(e);
    this.onResizeEnd = (e) => this._onResizeEnd(e);
    this.onPopstate = (e) => this._onPopstate(e);
    this.onClickLink = (e) => this._onClickLink(e);
    // this.offScroll = (e) => this._offScroll(e);
    // this.releaseScroll = (e) => this._releaseScroll(e);
    this.onNavOpen = (e) => this._onNavOpen(e);
    this.onNavClose = (e) => this._onNavClose(e);
    this.onPageTop = (e) => this._onPageTop(e);
    this.onToContact = (e) => this._onToContact(e);
    this.scrollControll = (e) => this._scrollControll(e)
    // this.scrollDown = (scroll) => this._scrollDown(scroll)
    // this.onMousemove = (e) => this._onMousemove(e);
    TweenMax.set(window, {
      scrollTo: {
        y: 0,
      },
    });
    this.scrollCanceler = new ScrollCanceler();
    this.scrollCanceler.cancel();
    this.eventHandler();
    let loaded = this._onLoad();
    let opening = this.opening();
    Promise.all([loaded, opening]).then(() => {
      this.$body.removeClass('is-loading');
      this.$body.addClass('is-loading-end');
      TweenLite.to($('#logo-svg >path'), .4, {
        scale: .5,
        opacity: 0,
        delay: .2,
        ease: Power4.easeInOut,
      });
      setTimeout(() => {
        window.__GLOBAL.isFirst = false;
        this.$body.addClass('view-contents');
        this.scrollCanceler.arrow();
      }, 1000);
    });
  }
  eventHandler() {
    this.$body.on('click.link', 'a', this.onClickLink);
    this.$window.on('resize', this.onResize);
    this.$window.on('resize', debounce(this.onResizeEnd, 200));
    this.$window.on('popstate', this.onPopstate);
    this.$window.on('scroll', throttle(this.onScroll, 10));
    this.$navOpenBtn.on('click', this.onNavOpen);
    this.$navCloseBtn.on('click', this.onNavClose);
    // this.$pageTop.on('click', this.onPageTop);
    __GLOBAL.emitter.on('scroll', this.onScroll);

    this.$toaboutBtn.on('click', (e) => {
      e.preventDefault();
      if (this.windowWidth <= 768) this.onNavClose();
      this.aboutTop = this.$aboutArea.offset().top - 50;
      this.scrollDown(this.aboutTop);
    });
    this.$tocurriculumBtn.on('click', (e) => {
      e.preventDefault();
      if (this.windowWidth <= 768) this.onNavClose();
      this.curriculumTop = this.$curriculumArea.offset().top - 50;
      this.scrollDown(this.curriculumTop);
    });
    this.$tomemberBtn.on('click', (e) => {
      e.preventDefault();
      if (this.windowWidth <= 768) this.onNavClose();
      this.memberTop = this.$memberArea.offset().top - 50;
      this.scrollDown(this.memberTop);
    });
    this.$tocontactBtn.on('click', (e) => {
      e.preventDefault();
      if (this.windowWidth <= 768) this.onNavClose();
      this.footerTop = this.$footer.offset().top - this.windowHeight;
      this.scrollDown(this.footerTop);
    });
  }
  opening() {
    return new Promise((resolve) => {
      TweenLite.set('.svg-logo0', {
        x: 10,
        skewX: -50,
        scale: 0,
      });
      TweenLite.set(['.logo-top-leftEye', '.logo-top-rightEye'], {
        y: 10,
        scale: 0,
      });
      TweenLite.set('.logo-top-mouth', {
        x: -9,
        y: 9,
        scale: 0,
        scaleX: 0,
      });
      TweenLite.set('.svg-logo1', {
        y: -20,
        x: 9,
        rotation: 20,
        opacity: 0,
        scale: .4,
      });

      this.$body.addClass('is-loading');

      const tl = new TimelineMax();
      tl.eventCallback("onComplete", () => {
        resolve()
      })
      let duration1 = .5;
      let duration2 = .4;
      let nextTime1 = '-=' + (duration1 - 0.07) + '';
      let nextTime2 = '-=' + duration1 + '';
      let nextTime3 = '-=' + (duration2 - 0.07) + '';
      let nextTime4 = '-=' + duration2 + '';
      let easing1 = Power4.easeInOut;


      tl.to('.logo-top-P', duration1, {
        opacity: 1,
        scale: 1,
        x: 0,
        skewX: 0,
        ease: easing1
      }, '0.5').to('.logo-top-R', duration1, {
        opacity: 1,
        scale: 1,
        x: 0,
        skewX: 0,
        ease: easing1
      }, nextTime1).to('.logo-top-O', duration1, {
        opacity: 1,
        scale: 1,
        x: 0,
        skewX: 0,
        ease: easing1
      }, nextTime1).to('.logo-top-U', duration1, {
        opacity: 1,
        scale: 1,
        x: 0,
        skewX: 0,
        ease: easing1
      }, nextTime1).to('.logo-top-leftEye', duration2, {
        scale: 1,
        y: 0,
        ease: easing1
      }, nextTime4).to('.logo-top-T', duration1, {
        opacity: 1,
        scale: 1,
        x: 0,
        skewX: 0,
        ease: easing1
      }, nextTime1).to('.logo-top-rightEye', duration2, {
        scale: 1,
        y: 0,
        ease: easing1
      }, nextTime4).to('.logo-top-mouth', .4, {
        scale: 1,
        scaleX: 1,
        x: 0,
        y: 0,
        ease: easing1
      }, nextTime1).to(['.logo-bottom-S', '.logo-bottom-T', '.logo-bottom-U', '.logo-bottom-D', '.logo-bottom-I', '.logo-bottom-O'], .4, {
        y: 0,
        opacity: 1,
        rotation: 0,
        x: 0,
        scale: 1,
        ease: easing1,
      }, '-=.1');
    });
  }
  _onLoad() {
    return new Promise((resolve) => {
      let $img = $('#load-flag');
      let originSrc = $img.attr('src');
      $img.attr('src', '');
      $img.on('load', () => {
        resolve();
      });
      $img.attr('src', originSrc);
    });
  }
  _onMousemove(e) {
    if (window.__GLOBAL.isSP) return;
    window.__GLOBAL.mouse.x = e.clientX - this.harfW;
  }
  onFetchStart(ctx) {
    return new Promise((resolve) => {
      if (!window.__GLOBAL.isFirst) {}
      this.isFetch = false;
      this.isExit = false;
      this.splitSpan = new SplitSpan();
      this.onResize();
      this.onResizeEnd();

      if (window.__GLOBAL.UA.browser.name !== 'IE') {
        lax.setup();
      }
      this.update();

      resolve();
    });
  }
  _onPageTop(e) {
    TweenMax.to(window, .3, {
      scrollTo: {
        y: 0,
      },
    });
  }
  _onNavOpen(e) {
    if (this.navAnimationFlag) return;
    this.scrollCanceler.cancel()
    this.navAnimationFlag = true;
    this.$body.addClass('is-navOpen');
    setTimeout(() => {
      this.navAnimationFlag = false;
    }, 500);
  }
  _onNavClose(e) {
    if (this.navAnimationFlag) return;
    this.scrollCanceler.arrow();
    this.navAnimationFlag = true;
    this.$body.removeClass('is-navOpen');
    setTimeout(() => {
      this.navAnimationFlag = false;
    }, 500);
  }
  scrollDown(scroll) {
    if (this.windowWidth <= 768) {
      TweenMax.set(window, {
        scrollTo: {
          y: scroll,
        },
      })
      return;
    }
    TweenMax.to(window, 1, {
      scrollTo: {
        y: scroll,
        autoKill: false,
      },
      ease: Power4.easeInOut,
    });
  }
  // _offScroll(e) {
  //   //PC用
  //   let scrollEvent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  //   $(document).on(scrollEvent, function (e) {
  //     e.preventDefault();
  //   });
  //   //SP用
  //   $(document).on('touchmove.offScroll', function (e) {
  //     e.preventDefault();
  //   });
  // }
  // _releaseScroll(e) {
  //   //PC用
  //   let scrollEvent = 'onwheel' in document ? 'wheel' : 'onmousewheel' in document ? 'mousewheel' : 'DOMMouseScroll';
  //   $(document).off(scrollEvent);
  //   //SP用
  //   $(document).off('.offScroll');
  // }
  _update(e) {
    if (this.isExit) {
      cancelAnimationFrame(this.rafID);
      return;
    }
    __GLOBAL.emitter.emit('scroll', this.scrollTop);
    this.scrollControll();
    this.rafID = requestAnimationFrame(this.update);
  }
  _onScroll(e) {
    if (this.ticking || window.__GLOBAL.wheelFlg) return;
    this.ticking = true;
    this.scroll = this.$window.scrollTop();
    if (window.__GLOBAL.UA.browser.name !== 'IE') {
      lax.update(window.scrollY)
    }
    requestAnimationFrame(this.scrollTicker);
  }
  _scrollTicker() {
    this.scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    this.ticking = false;
  }
  _onResize(e) {
    if (!this.isResize) {}
    this.isResize = true;
  }
  _onResizeEnd(e) {
    this.isResize = false;
    this.windowHeight = this.$window.outerHeight();
    this.windowWidth = this.$window.innerWidth();
    if (window.__GLOBAL.UA.browser.name !== 'IE') {
      lax.updateElements()
    }
    // setTimeout(() => {
    // lax.populateElements()
    // }, 200);
  }
  _onClickLink(e) {
    e.preventDefault();

    let $target = $(e.currentTarget);
    //そのまま遷移させる
    if (!$target.attr('href')) return;
    //外部リンク
    if ($target.attr('target') === '_blank') {
      window.open($target.attr('href'), '_blank');
      return;
    }
    if ($target.hasClass('mailLink')) {
      window.open($target.attr('href'));
      return;
    }
    //ルーティングなし
    if ($target.hasClass('js-non-routing')) return;
    return;
    //通常の遷移を切る
    //通信中の場合は処理を止める
    if (this.isFetch) return;
    //遷移先のURLを取得
    let href = $target.attr('href');
    let path = $target[0].pathname;
    let currentPath = location.pathname;
    if ($target[0].hash) {
      path += $target[0].hash;
      currentPath += location.hash;
    }
    if ($target[0].search) {
      path += $target[0].search;
      currentPath += location.search;
    }

    //現在のパスと遷移作のパスが同じであれば処理を止める
    if (path === currentPath) {
      return;
    }
    this.isFetch = true;
    // this.releaseScroll();

    //ローディングのアニメーション開始
    this.loadingStart().then(() => {
      //次ページを取得
      page(path)
    });

  }
  loadingStart() {
    return new Promise((resolve, reject) => {
      resolve();
    });
  }
  _onPopstate(e) {
    e.preventDefault();
    let path = location.pathname;
    if (location.hash) {
      path += location.hash;
    }
    if (location.search) {
      path += location.search;
    }
    this.isFetch = true;
    page.replace(path, e.state);
  }
  onExit() {
    return new Promise((resolve) => {
      this.isExit = true;
      // window.__GLOBAL.enterWayPoint.destory();
      // this.enterLeaveWayPoint.destory();
      resolve();
    });
  }
  _scrollControll() {
    if (this.scroll >= 30 && !this.navMin) {
      this.navMin = true;
      this.$header.addClass('is-min');
    } else if (this.scroll < 30 && this.navMin) {
      this.navMin = false;
      this.$header.removeClass('is-min');
    }
    if (this.scroll >= this.footerTop - this.windowHeight * 2 && !this.contactFlg) {
      this.contactFlg = true;
      this.$rightContactBtn.addClass('is-hide');
    } else if (this.scroll < this.footerTop - this.windowHeight * 2 && this.contactFlg) {
      this.contactFlg = false;
      this.$rightContactBtn.removeClass('is-hide');
    }

  }
  _onToContact() {

  }
}
export default CommonController;
