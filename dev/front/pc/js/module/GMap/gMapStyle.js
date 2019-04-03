/**
 * スタイルの変更のためのクラス
 * @param base
 * @returns {GMapStyle}
 */
function gMapStyle(base = null) {
    class GMapStyle extends base {
        constructor (map) {
            super(map);
            this.styles = {};
        }

        /**
         * スタイルをセットする
         * @param key : スタイル名
         * @param styleArray : 設定内容
         */
        setStyle (key, styleArray) {
            this.styles[key] = styleArray;
        }

        /**
         * スタイルにさらに、設定を追加する
         * @param key : スタイル名
         * @param styleArray　: 設定内容
         */
        addStyle (key, style) {
            this.styles[key].push(style);
        }

        /**
         * スタイルを変更する
         * @param key : スタイル名
         */
        changeStyle (key) {
            this.map.setOptions({styles: this.styles[key]});
        }
    }
    return GMapStyle;
}

export default gMapStyle;