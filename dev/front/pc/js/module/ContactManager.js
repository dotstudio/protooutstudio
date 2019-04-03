import ScrollCanceler from '../util/ScrollCanceler';

class ContactManager {
  constructor() {
    this.$confirm = $('.js-confirm');
    this.$submitBtnArea = $('.p-contact__submit');
    this.$back = $('.js-back a');
    this.$submit = $('.js-submit');
    this.$form = $('form');
    this.$formWrap = $('.p-contact');
    this.$radioBtnArea = $('.c-input__radio')
  }
  init() {
    this.onClickConfirm = (e) => this._onClickConfirm(e);
    this.onClickBack = (e) => this._onClickBack(e);
    this.onClickSubmit = (e) => this._onClickSubmit(e);
    this.onChangeInput = (e) => this._onChangeInput(e);

    this.$form.on('click.contact-confirm', '.js-confirm', this.onClickConfirm);
    this.$form.on('click.contact-back', '.js-back a', this.onClickBack);
    this.$form.on('submit.contact-submit', this.onClickSubmit);
    this.$form.on('change.contact-confirm', 'input, textarea', this.onChangeInput);

    this.scrollCanceler = new ScrollCanceler();

    this.$formSelect = $('.p-contact__form-wrap select');
    let self = this;

    this.$formSelect.on('change', function (e) {
      // e.preventDefault();
      let value = $(this).val();
      $('.wpcf7').removeClass('is-active');
      $('[data-select="' + value + '"]').parents('.wpcf7').addClass('is-active');
    });

    //init
    $('[data-select="works"]').parents('.wpcf7').addClass('is-active');
    this.$formWrap.addClass('is-input');
  }

  destroy() {
    this.$form.off('click.contact-confirm');
    this.$form.off('click.contact-back');
    this.$form.off('submit.contact-submit');
    this.$form.off('change.contact-confirm');
  }
  _onSubmit(e) {}
  _onChangeInput(e) {
    this.validate(e.currentTarget, e);
  }
  _onClickConfirm(e) {
    e.preventDefault();
    let isValid = true;

    $(e.delegateTarget).find('input, textarea').each((i, elem) => {
      if (!this.validate(elem, e)) {
        isValid = false;
      }
    });
    console.log('input.is-error,textarea.is-error')
    if (!isValid) {
      let scrollTop = $('.p-contact').scrollTop() + $('input.is-error,textarea.is-error').eq(0).offset().top - 150;
      TweenMax.to('.p-contact', 0.8, {
        scrollTo: {
          y: scrollTop,
          autoKill: false
        },
        ease: Power4.easeOut
      });
      return;
    }

    this._fetchConfirm(e).then(() => {
      $('input, textarea').attr('readonly', 'readonly');
      this._changeContent(1, $(e.delegateTarget));
      console.log("fetchconfirm");
      this._setResult($(e.delegateTarget));
    });
  }
  _onClickBack(e) {
    this.$submitBtnArea.addClass('is-hide');
    this.$confirm.removeClass('is-hide');
    this.$radioBtnArea.removeClass('is-confirm');
    e.preventDefault();
    $('input, textarea').attr('readonly', false);
    $(e.delegateTarget).find('input, textarea').each((i, elem) => {
      this.validate(elem, e);
    });
    this._changeContent(0, $(e.delegateTarget));
  }
  _onClickSubmit(e) {

    console.log("clickSubmit")
    e.preventDefault();
    if (this.isFetch) return;
    this.isFetch = true;
    this._fetchSubmit(e).then(() => {
      this.isFetch = false;
      $('input, textarea').attr('readonly', false);
      window.__GLOBAL.send = true;
      this._changeContent(2, $(e.delegateTarget));
      setTimeout(() => {
        if ($('#js-contact').hasClass('is-active')) {
          $('.js-contact-toggle').eq(1).trigger('click');
        }
      }, 10000);
    }, () => {
      alert('通信エラーが発生しました。');
      this.isFetch = false;
    });

  }
  _fetchConfirm(e) {
    return new Promise((resovle, reject) => {
      console.log("fetchConfirm")
      this.$submitBtnArea.removeClass('is-hide');
      this.$confirm.addClass('is-hide');
      this.$radioBtnArea.addClass('is-confirm');

      //:TODO 接続処理を書く
      resovle();
    });
  }
  _fetchSubmit(e) {
    return new Promise((resovle, reject) => {

      console.log("fetchSubmit")
      // $.ajax({
      //   method: 'POST',
      //   url: $(e.currentTarget).attr('action'),
      //   data: $(e.currentTarget).serialize()
      // }).then((data) => {
      //   resovle();
      // }, (data) => {
      //   reject();
      // });
      resovle();
    });
  }
  _changeContent(index, $target) {

    this.$formWrap.removeClass('is-input');
    this.$formWrap.removeClass('is-confirm');
    this.$formWrap.removeClass('is-complete');

    if (index === 0) {
      this.$formWrap.addClass('is-input');
      $target.find('.c-table-form__input').removeClass('is-hide');
      $target.find('.c-table-form__result').addClass('is-hide');
      $target.find('.error').text('');
    }
    if (index === 1) {
      this.$formWrap.addClass('is-confirm');
      $target.find('.c-table-form__input').addClass('is-hide');
      $target.find('.c-table-form__result').removeClass('is-hide');
    }
    if (index === 2) {
      this.$formWrap.addClass('is-complete');
    }

  }
  // _changeFlow(index, $target){
  //   TweenMax.set($('.p-contact-flow__form, .wpcf7'), {opacity: 0});
  //   TweenMax.to($('.p-contact-flow__form, .wpcf7'), 1, {opacity: 1});
  //   this._changeContent(index, $target);
  //   $('.p-contact__flow-item').removeClass('is-current')
  //       .eq(index).addClass('is-current');
  // }

  _setResult($target) {
    console.log("setresult");
    let $input = $target.find('.c-table-form__input');
    let $result = $target.find('.c-table-form__result');
    for (let i = 0; i < $input.length; i++) {
      let $value = $input.eq(i).find('input, textarea');

      if ($value.attr('type') === 'checkbox') {
        let text = '';
        for (let j = 0; j < $value.length; j++) {
          if ($value.eq(j).prop("checked")) {
            text += this._getInputValue($value.eq(j))
          }
          $result.eq(i).html(text);
        }
        // } else if( $value.attr('type') === 'radio' ){
        //   $result.eq(i).html('個人情報保護方針に同意する');
      } else {
        $result.eq(i).html(this._getInputValue($value));
      }
    }
  }
  _getInputValue($input) {
    console.log("inputValue");
    if ($input.is('[type="radio"]')) {
      return $input.filter(':checked').val();
    } else {
      let val = '';
      for (let i = 0; i < $input.length; i++) {
        val += $input.eq(i).val() + ' ';
      }
      return val;
    }
  }
  validate(elem, e) {
    let name = elem.name;
    let type = elem.type;
    if (name === 'privacy' || name === 'contact-type') {
      $(elem).parents('.c-table-form__item').find('.c-table-form__th-inner .c-table-form__error').removeClass('is-show').text('');
    } else if (name === 'email') {
      $(elem).parents('.c-table-form__item').find('.c-table-form__th-inner .c-table-form__error').removeClass('is-show').text('');
    } else if (name === 'tel' || name === 'tel-1' || name === 'tel-2' || name === 'tel-3') {
      $(elem).parents('.c-table-form__item').find('.c-table-form__th-inner .c-table-form__error').removeClass('is-show').text('');
    } else if (name === 'message') {
      $(elem).parents('.c-table-form__item').find('.c-table-form__th-inner .c-table-form__error').removeClass('is-show').text('');
    } else {
      $(elem).parents('.c-table-form__item').find('.c-table-form__th-inner .c-table-form__error').removeClass('is-show').text('');
      $(elem).parents('.c-table-form__item').find('.c-table-form__th-inner .c-table-form__error').removeClass('is-show').text('');
    }

    //required
    if ($(elem).attr('aria-required') === 'true') {

      if (name === 'privacy') {
        if (!$(elem).prop("checked")) {
          $(elem).parents('.c-table-form__item').find('.c-table-form__th-inner .c-table-form__error').addClass('is-show').text('この項目は必須です');
          return false;
        }
      }

      if (!$(elem).val()) {
        $(elem).addClass('is-error');
        if (name === 'privacy' || name === 'contact-type') {
          $(elem).parents('.c-table-form__item').find('.c-table-form__th-inner .c-table-form__error').addClass('is-show').text('この項目は必須です');
        } else if (name === 'email') {
          $(elem).parents('.c-table-form__item').find('.c-table-form__th-inner .c-table-form__error').addClass('is-show').text('この項目は必須です');
        } else if (name === 'tel' || name === 'tel-1' || name === 'tel-2' || name === 'tel-3') {
          $(elem).parents('.c-table-form__item').find('.c-table-form__th-inner .c-table-form__error').addClass('is-show').text('この項目は必須です');
        } else if (name === 'message') {
          $(elem).parents('.c-table-form__item').find('.c-table-form__th-inner .c-table-form__error').addClass('is-show').text('この項目は必須です');
        } else {
          $(elem).parents('.c-table-form__item').find('.c-table-form__th-inner .c-table-form__error').addClass('is-show').text('この項目は必須です');
        }
        $(elem).parents('.c-table-form__td-inner').addClass('is-error');
        return false;
      }
    }

    //カナ
    if (name === 'family-kana' || name === 'first-kana') {
      if (!this.isKana(elem.value)) {
        $(elem).addClass('is-error');
        $(elem).parents('.c-table-form__item').find('.c-table-form__th-inner .c-table-form__error').addClass('is-show').text('カタカナで入力してください');
        return false;
      }
    }

    //メール
    if (name === 'email') {
      if (!this.isEmail(elem.value)) {
        $(elem).addClass('is-error');
        $(elem).parents('.c-table-form__item').find('.c-table-form__th-inner .c-table-form__error').addClass('is-show').text('メールアドレスを正しく入力してください');
        return false;
      }
    }

    //電話番号
    if (name === 'tel') {
      if (!this.isTel(elem.value)) {
        $(elem).addClass('is-error');
        $(elem).parents('.c-table-form__item').find('.c-table-form__th-inner .c-table-form__error').addClass('is-show').text('電話番号を入力してください');
        return false;
      }
    }

    $(elem).removeClass('is-error');
    return true;
  }
  isKana(value) {
    return value.match(/^[\u30A0-\u30FF]+$/);
  }
  isTel(val) {
    let val1 = val.match(/^0\d{1,4}-\d{1,4}-\d{3,4}$/);
    let val2 = val.match(/^\d{7,13}$/);
    if (!val1 && !val2) return false;
    return true;
  }
  isEmail(val) {
    return val.match(/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i);
  }
  isMatch(val1, val2) {
    if (val1 === val2) return true;
    return false;
  }
}

export default ContactManager;
