const OPTION = {
  toggleTarget: 'body',
  fireTarget: '.js-color-change'
}

class ColorChange {
  constructor(options){
    this.options = $.extend({},OPTION,options);
    this.toggleTarget = $(this.options.toggleTarget);
    this.fireTarget = $(this.options.fireTarget);
    this.colorChangeArray = [];
    this.winH = window.innerHeight;
    this.resizeFlg = false;
    this.init();
  }
  init(){
    this.colorChangeArray = [];
    this.fireTarget.each((index,value) => {
      this.colorChangeArray.push({
        target: $(value),
        top: $(value).offset().top - this.winH,
        bottom: $(value).offset().top + $(value).height() - this.winH,
        color: $(value).attr('data-color'),
        state: false
      })
    });
  }
  resize(){
    this.resizeFlg = true;
    this.init();
    this.winH = window.innerHeight;
    this.resizeFlg = false;
  }
  update(scroll){

    if(window.__GLOBAL.isSP || this.resizeFlg) return;
    this.colorChangeArray.forEach((value) => {
      value.state = value.target.offset().top - this.winH + this.winH - 30 < scroll ? true : false;
      if(value.state){
        this.toggleTarget.addClass('is-' + value.color);
      } else {
        this.toggleTarget.removeClass('is-white').removeClass('is-black');
      }
    });
  }
}

export default ColorChange;
