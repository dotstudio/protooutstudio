let debounce = require('lodash/debounce');

const OPTION = {
  target: '',
  spOffsetX: 256,
  topOffset: 0,
  bottomOffset: 0,
  parentsTop: 0
};

class ElementsSticky {
  constructor(options){
    // this.option = this.extend(OPTION,options);
    this.option = $.extend({},OPTION,options);
    this.targets = document.querySelectorAll(this.option.target);
    this.scroll = 0;
    this.scrollTop = 0;

    this.onResize = (e) => this._onResize(e);

    this.targetArray = [];

    this.eventHandler();
    this.init();
  }
  eventHandler(){
    window.addEventListener('resize', debounce(this.onResize,400), false);
  }
  init(){
    let rect = null;
    this.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    for(let i = 0; i < this.targets.length; i++){
      rect = this.targets[i].getBoundingClientRect();
      this.targetArray.push({
        stick: false,
        target: this.targets[i],
        h: rect.height,
        t: this.option.parentsTop - this.option.topOffset,
        b: document.body.clientHeight - this.option.bottomOffset
      });
    }
  }
  _onResize(){
    let rect = null;
    this.scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    for(let i = 0; i < this.targetArray.length; i++){
      rect = this.targetArray[i].target.getBoundingClientRect();
      this.targetArray[i].h = rect.height;
      this.targetArray[i].t = this.option.parentsTop - this.option.topOffset;
      this.targetArray[i].b = document.body.clientHeight - this.option.bottomOffset;
      this.set(this.targetArray[i].target,-(this.targetArray[i].t - this.scroll),this.targetArray[i].b);
    }
  }
  update(scroll){
    this.scroll = scroll;
    for(let i = 0; i < this.targetArray.length; i++){
      if(this.targetArray[i].t < this.scroll && this.scroll + window.innerHeight < this.targetArray[i].b){
        this.set(this.targetArray[i].target,-(this.targetArray[i].t - this.scroll),this.targetArray[i].b);
      } else if(this.scroll <= this.targetArray[i].t){
        this.set(this.targetArray[i].target,-(this.targetArray[i].t - this.scroll),this.targetArray[i].b);
      }
    }
  }
  set(target,y,b){
    if(y < 0){
      y = 0;
    }

    if(b < y){
      y = b;
    }

    if(window.innerWidth < 800){
      y = 0;
      TweenLite.set(target,{y:y,x: this.option.spOffsetX});
    } else {
      TweenLite.set(target,{y:y,x: 0});
    }
  }
  destroy(){
    window.removeEventListener('resize', this.onResize, false);
  }
}

export default ElementsSticky;
