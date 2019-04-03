import ImageLoader from './_ImageLoader';

let noop = () => {};

/**
 * UtilLoader
 * targetのdata-srcのpathをチェックして、progressを返す
 */
class UtilLoader {
    constructor(target, src){
        this.count = 0;
        //imageを読み込んでprogressを返すもジール
        this.imageLoader = new ImageLoader(target, src);
        this.resolve = null;
        this.animation = this.animation.bind(this);
    }
    load(_callback){
        let callback = _callback || noop;
        let promise = new Promise((resolve) => {
            this.resolve = resolve;
            this.animation(callback);
        });
        return promise;
    }
    animation(callback){
        this.update(this.imageLoader.getProgress());
        callback(this.count);
        if(this.count >= 1){
            this.resolve();
            cancelAnimationFrame(() => {
                this.animation(callback);
            });
            return;
        }
        requestAnimationFrame(() => {
            this.animation(callback);
        });
    }
    update(progress){
        if(this.count >= 1){
            this.count = 1;
            return;
        }
        if(progress >= this.count){
            this.count += progress;
        }
    }
    getProgress(){
        return this.count;
    }
}

export default UtilLoader;
