class Audio{
    constructor(){
        this.target = document.getElementById('js-audio');

        this.feedIn = (time) => this._feedIn(time);
        this.feedOut = (time) => this._feedOut(time);
        this.play = () => this._play();
        this.pause = () => this._pause();
        this.onVisibilityChange = () => this._onVisibilityChange();

        __GLOBAL.emitter.on('audioFeedIn', this.feedIn);
        __GLOBAL.emitter.on('audioFeedOut', this.feedOut);
        __GLOBAL.emitter.on('audioPlay', this.play);
        __GLOBAL.emitter.on('audioPause', this.pause);

        this.DURATION = 1;
        document.addEventListener("visibilitychange", this.onVisibilityChange, false);
    }
    _onVisibilityChange(){
        if(document.hidden){
            this.hiddenFlg = false;
            this.pause();
        } else {
            this.hiddenFlg = true;
            if(window.__GLOBAL.mute) return;
            this.play();
        }
    }
    init(){
        return new Promise((resolve,reject) => {
            this.target.addEventListener('canplay',() => {
                resolve();
            });
        });
    }
    _play(){
        if(window.__GLOBAL.isSP) return;
        if(window.__GLOBAL.currentPage === 'index'){
            let time = $('#js-top-mv')[0].currentTime;
            $('#js-audio')[0].currentTime = time;
        }
        this.target.play();
    }
    _pause(){
        if(window.__GLOBAL.isSP) return;
        if(window.__GLOBAL.currentPage === 'index'){
            let time = $('#js-top-mv')[0].currentTime;
            $('#js-audio')[0].currentTime = time;
        }
        this.target.pause();
    }
    _feedOut(time){
        if(window.__GLOBAL.mute || window.__GLOBAL.isSP) return;
        TweenMax.to(
            { prop: 0.5 },
            this.DURATION,
            {
                prop: 0.2,
                onUpdate: ( tween ) => {
                    this.target.volume = tween.target.prop;
                },
                onUpdateParams: [ "{self}" ]
            }
        );
    }
    _feedIn(time){
        if(window.__GLOBAL.mute || window.__GLOBAL.isSP) return;
        // this.target.currentTime = time;
        TweenMax.to(
            { prop: 0.2},
            this.DURATION,
            {
                prop: 0.5,
                onUpdate: ( tween ) => {
                    this.target.volume = tween.target.prop;
                },
                onUpdateParams: [ "{self}" ]
            }
        );
    }
}


export default Audio;