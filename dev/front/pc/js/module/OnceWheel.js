import ScrollCanceler from '../util/ScrollCanceler';


class OnceWheel {
  constructor(options){
    this.options = $.extend({},OPTION,options);


    this.init();
  }
  init(){


  }

  resize(){
    this.containerH = this.container.height();
    this.winH = window.innerHeight;
  }
  update(current){

  }
  destroy(){

  }
}

export default OnceWheel;
