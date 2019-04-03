const OPTION = {

}

class ImageLozad{
  constructor(options){
    this.options = $.extend({},OPTION,options);
    // this.fullImage = this.

    this.count = 0;
  }
  init(){

  }
  fullLoadEnd(){
    return new Promise((resolve,reject) => {

    })
  }
}

export default ImageLozad;
