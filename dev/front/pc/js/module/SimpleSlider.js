const OPTION = {
  $element: 'body',
  DURATION: 0.6,
  slider: '.js-slider',
  item: '.js-slider-item',
  right: '.js-slider-right',
  left: '.js-slider-left'

}

class SimpleSlider {
  constructor(options){
    this.options = $.extend({},OPTION,options);

    this.$win = $(window);
    this.$slider = this.options.$element;
    this.DURATION = this.options.DURATION;

    this.$wrap = this.$slider.find(this.options.slider);
    this.$item = this.$slider.find(this.options.item);

    this.$next = this.$slider.find(this.options.right);
    this.$prev = this.$slider.find(this.options.left);
    this.itemLength = this.$item.length;

    this.itemW = this.$item.width();
    this.itemH = this.$item.height();
    this.itemWHarf = this.itemW / 2;
    this.itemHHarf = this.itemH / 2;

    this.hm = new Hammer(this.options.$element[0]);

    this.onResize = (e) => this._onResize(e);
    this.next = (e) => this._next(e);
    this.prev = (e) => this._prev(e);
    // this.onClickPager = (e) => this._onClickPager(e)

    this.oldIndex = 0;
    this.index = 0;
    this.moveFlg = false;
    this.isSP = false;

    this.init();
  }
  init(){
    this.$win.on('resize.slider',this.onResize);
    this.$next.on('click',this.next);
    this.$prev.on('click',this.prev);
    // this.$pager.on('click',this.onClickPager);
    this.hm.on('swiperight',this.prev);
    this.hm.on('swipeleft',this.next);

    // this.$pager.eq(this.index).addClass('is-current');
    this.$item.eq(this.index).addClass('sliderTop');

    this.onResize();
  }
  _onResize(){
    this.itemW = this.$item.width();
    this.itemH = this.$item.height();
    this.itemWHarf = this.itemW / 2;
    this.itemHHarf = this.itemH / 2;

    if(800 < window.innerWidth){
      this.isSP = false;
      TweenMax.set(this.$wrap,{
        x: 0
      });
    } else {
      this.isSP = true;
      TweenMax.to(this.$wrap,0.6,{
        x: -this.itemW * this.index,
        ease: Power4.easeOut
      });
    }

  }
  // _onClickPager(e){
  //   e.preventDefault();
  //   if(this.moveFlg) return;
  //   this.oldIndex = this.index;
  //   let $this = $(e.currentTarget);
  //   this.index = $this.data('pager');
  //   this.change(this.$item.eq(this.index),this.$item.eq(this.oldIndex));
  // }
  _next(e){
    e.preventDefault();
    if(!this.isSP) return;
    if(this.moveFlg) return;
    this.oldIndex = this.index;
    this.index++;
    if(this.itemLength <= this.index) {
      this.index = 0;
    }
    this.change(this.$item.eq(this.index),this.$item.eq(this.oldIndex));
  }
  _prev(e){
    e.preventDefault();
    if(!this.isSP) return;
    if(this.moveFlg) return;
    this.oldIndex = this.index;
    this.index--;
    if(this.index < 0){
      this.index = this.itemLength - 1;
    }
    this.change(this.$item.eq(this.index),this.$item.eq(this.oldIndex));
  }
  change($target,$oldTarget){
    this.moveFlg = true;

    this.$slider.addClass('is-change');
    // this.$pager.removeClass('is-current');
    // this.$pager.eq(this.index).addClass('is-current');
    // $target.addClass('sliderNext');
    TweenMax.to(this.$wrap,0.6,{
      x: -window.innerWidth * this.index,
      ease: Power4.easeOut
    });

    setTimeout(() => {
      this.$item.removeClass('sliderTop');
      // this.$item.removeClass('sliderNext');
      $target.addClass('sliderTop');
      this.$slider.removeClass('is-change');
      this.moveFlg = false;
    },600);
  }
  destroy(){
    this.$win.off('resize.slider');
    this.$next.off('click');
    this.$prev.off('click');
    // this.$pager.off('click');
    this.hm.on('swiperight',this.prev);
    this.hm.on('swipeleft',this.next);
  }
}

export default SimpleSlider;
