/**
 * @class Scene
 */

'use strict';

const Config = require('./Config');
const Unit = require('./Unit');
const Block = require('./Block');

class Scene {
  constructor (container) {
    this._container = container;
    this._ttBase = [];
    this._ttBlock = [];
    this.blocks = [];

    for (let i = 0; i < Config.NUMBER_OF_BASECHIP; i++) {
      this._ttBase.push(PIXI.Texture.fromFrame('base-' + i));
    }

    for (let i = 0; i < Config.NUMBER_OF_BLOCKCHIP; i++) {
      this._ttBlock.push(PIXI.Texture.fromFrame('block-' + i));
    }

    this._showMap();
    this._showBlock();
  }

  /**
   * 地面を描画
   */
  _showMap () {
    for (let i = 0; i < Config.VERTICAL_UNIT; i++) {
      for (let j = 0; j < Config.HORIZONTAL_UNIT; j++) {
        if (Config.baseStatus[i][j] >= 0) {
          Config.baseStatus[i][j] = new Unit(this._ttBase[Config.baseStatus[i][j]], this._container, j, i);
        }
      }
    }
  }

  /**
   * ブロックを描画
   */
  _showBlock () {
    for (let i = 0; i < Config.VERTICAL_UNIT; i++) {
      for (let j = 0; j < Config.HORIZONTAL_UNIT; j++) {
        if (Config.blockStatus[i][j] >= 0) {
          Config.blockStatus[i][j] = new Block(this._ttBlock[Config.blockStatus[i][j]], this._container, j, i);
        }
      }
    }
  }
}

module.exports = Scene;
