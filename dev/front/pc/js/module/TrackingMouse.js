class TrackingMouse{
    constructor(){
        this.$window = $(window);
        this.$body = $('body');
        this.$cursor = $('#js-cursor');
        this.$outer = $('#js-cursor-outer');
        this.svg = document.querySelector("#js-cursor-outer");
        this.cursorW = this.$cursor.width() / 2;
        this.cursorH = this.$cursor.height() / 2;
        this.outerW = this.$outer.width() / 2;
        this.outerH = this.$outer.height() / 2;
        this.$target;
        this.loadFlg = false;
        this.firstFlg = false;
        this.mouse = {
            hover: false,
            pull: false
        };
        this.tm = {
            x: 0,
            y: 0
        };
        this.om = {
            x: 0,
            y: 0,
            scale: 1
        };

        this.init();
    }
    init(){
        this.$window.on('mousemove',this.onMousemove);
    }
    onMousemove(e){
        if(!this.firstFlg){
            this.firstFlg = true;
            this.$body.addClass('is-mouse-on');
        }
        if(this.loadFlg) return;
        this.$target = $(e.target);
        if(this.$target.hasClass("js-hit") || this.$target.hasClass("js-hit-sound")){
            this.mouse.state = true;
            this.onHover();
        } else {
            this.mouse.state = false;
            this.offHover();
        }

        if(this.$target.hasClass("js-sns-hit")){
            this.target = e.target;
            this.mouse.pull = true;
        } else {
            this.target = e.target;
            this.mouse.pull = false;
        }
    }
    onLoading(){
        this.$outer.addClass('is-loading');
    }
    offLoading(){
        this.$outer.removeClass('is-loading');
    }
    onHover(){
        this.$cursor.addClass('is-hover');
        this.$outer.addClass('is-hover');
    }
    offHover(){
        this.$cursor.removeClass('is-hover');
        this.$outer.removeClass('is-hover');
    }
    startLoad(){
        this.loadFlg = true;
        this.offHover();
        this.onLoading();
    }
    endLoad(){
        this.loadFlg = false;
        this.offLoading();
    }
    update(){
        this.tm.x += (window.__GLOBAL.mouse.x - this.tm.x);
        this.tm.y += (window.__GLOBAL.mouse.y - this.tm.y);
        this.om.x += (window.__GLOBAL.mouse.x - this.om.x) * 0.1;
        this.om.y += (window.__GLOBAL.mouse.y - this.om.y) * 0.1;
        this.render();

        // if(!this.mouse.pull) return;
        // if(this.firstFlg) return;
        // this.firstFlg = true;
        // console.log('x:' + window.__GLOBAL.mouse.x);
        // console.log('y:' +window.__GLOBAL.mouse.y);
        // let rect = this.target.getBoundingClientRect();
        // console.log(rect);
        // let centerX = rect.x + (rect.width / 2);
        // let centerY = rect.y + (rect.height / 2);
        // console.log(centerX,centerY);

        // let target = current.targets[i];
        // target.x = ((window.__GLOBAL.mouse.x - this.winHw) / this.winHw) * 100 * target.delay;
        // target.dx += (target.x - target.dx) * 0.01;
        // target.y = ((window.__GLOBAL.mouse.y - this.winHh) / this.winHh) * 30 * target.delay;
        // target.dy += (target.y - target.dy) * 0.01;
        // TweenLite.set(target.target,{
        //     x: target.dx,
        //     y: target.dy
        // });
        // TweenLite.set(target.targetImage,{
        //     x: target.dx * 0.5,
        //     y: target.dy * 0.5
        // });


    }
    render(){
        // TweenLite.set(this.$cursor,{x: this.tm.x - this.cursorW,y: this.tm.y - this.cursorH});
        // TweenLite.set(this.$outer,{x: this.om.x - this.outerW,y: this.om.y - this.outerH});
    }
}

export default TrackingMouse;
