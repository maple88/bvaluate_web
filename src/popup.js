const popupDialog = function (option) {
  this.params = {};
  let uuid = randomRangeId(4);
  if (Object.prototype.toString.call(option) === '[object Object]') {
    this.params = {
      zIndex: option.zIndex,
      hideOnBlur: option.hideOnBlur,
      onOpen: option.onOpen || function () {
      },
      onClose: option.onClose || function () {
      },
      showMask: option.showMask,
      uuid: uuid,
    }
  }
  if (!!document.querySelectorAll('.fish-popup-mask').length <= 0) {
    this.divMask = document.createElement('div');
    this.divMask.className = 'fish-popup-mask';
    this.divMask.dataset.uuid = '';
    // this.divMask.href = 'javascript:void(0)';
    document.body.appendChild(this.divMask);
  }
  this.mask = document.querySelector('.fish-popup-mask');
  this._bindEvents();
};

function randomRangeId(num) {
  let returnStr = "",
    charStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < num; i++) {
    let index = Math.round(Math.random() * (charStr.length - 1));
    returnStr += charStr.substring(index, index + 1);
  }
  return returnStr;
}

popupDialog.prototype.onClickMask = function () {
  this.hide();
};

popupDialog.prototype.show = function () {
  this.mask.dataset.uuid += ',' + this.params.uuid;
  this.mask.classList.add('fish-popup-show');
  this.mask.style['zIndex'] = this.params.zIndex;
};

popupDialog.prototype.hide = function () {
  let uuid = this.mask.dataset.uuid;
  this.mask.dataset.uuid = uuid.replace(',' + this.params.uuid, '');
  if (!this.mask.dataset.uuid) {
    this.mask.classList.remove('fish-popup-show');
    this.mask.style['zIndex'] = -1
  }
  this.params.onClose();
};

popupDialog.prototype._bindEvents = function () {
  this.mask.addEventListener('click', this.onClickMask.bind(this), false);
};

export default popupDialog
