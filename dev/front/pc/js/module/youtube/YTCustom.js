import YTBase from './YTBase';

class YTCustom extends YTBase {
  constructor (option) {
    super(option);
  }
  init () {
    super.init();
    let target = $(this.$target).parent('.p-yt');
    this.$seek = target.find('.js-yt-seek');
    this.$seekBar = target.find('.js-yt-seek-bar');
    this.$playButton = target.find('.js-yt-play-button');
    this.$sound = target.find('.js-yt-sound');
    this.seekWidth = this.$seek.width();
    this.seekPoint = 0;
    this.allTime;
    this.progress = 0;
    this.isPlay = false;
    this.update = () => this._update();
    this.onResize = () => this._onResize();
    this.onSeekMousemove = (e) => this._onSeekMousemove(e);
    this.onSeekMouseenter = (e) => this._onSeekMouseenter(e);
    this.onSeekMouseleave = () => this._onSeekMouseleave();
    this.onSeekMouseup = (e) => this._onSeekMouseup(e);
    this.onSeekMousedown = () => this._onSeekMousedown();
    this.onClickPlayButton = (e) => this._onClickPlayButton(e);
    this.onClickCloseButton = (e) => this._onClickCloseButton(e);
    this.onClickSound = (e) => this._onClickSound(e);
    this._onResize();
    window.addEventListener('resize', this.onResize);
  }
  //準備
  _onReady (e) {
    this.player.setVolume(50);
    this.allTime = this.player.getDuration();
    this.$seek.on('mousemove', this.onSeekMousemove);
    this.$seek.on('mouseenter', this.onSeekMouseenter);
    this.$seek.on('mouseleave', this.onSeekMouseleave);
    this.$seek.on('mouseup', this.onSeekMouseup);
    this.$seek.on('mousedown', this.onSeekMousedown);
    this.$playButton.on('click', this.onClickPlayButton);
    this.$sound.on('click', this.onClickSound);
  }
  //状態が変化したときの処理
  _onStateChange (e) {
    //再生が最後まで完了したとき
    if(e.data === 0) {
      cancelAnimationFrame(this.rafID);
      this.pause();
      this.updateSeek(this.allTime);
      return;
    }
    //再生開始したとき
    if(e.data === 1) {
      this.update();
      this.$playButton.addClass('is-play');
      this.turnOn();
      return;
    }
    //再生を停止したとき
    if(e.data === 2) {
      cancelAnimationFrame(this.rafID);
      return;
    }
  }
  _onPlaybackQualityChange (e) {
  }
  _onPlaybackRateChange (e) {
  }
  _onError (e) {
  }
  _onResize() {
  }
  _onSeekMousemove(e){
    if(this.isMouseDown && this.isMouseEnter) {
      this.seekWidth = this.$seek.width();
      this.seekPoint = e.clientX / this.seekWidth;
    }
  }
  _onSeekMouseenter(e){
    this.isMouseEnter = true;
    this.seekWidth = this.$seek.width();
    this.seekPoint = e.clientX / this.seekWidth;
  }
  _onSeekMouseleave(){
    this.isMouseEnter = false;
    this.isMouseDown = false;
  }
  _onSeekMouseup(e){
    this.seekWidth = this.$seek.width();
    if(window.innerWidth < 1180){
      this.seekPoint = (e.clientX - ((window.innerWidth - 140) - this.seekWidth) / 2) / this.seekWidth;
    } else {
      this.seekPoint = (e.clientX - (window.innerWidth - this.seekWidth) / 2) / this.seekWidth;
    }
    this.isMouseDown = false;
    this.player.seekTo(this.seekPoint * this.allTime);
    this.play ();
  }
  _onSeekMousedown(){
    this.isMouseDown = true;
    this.pause();
  }
  _onClickPlayButton(e){
    e.preventDefault();
    this.isPlay = !this.isPlay;
    if(this.isPlay) {
      this.play();
      return;
    }
    if(!this.isPlay) {
      this.pause();
      return;
    }
  }
  _onClickCloseButton(){
    this.pause();
  }
  _onClickSound(e){
    if(this.player.getVolume() === 0){
      this.turnOn();
      return;
    }
    this.turnOff();
  }
  //再生
  play () {
    this.isPlay = true;
    this.$playButton.addClass('is-play');
    this.turnOn();
    this.player.playVideo();
    this.player.playVideo();
  }
  //停止
  pause () {
    this.isPlay = false;
    this.$playButton.removeClass('is-play');
    this.turnOff();
    this.player.pauseVideo();
  }
  //音量 ON
  turnOn () {
    this.$sound.removeClass('is-off');
    this.player.setVolume(50);
  }
  //音量 OFF
  turnOff () {
    this.$sound.addClass('is-off');
    this.player.setVolume(0);
  }
  _update(){
    this.updateSeek(this.player.getCurrentTime());
    this.rafID = requestAnimationFrame(this.update);
  }
  //シークバーの更新
  updateSeek (current) {
    this.progress = current / this.allTime;
    TweenMax.to(this.$seekBar,0.1,{x: this.progress * 100 + '%'});
  }
}

export default YTCustom;
