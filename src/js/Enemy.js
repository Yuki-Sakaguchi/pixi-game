/**
 * プレイアブルキャラクターを生成する
 */

'use strict';

const Config    = require('./Config');
const Character = require('./Character');

/**
 * @class Enemy
 * @constructor
 * @extends Character
 * @param name {String} キャラクター名
 * @param container {PIXI.Container} 配置するコンテナ
 * @param gridX {Number} グリッドのX座標
 * @param gridY {Number} グリッドのX座標
 * @param opts {Object} オプション
 */
class Enemy extends Character {
  constructor (name, container, gridX, gridY, opts) {
    super(name, container, gridX, gridY, opts);
    this._frame = 0;
    this._frameOffset =  + Math.floor(Math.random() * 30);
  }

  /**
 * control
 * @method control
 */
  control () {
    this.touch();
    if (this._frame < 30 + this._frameOffset) {
      this.move('down');
    } else if (this._frame < 60 + this._frameOffset) {
      this.move('left');
    } else if (this._frame < 90 + this._frameOffset) {
      this.move('up');
    } else if (this._frame < 120 + this._frameOffset) {
      this.move('right');
    } else {
      this._frame = 0;
    }
    this._frame++;
  }

  touch() {
    if (Config.player.gridX === this.gridX && Config.player.gridY === this.gridY) {
      Config.player.miss();
    }
  }
};

module.exports = Enemy;
