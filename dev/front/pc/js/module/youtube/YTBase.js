const OPTION = {
  target: 'js-youtube',
  videoId: 'ByxW-vl3JRA',
  playerVars: {
    'autoplay': 0,
    'cc_load_policy': 0,
    'color': 'red',
    'controls': 0,
    'disablekb': 1,
    'enablejsapi': 1,
    'fs': 0,
    'hl': 'ja',
    'iv_load_policy': 3,
    'showinfo': 0,
    'rel': 0,
    'playlist': '',
    'loop': 1,
    'modestbranding': 1
  }
};

class YTBase {
  constructor(option) {
    this.option = $.extend(true, {}, OPTION, option);
    this.player;
  }
  init() {
    this.watchAPIisLoaded = () => this._watchAPIisLoaded();

    this.$target = document.getElementById(this.option.target);
    if(!this.$target) return;

    //イベント初期化
    this.initEvents();

    //YouTube APIが読まれていない場合は読み込みを行う
    if(typeof window.YT === 'undefined') {
      var tag = document.createElement('script');
      tag.src = "//www.youtube.com/iframe_api";
      var firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }

    //YouTube APIの読み込みを監視
    this.watchAPIisLoaded();
  }
  //イベントを設定
  initEvents() {
    this.onReady = (e) => this._onReady(e);
    this.onStateChange = (e) => this._onStateChange(e);
    this.onPlaybackQualityChange = (e) => this._onPlaybackQualityChange(e);
    this.onPlaybackRateChange = (e) => this._onPlaybackRateChange (e);
    this.onError = (e) => this._onError(e);
  }
  //YouTubeを用意
  onAPIReady() {
    this.player = new YT.Player(this.option.target, {
      videoId: this.option.videoId,
      playerVars: this.option.playerVars,
      events: {
        'onReady': this.onReady,
        'onStateChange': this.onStateChange,
        'onPlaybackQualityChange': this.onPlaybackQualityChange,
        'onPlaybackRateChange': this.onPlaybackRateChange,
        'onError': this.onError,
      }
    });
  }
  //YouTube APIの読み込みを監視
  _watchAPIisLoaded() {
    if(!window.YT) {
      this.rafID = requestAnimationFrame(this.watchAPIisLoaded);
      return;
    }
    if(!window.YT.loaded) {
      this.rafID = requestAnimationFrame(this.watchAPIisLoaded);
      return;
    }
    cancelAnimationFrame(this.rafID);
    this.onAPIReady();
    return;
  }
  _onReady (e) {
  }
  _onStateChange (e) {
  }
  _onPlaybackQualityChange (e) {
  }
  _onPlaybackRateChange (e) {
  }
  _onError (e) {
  }
}

export default YTBase;
