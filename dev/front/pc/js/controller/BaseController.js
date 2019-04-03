import ScrollCanceler from '../util/ScrollCanceler';
import PageModel from '../model/PageModel';

class BaseController {
  constructor(path, commonController, pageController, view) {
    this.$body = $('body');
    this.path = path;
    this.commonController = commonController;
    this.pageController = pageController;
    this.currentPage = '';
    this.view = view;
    this.pageModel = new PageModel();
    this.cache = {};
    this.scrollCanceler = new ScrollCanceler();
    this._init();
  }

  _init() {
    //ページ遷移時の処理
    page(this.path, (ctx) => {
      //キャッシュがあるか確認
      let hasCache = typeof this.cache[ctx.canonicalPath] !== 'undefined';
      //初回の接続の場合
      if (ctx.init && !hasCache) {
        if (ctx.init) {
          this.commonController.onInit();
          this.pageController.onInit();
        }
        this.startControll(ctx);
        this.cache[ctx.canonicalPath] = document.innerHTML;
        return;
      }

      //キャッシュが無い場合
      if (!hasCache) {
        this.pageModel.fetch(ctx.canonicalPath).then((res) => {
          this.cache[ctx.canonicalPath] = res;
          this._render(ctx).then(() => this.startControll(ctx));
        });
        return;
      }

      //キャッシュがある場合
      this._render(ctx).then(() => this.startControll(ctx));
    });
    //ページから離れるときの処理
    page.exit(this.path, (ctx, next) => {
      this.endControll(ctx);
      next();
    });
  }
  //描画処理
  _render(ctx) {
    return new Promise((resolve) => {
      this.view.render(this.cache[ctx.canonicalPath]);
      this.view.changeView();
      resolve();
    });
  }
  startControll(ctx) {
    this.commonController.onFetchStart(ctx).then(() => {
      this.pageController.onFetchStart().then(() => {

      });
    });
  }
  endControll(ctx) {
    this.commonController.onExit(ctx).then(() => {
      this.pageController.onExit();
    });
  }
}


export default BaseController;
