/**
 * グリッド状に配置されるブロックを生成する
 */

'use strict';

const Config = require('./Config');
const Unit = require('./Unit');

/**
 * @class Block
 * @constructor
 * @extends Unit
 * @param texture {PIXI.Texture} テクスチャ
 * @param container {PIXI.Container} 配置するコンテナ
 * @param gridX {Number} グリッドのX座標
 * @param gridY {Number} グリッドのX座標
 * @param opts {Object} オプション
 */
class Block extends Unit {
  constructor (texture, container, gridX, gridY, opts) {
    super(texture, container, gridX, gridY, opts);
    this.isDestructible = false;
    this._setStatus();
    this._setLayer();
  }

  /**
   * オブジェクトのレイヤーを設定する
   */
  _setLayer () {
    this.elm.displayGroup = Config.fieldLayer;
    this.elm.zOrder = -this.elm.position.y;
  }

   /**
    * オブジェクトのステータスを設定する
    */
  _setStatus () {
    if (Config.blockStatus[this.gridY][this.gridX] === 1 ||
        Config.blockStatus[this.gridY][this.gridX] === 16 ||
        Config.blockStatus[this.gridY][this.gridX] === 17 ||
        Config.blockStatus[this.gridY][this.gridX] === 18 ||
        Config.blockStatus[this.gridY][this.gridX] === 19 ||
        Config.blockStatus[this.gridY][this.gridX] === 20 ||
        Config.blockStatus[this.gridY][this.gridX] === 21 ||
        Config.blockStatus[this.gridY][this.gridX] === 22 ||
        Config.blockStatus[this.gridY][this.gridX] === 23) {
      this.isDestructible = true;
    }
    Config.blockStatus[this.gridY][this.gridX] = this;
  }

  /**
   * ブロックを破壊する
   * @param {*} delay
   */
  vanish (tmpDelay) {
    const delay = tmpDelay || 0;
    Config.blockStatus[this.gridY][this.gridX] = -1;
    setTimeout(() => {
      this.elm.tint = 0xff7e1f;
      TweenMax.to(this.elm, .8, {
        alpha: 0,
        onComplete: () => {
          this.elm.destroy();
          this.elm = null;
        }
      });
    }, delay);
  }
}

module.exports = Block;
