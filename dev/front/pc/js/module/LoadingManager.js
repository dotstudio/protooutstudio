import UtilLoader from '../util/loader/_UtilLoader';

class OpeningLoader{
    constructor(){
        this.index = 0;
        this.isEndFlag = [false];
    }
    update(progress){
        let pg = progress;
        let floor = Math.floor(pg);
        console.log(pg);

    }
    isEnd(){

    }
    updateLineView(pg, floor){
        let frag = true;
    }
    endView(){

    }
}


//ローディングを制御する
class LoadingManager {
    constructor(target){
        this.target = target;
        this.count = 0;
        this.onLoop = (resolve) => this._onLoop(resolve);
        this.onProgress = (prog) => this._onProgress(prog);
        this.init();
}
    init(){
        this.loader = new UtilLoader(this.target);
    }
    firstLoad(){
        this.openingLoader = new OpeningLoader();
        let promises = [this.load(), this.start()];
        let promise = new Promise((resolve, reject) => {
            Promise.all(promises).then(() => {
                resolve();
            });
        });
        return promise;
    }
    load(){
        let promise = new Promise((resolve, reject) => {
            this.loader.load(this.progress).then(() => {
                resolve();
            });
        });
        return promise;
    }
    start(){
        let promise = new Promise((resolve, reject) => {
            this.startTime = performance.now();
            this.onLoop(resolve);
        });
        return promise;
    }
    end(resolve){
        if(this.rafID){
            cancelAnimationFrame(this.rafID);
            this.openingLoader.endView();
            resolve();
            return;
        }
    }
    _onLoop(resolve){
        let progress = this.loader.getProgress();
        let time = performance.now() - this.startTime;
        let count = Math.floor(time / 500);
        if(count !== this.count){
            this.openingLoader.update(progress);
            if(this.openingLoader.isEnd()) {
                console.log(progress);
                this.end(resolve);
                return;
            }
        }
        this.count = count;
        this.rafID = requestAnimationFrame(this.onLoop.bind(this, resolve));
    }
    //ローディング中に実行される
    _onProgress(prog){
    }
    //ローディング終了時に実行される
    _onEnd(prog){
    }
}

export default LoadingManager;
