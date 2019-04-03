
// js-videoクラスをつけた要素のdata-videoパスを取得してロード
class VideoLoader{
    constructor(videoClass){
        this.videoArray = [];
        this.target = document.querySelector(videoClass);
        this.init(video);
    }
    init(){
        let i = 0;
        for(i = 0; i < this.target.length; i++){
            this.videoArray({
               element: this.target[i],
               path: this.target[i].getAttribute('data-video')
            });
        }
    }
    load(videoPath){
        return new Promise((resolve,reject) => {
            let video = document.createElement('video');
            video.addEventListener('canplay', () => {
                resolve(video);
            });
            video.src = videoPath;
        });
    }
    allLoaded(){
        return new Promise((resolve,reject) => {
            let i = 0;
            for(i = 0; i < this.target.length; i++){
                this.load()
                this.videoArray({
                    element: this.target[i],
                    path: this.target[i].getAttribute('data-video')
                });
            }
            Promise.all().then(() => {

            });
        });
    }
}

export default VideoLoader;
