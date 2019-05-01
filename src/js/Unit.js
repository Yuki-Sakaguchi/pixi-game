/**
 * グリッド状に配置されるオブジェクトを生成する
 */

'use strict';

const Config = require('./Config');

/**
 * @class Unit
 * @constructor
 * @param texture {PIXI.Texture} テクスチャ
 * @param container {PIXI.Container} 配置するコンテナ
 * @param gridX {Number} グリッドのX座標
 * @param gridY {Number} グリッドのX座標
 * @param opts {Object} オプション
 */
class Unit {
  constructor (texture, container, gridX, gridY, opts) {
    this.gridX      = gridX;
    this.gridY      = gridY;
    this._texture   = texture;
    this._container = container;
    this.opts = opts || {};

    this.elm = new PIXI.Sprite(this._texture);
    this.elm.anchor.set(0.5, 1);
    this.elm.position.set(Config.UNIT_SIZE_X * this.gridX + Config.UNIT_SIZE_X / 2, Config.UNIT_SIZE_Y * (this.gridY + 1));
    this._container.addChild(this.elm);
  }

  /**
   * テクスチャをセットする
   * @param {*} texture
   */
  setTexture (texture) {
    this.elm.texture = texture;
  }
}

module.exports = Unit;
