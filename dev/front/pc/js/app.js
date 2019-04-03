import Util from './util/Util';
import Emitter from './util/Emitter';
import ScrollCanceler from './util/ScrollCanceler';
import BaseController from './controller/BaseController';
import CommonController from './controller/CommonController';
import IndexController from './controller/IndexController';
import BaseView from './view/BaseView';

window.__GLOBAL = {
  currentPage: '',
  BASE_PATH: '',
  root: '/',
  PATH: '',
  isFirst: true,
  emitter: new Emitter(),
  UA: new UAParser().getResult(),
  mouse: {
    x: 0,
    y: 0
  },
  scrollCanceler: new ScrollCanceler(),
  Util: new Util()
};

if (location.href.match('preview.uniel.jp/')) {
  window.__GLOBAL.BASE_PATH = '/protoout-silent/pc/';
  window.__GLOBAL.root = '/protoout-silent/pc/';
  window.__GLOBAL.PATH = '/protoout-silent/pc';
  page.base('/protoout-silent/pc');
}else if(location.href.match('preview.uniel.jp/')) {
  window.__GLOBAL.BASE_PATH = '/protoout-silent/pc/';
  window.__GLOBAL.root = '/protoout-silent/pc/';
  window.__GLOBAL.PATH = '/protoout-silent/pc';
  page.base('/protoout-silent/pc');
}

const name = window.__GLOBAL.UA.browser.name;
const $body = $('body');
const commonController = new CommonController();
const baseView = new BaseView('#js-container', '#js-next-container');

new BaseController('/', commonController, new IndexController(), baseView);

page({
  popstate: false,
  click: false
});
