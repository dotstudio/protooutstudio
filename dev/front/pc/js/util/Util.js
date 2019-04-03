export default class Util{
    constructor(){}
    /**
     * オプションと渡したオブジェクトの継承
     * @param target 渡したオプションでsource上書き
     * @param source 継承前のオブジェクト
     * @return target 継承後のオブジェクト
     */
    extend(target,source){
        if(!target) return source; //上書きするオブジェクトがない場合はそのまま返す
        for(let key in source){
            target[key] = source[key];
        }
        return target;
    }
    /**
     * querySelectorAllで取得したクラスの削除
     * @param target querySelectorAllで取得したelement
     * @param currentName 削除したいクラス名
     */
    removeClass(target,currentName){
        for(let i = 0; i < target.length; i++){
            target[i].classList.remove(currentName);
        }
    }
    /**
     * querySelectorAllで取得したクラスの追加
     * @param target querySelectorAllで取得したelement
     * @param currentName 追加したいクラス名
     * @param currentPage 遷移先のページID
     */
    addClass(target,currentName,currentPage){
        for(let i = 0; i < target.length; i++){
            if(target[i].dataset.page === currentPage){
                target[i].classList.add(currentName);
            }
        }
    }
    radian (degree) {
        return degree * Math.PI / 180
    }
    degree (radian) {
        return radian / Math.PI / 180
    }
    smoothStep(min, max, val){
        if(val < min) return 0;
        if(val > max) return 1;
        return (val - min) / (max - min);
    }
    wait(time) {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, time);
        });
    }
};