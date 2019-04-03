import YTCustom from './youtube/YTCustom';

const OPTION = {
  eventTarget: 'youtube',
}

class YoutubeLoader {
  constructor(options){
    this.options = $.extend({},OPTION,options);
    this.target = $('.p-besthub-detail__detail .p-yt');
    this.init();
  }
  init(){
    for(let i = 0; i < this.target.length; i++){
      let target = this.target.eq(i);
      target.find('.js-video').attr('id','youtube-' + i);
      let id = this.target.eq(i).find('.js-video').attr('data-video-id');
      let ytCustom = new YTCustom({target: 'youtube-' + i,videoId: id});
      ytCustom.init();
    }
  }
  destroy(){
    this.eventTarget.off('mousewheel');
  }
}

export default YoutubeLoader;
