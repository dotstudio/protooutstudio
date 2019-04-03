const OPTION = {
  target: '.p-top-doit__aboutCover__inner__contents-inner',
  margin: 90
};

class ModalScrolling{
  constructor(option){
    this.options = $.extend({},OPTION,option);
    this.$target = $(this.options.target);
    this.winH = window.innerHeight;
    this.targetMax = this.$target.height() - this.winH + this.options.margin;
    this.posY = 0;

    this.init();
  }
  init(){
    this.hm = new Hammer(this.$target[0]);

    this.onWheel = (e) => this._onWheel(e);
    this.onTouch = (e) => this._onTouch(e);

    this.$target.on('mousewheel.modal', this.onWheel);
    this.hm.get('pan').set({
      threshold: 1
    });
    this.hm.on('panmove', this.onTouch);

  }
  _onWheel(e){
    this.posY += e.originalEvent.deltaY;
    this.move();
  }
  _onTouch(e){
    console.log(e);
    this.posY += -e.deltaY;
    this.move();
  }
  move(){
    if(this.posY < 0){
      this.posY = 0;
    }
    if( this.targetMax < this.posY){
      this.posY = this.targetMax;
    }
    console.log(this.posY);
    this.set();
  }
  set(){
    TweenMax.set(this.$target,{
      y: -this.posY
    });
  }
  resize(){
    this.winH = window.innerHeight;
    this.targetMax = this.$target.height() - this.winH + this.options.margin;
  }
  update(scroll){


  }
  destory(){
    this.$target.off('scroll.modal');
  }
}

export default ModalScrolling;
