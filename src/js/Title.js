/**
 * タイトル
 */

'use strict';

const Config = require('./Config');

/**
 * @class Title
 * @constructor
 * @param container {PIXI.Container} 配置するコンテナ
 */
class Title {
  constructor (container) {
    this._container = container;
    this.isMiss = false;
    this.isClear = false;
    this._inc();
  }

  /**
   * 初期化
   * @method _inc
   */
  _inc () {
    const tt = PIXI.Texture.fromFrame('title');
    const elm = new PIXI.Sprite(tt);
    const bg = new PIXI.Graphics().beginFill(0x000000).drawRect(0, 0, Config.WIDTH, Config.HEIGHT);
    bg.alpha = 0.5;
    elm.anchor.set(0.5);
    elm.position.set(Config.WIDTH_HALF, Config.HEIGHT_HALF);
    elm.scale.set(10);
    elm.alpha = 0;
    this._container.addChild(bg, elm);

    TweenMax.to(elm.scale, 0.8, {
      x: 1,
      y: 1,
      ease: Bounce.easeOut
    });

    TweenMax.to(elm, 0.8, {
      alpha: 1
    });

    setTimeout(() => {
      TweenMax.to(elm, 0.5, {
        alpha: 0,
        onComplete: () => {
          this._showDescription();
        }
      });
    }, 2000);

  }

  /**
   * 説明文
   * @method _showDescription
   */
  _showDescription () {
    const tt = PIXI.Texture.fromFrame('description');
    const elm = new PIXI.Sprite(tt);

    elm.alpha = 0;
    elm.anchor.set(0.5);
    elm.position.set(Config.WIDTH_HALF, Config.HEIGHT_HALF + 100);

    this._container.addChild(elm);

    TweenMax.to(elm, 0.5, {
      alpha: 1,
      y: '-=' + 100
    });

    setTimeout(() => {
      TweenMax.to(this._container, 0.5, {
        alpha: 0,
        onComplete: () => {
          elm.destroy();
          elm = null;
        }
      });
    }, 2000);
  }

  /**
   * テキスト表示
   * @method showText
   */
  showText (text) {

    if (text === 'miss') {
      if (this.isMiss === true) {
        return 0;
      } else {
        this.isMiss = true;
      }
    } else if (text === 'clear') {
      if (this.isClear === true) {
        return 0;
      } else {
        this.isClear = true;
      }
    }

    const tt = PIXI.Texture.fromFrame(text);
    const elm = new PIXI.Sprite(tt);

    elm.alpha = 0;
    elm.anchor.set(0.5);
    elm.position.set(Config.WIDTH_HALF, Config.HEIGHT_HALF + 100);

    this._container.addChild(elm);
    this._container.alpha = 1;

    TweenMax.to(elm, 0.5, {
      alpha: 1,
      y: '-=' + 100
    });
  }

}

module.exports = Title;
