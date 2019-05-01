/**
 * グリッド状に配置される爆弾を生成する
 * 一定時間後に爆発する
 */

'use strict';

// ================
//     MODULE
// ================

const Config = require('./Config');
const Block  = require('./Block');

/**
 * @class Bomb
 * @constructor
 * @extends Block
 * @param texture {PIXI.Texture} テクスチャ
 * @param container {PIXI.Container} 配置するコンテナ
 * @param gridX {Number} グリッドのX座標
 * @param gridY {Number} グリッドのX座標
 * @param opts {Object} オプション
 */
class Bomb extends Block {
  constructor (texture, container, gridX, gridY, opts) {
    super(texture, container, gridX, gridY, opts)
    this.strength = 4;
    this.isExploded = false;
    this._bombAnimation();
  }

  /**
   * 一定時間アニメーションさせる
   * @method _bombAnimation
   */
  _bombAnimation () {
    this._tween = TweenMax.to(this.elm.scale, .5, {
      x: 0.9,
      y: 0.9,
      repeat: -1,
      yoyo: true,
      ease: SteppedEase.config(1)
    });
    setTimeout(() => {
      this.explosion();
    }, Bomb.DURATION);
  }


  /**
   * 爆発させる
   * @method explosion
   */
  explosion () {

    let flags;
    const FLAG_CONTINUE = 1; // 爆風が続くかどうか
    const FLAG_DESTROY  = 2; // 爆風で破壊するかどうか
    const blasts = []; // 爆風ユニット
    const tt = PIXI.Texture.fromFrame('explosion-0');
    const explosionContainer = new PIXI.Container();

    /**
     * 任意のグリッド上の状態をチェック
     * @function checkUnit
     */
    const checkUnit = (x, y) => {
      let mask = 0;

      if (0 <= x && x < Config.HORIZONTAL_UNIT &&
          0 <= y && y < Config.VERTICAL_UNIT) {

        for (let i = 0; i < Config.enemys.length; i++) {
          if (Config.enemys[i].gridX === x && Config.enemys[i].gridY === y) {
            Config.enemys[i].miss();
          }
        }

        if (Config.player.gridX === x && Config.player.gridY === y) {
          Config.player.miss();
        }

        if (Config.blockStatus[y][x] === -1) {
          mask |= FLAG_CONTINUE;
          return mask;
        } else  if (Config.blockStatus[y][x].isDestructible) {
          mask |= FLAG_DESTROY;
          return mask;
        } else if (Config.blockStatus[y][x].constructor === Bomb) {
          Config.blockStatus[y][x].explosion();
        }
      }
      return mask;
    };

    /**
     * 爆発してない場合のみ爆発させる
     */
    if (this.isExploded) {
      return 0;
    } else {
      this.isExploded = true;
    }

    Config.player.numOfBomb++;
    Config.blockStatus[this.gridY][this.gridX] = 0;

    this._tween.pause();
    this.vanish();

    /**
     * 上下左右に爆風を伸ばす
     */
    for (let i = 0; i < 4; i++) {
      blasts[i] = [];
      for (let j = 1; j <= this.strength; j++) {
        const x = i === 0 ? this.gridX - j:
                  i === 1 ? this.gridX:
                  i === 2 ? this.gridX + j:
                  i === 3 ? this.gridX:
                  0;
        const y = i === 0 ? this.gridY:
                  i === 1 ? this.gridY - j:
                  i === 2 ? this.gridY:
                  i === 3 ? this.gridY + j:
                  0;

        blasts[i][j] = 0;

        flags = checkUnit(x, y);

        if ((flags & FLAG_DESTROY) != 0) {
          Config.blockStatus[y][x].vanish();
        }
        if ((flags & FLAG_CONTINUE) != 0) {
          blasts[i][j] = new Block(tt, explosionContainer, x, y);
          blasts[i][j].vanish(500);
        } else {
          break;
        }
      }
    }

    /**
     * 爆風スプライトを一定時間後に消去
     */
    this._container.addChild(explosionContainer);
  }
}

Bomb.DURATION = 3000;

module.exports = Bomb;
