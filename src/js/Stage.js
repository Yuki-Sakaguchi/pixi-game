/**
 * @fileoverview Stage
 */

'use strict';

const Config = require('./Config');


/**
 * ステージ生成
 * @constructor
 */
class Stage {
  constructor () {
    PIXI.utils.skipHello();
    this._generateRoot();
  }

  /**
   * ステージの生成
   */
  _generateRoot () {
    this._rootContainer = new PIXI.Container();
    this._rootContainer.displayList = new PIXI.DisplayList();

    Config.fieldLayer = new PIXI.DisplayGroup(0, true);
    Config.OverlayLayer = new PIXI.DisplayGroup(1, true);

    this._renderer = PIXI.autoDetectRenderer(Config.WIDTH, Config.HEIGHT, {
      transparent: true,
      antialias:   true
    });

    document.getElementById(Stage.STAGE_HTML_ID).appendChild(this._renderer.view);
  }

  /**
   * 画面の描画
   */
  rendering () {
    this._renderer.render(this._rootContainer);
  }

  /**
   * コンテナを追加
   */
  addContainer (container) {
    container = new PIXI.Container();
    this._rootContainer.addChild(container);
    return container;
  }
}

// クラス変数追加
Stage.STAGE_HTML_ID = 'stage'

module.exports = Stage;
