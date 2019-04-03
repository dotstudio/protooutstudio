import VideoBase from '../video/VideoBase';

class VideoCustom extends VideoBase {
  constructor (option) {
    super(option);
  }
  init () {
    super.init();
    this.$seek = $('#js-reel-seek');
    this.$playButton = $('#js-reel-play-button');
    this.$closeButton = $('.js-reel-close');
    this.$sound = $('#js-reel-sound');
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

    this.$seek.on('mousemove', this.onSeekMousemove);
    this.$seek.on('touchmove', this.onSeekMousemove);
    this.$seek.on('mouseenter', this.onSeekMouseenter);
    this.$seek.on('mouseleave', this.onSeekMouseleave);
    this.$seek.on('mouseup', this.onSeekMouseup);
    this.$seek.on('mousedown', this.onSeekMousedown);
    this.$playButton.on('click', this.onClickPlayButton);
    this.$closeButton.on('click', this.onClickCloseButton);
    this.$sound.on('click', this.onClickSound);
  }
  /**
   * メディアデータの再生を再開することができる状態の時
   * @param e
   * @private
   */
  _onCanplay (e) {
    this.setVolume(0.5);
    this.allTime = this.getDuration();
    this.playVideo();
  }

  /**
   * 再生中の時
   * @param e
   * @private
   */
  _onPlay (e) {
    this.update();
  }

  /**
   * 一時停止中の時
   * @param e
   * @private
   */
  _onPause (e) {
    cancelAnimationFrame(this.rafID);
  }

  /**
   * メディアリソースの末尾に達して、再生が停止した時
   * @param e
   * @private
   */
  _onEnded (e) {
    cancelAnimationFrame(this.rafID);
    this.updateSeek(this.allTime);
    this.pause();
  }

  /**
   * シーク（再生位置への移動）中の時
   * @param e
   * @private
   */
  _onSeeking (e) {
    this.updateSeek(this.getCurrentTime());
  }

  /**
   * シーク（再生位置への移動）が完了した時
   * @param e
   * @private
   */
  _onSeeked (e) {
    this.updateSeek(this.getCurrentTime());
  }

  _onResize() {
  }
  _onSeekMousemove(e){
    if(this.isMouseDown && this.isMouseEnter) {
      this.seekWidth = this.$seek.width();
      this.seekPoint = e.clientX / this.seekWidth;
      console.log(this.seekWidth, e.clientX, this.allTime);
      this.seekTo(this.seekPoint * this.allTime);
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
    this.seekPoint = e.clientX / this.seekWidth;
    this.isMouseDown = false;
    this.seekTo(this.seekPoint * this.allTime);
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
    if(this.getVolume() === 0){
      this.turnOn();
      return;
    }
    this.turnOff();
  }
  //再生
  play () {
    this.isPlay = true;
    this.$playButton.addClass('is-play');
    this.playVideo();
  }
  //停止
  pause () {
    this.isPlay = false;
    this.$playButton.removeClass('is-play');
    this.pauseVideo();
  }
  //音量 ON
  turnOn () {
    this.$sound.removeClass('is-off');
    this.setVolume(0.5);
  }
  //音量 OFF
  turnOff () {
    this.$sound.addClass('is-off');
    this.setVolume(0);
  }
  //監視用のループ
  _update(){
    this.updateSeek(this.getCurrentTime());
    this.rafID = requestAnimationFrame(this.update);
  }
  //シークバーの更新
  updateSeek (current) {
    this.progress = current / this.allTime;
    TweenMax.set('#js-reel-seek-bar', {x: (this.progress - 1) * 100 + '%'});
  }
}

export default VideoCustom;