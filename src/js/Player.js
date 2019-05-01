/**
 * プレイアブルキャラクターを生成する
 */

'use strict';

const Config    = require('./Config');
const Character = require('./Character');
const Bomb      = require('./Bomb');

/**
 * @class Player
 * @constructor
 * @extends Character
 * @param name {String} キャラクター名
 * @param container {PIXI.Container} 配置するコンテナ
 * @param gridX {Number} グリッドのX座標
 * @param gridY {Number} グリッドのX座標
 * @param opts {Object} オプション
 */
class Player extends Character {
  constructor (name, container, gridX, gridY, opts) {
    super(name, container, gridX, gridY, opts);
    this.numOfBomb = Player.INITIAL_BOMBS;
  }

  bomb () {
    if (this.numOfBomb > 0) {
      if (Config.blockStatus[this.gridY][this.gridX] <= 0) {
        this.numOfBomb--;
        const tt   = PIXI.Texture.fromFrame('bomb-0');
        const bomb = new Bomb(tt, this._container, this.gridX, this.gridY);
      }
    }
  }
}

Player.INITIAL_BOMBS = 12; // 初期爆弾数

module.exports = Player;
