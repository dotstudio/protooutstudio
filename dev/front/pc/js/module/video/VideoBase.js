const OPTION = {
  debug: 0,
  target: 'js-video'
};

class VideoBase {
  constructor(option) {
    this.option = $.extend(true, {}, OPTION, option);
    this.player;
  }

  //初期化
  init() {
    this.$target = document.getElementById(this.option.target);
    if(!this.$target) return this.hasVideo = false;

    this.hasVideo = true;
    this.player = this.$target;

    //イベント初期化
    this._initEvents();
  }

  //イベントを設定
  _initEvents() {
    this.onCanplay = (e) => this._onCanplay(e);
    this.onSeeking = (e) => this._onSeeking(e);
    this.onSeeked = (e) => this._onSeeked(e);
    this.onEnded = (e) => this._onEnded(e);
    this.onPlay = (e) => this._onPlay(e);
    this.onPause = (e) => this._onPause(e);

    this.player.addEventListener("canplay", this.onCanplay, false);
    this.player.addEventListener("seeking", this.onSeeking, false);
    this.player.addEventListener("seeked", this.onSeeked, false);
    this.player.addEventListener("ended", this.onEnded, false);
    this.player.addEventListener("play", this.onPlay, false);
    this.player.addEventListener("pause", this.onPause, false);
  }

  //破棄
  destroy(){
    if(this.hasVideo){
      this.player.removeEventListener("canplay", this.onCanplay, false);
      this.player.removeEventListener("seeking", this.onSeeking, false);
      this.player.removeEventListener("seeked", this.onSeeked, false);
      this.player.removeEventListener("ended", this.onEnded, false);
      this.player.removeEventListener("play", this.onPlay, false);
      this.player.removeEventListener("pause", this.onPause, false);
    }
  }

  // 再生
  playVideo(){
    this.player.play();
  }

  // 停止
  pauseVideo(){
    this.player.pause();
  }

  //ボリュームをセットする
  setVolume(val){
    this.player.volume = val;
  }

  //ボリュームを取得する
  getVolume(val){
    return this.player.volume;
  }

  //シークを移動する
  seekTo(val){
    this.player.currentTime = val;
  }

  //現在の再生時間を習得
  getCurrentTime(){
    return this.player.currentTime;
  }

  //動画の長さを習得
  getDuration(){
    return this.player.duration;
  }

  /**
   * メディアデータの再生を再開することができる状態の時
   * @param e
   * @private
   */
  _onCanplay (e) {
    if(this.option.debug) console.log('video: canplay');
  }

  /**
   * シーク（再生位置への移動）中の時
   * @param e
   * @private
   */
  _onSeeking (e) {
    if(this.option.debug) console.log('video: seeking');
  }

  /**
   * シーク（再生位置への移動）が完了した時
   * @param e
   * @private
   */
  _onSeeked (e) {
    if(this.option.debug) console.log('video: seeked');
  }

  /**
   * メディアリソースの末尾に達して、再生が停止した時
   * @param e
   * @private
   */
  _onEnded (e) {
    if(this.option.debug) console.log('video: ended');
  }

  /**
   * 再生中の時
   * @param e
   * @private
   */
  _onPlay (e) {
    if(this.option.debug) console.log('video: play');
  }

  /**
   * 一時停止中の時
   * @param e
   * @private
   */
  _onPause (e) {
    if(this.option.debug) console.log('video: pause');
  }
}

export default VideoBase;