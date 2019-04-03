import ScrollCanceler from '../ScrollCanceler';

/**
 * イメージのプリロードを行う
 * ページ内のimgのsrc全てをチェックする
 * pathで追加のイメージを指定できる
 * @param target {string}
 * @param path {Array<string>}
 * @param callback {function}
 */
let noop = () => {};

class ImageLoader {
    constructor(target, path, callback){
        this.$img = document.querySelectorAll(target ? target : 'img');
        this.imgSrc = path || [];
        this.callback = callback || noop;
        this.totalLength = 0;
        this.prog = 0;
        this.scrollCanceler = new ScrollCanceler();
        this.$openingLine = $('#js-opening-line');
        this.$percent = $('#js-percent');
        this.init();
    }
    init(){

        this.tween = TweenMax.fromTo(this.$openingLine,1,{
            x: '100%'
        },{
            x: '-100%',
            repeat: -1,
            yoyo: false,
            ease: Power3.easeOut
        });

        //イメージのsrcを取得
        for(let i = 0; i < this.$img.length; i++){
            this.imgSrc.push(this.$img[i]);
        }
        this.totalLength = this.imgSrc.length;
        this.load(this.imgSrc);
        if(this.imgSrc.length <= 0){
            this.prog = 1;
        }
    }
    //イメージのロード
    load(images){
        //イメージを保持
        let $images = images;
        //パスの数だけ処理を行う
        $images.forEach((element, index, array) => {
            let src = this.getSrc(element); //イメージのパス
            let image = new Image();
            image.src = __GLOBAL.BASE_PATH + src;
            image.onload = () => {
                this.setImagePath(element);
                $images = $images.filter((element) => {
                    let target = this.getSrc(element);
                    return target !== src;
                });
                this.progress(this.totalLength, this.totalLength - $images.length);
            };
            image.onerror = () => {
                $images = $images.filter((element) => {
                    let target = this.getSrc(element);
                    return target !== src;
                });
                this.progress(this.totalLength, this.totalLength - $images.length);
            };
        });
    }
    /**
     * パスの取得
     * @param element
     * @returns { string }
     */
    getSrc(element){
        if(typeof element === 'string'){
            return element;
        }else if(element.getAttribute('data-src')){
            return element.getAttribute('data-src');
        }else{
            return element.src;
        }
    }
    /**
     * DOMにパスをセットする
     * @param element
     */
    setImagePath(element){
        if(typeof element.tagName === 'undefined'){
            return;
        }
        if(element.tagName === 'IMG'){
            element.src = this.getSrc(element);
        }else if(element.tagName){
            element.style.backgroundImage = `url(${this.getSrc(element)})`;
        }
    }
    //読み込み状況をチェックして、それに応じてコールバックを実行する
    progress(total, loaded){
        this.prog = loaded / total;
        this.callback(this.prog);
        this.$percent.html(this.prog * 100);
        if(this.prog === 1){
            if(window.__GLOBAL.isFirst){
                //初期ロード時
                window.__GLOBAL.isFirst = false;
                this.tween.pause();
                TweenMax.to(this.$openingLine,1,{
                    x: '0%',
                    ease: Power3.easeOut,
                    onComplete: () => {
                        window.scrollTo(0,0);
                        $('body').addClass('is-first');
                        setTimeout(() => {
                            $('body').addClass('is-first-harf');
                            setTimeout(() => {
                                this.scrollCanceler.arrow();
                            },2000);
                        },1000);
                    }
                });
            } else {
                //通常遷移時
            }
        }
    }
    /**
     * 現在の進捗を取得 0 〜 1
     * @returns {number|*}
     */
    getProgress(){
        return this.prog;
    }
}

export default ImageLoader;
