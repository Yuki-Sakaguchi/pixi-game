/**
 * @fileoverview BOMBER MAID
 */

'use strict';

require('pixi.js');
require('pixi-display');
require('./lib/TweenMax.min.js');

const Config = require('./Config');
const Player = require('./Player');
const Stage = require('./Stage');
const Scene = require('./Scene');
const Enemy = require('./Enemy');
const Title = require('./Title');


/**
 * @namespace
 */
const BOMBER_MAID = BOMBER_MAID || {};


/**
 * @namespace BOMBER_MAID_OBJECT
 * @memberof BOMBER_MAID
 */
BOMBER_MAID.BOMBER_MAID_OBJECT = {
  init() {

    // キー入力の保存
    this.keyStatus = [];
    for (let i = 0; i < Config.KEY_QTY; i++) {
      this.keyStatus.push(false);
    }

    /**
     * キーボードが押されたイベント
     */
    document.addEventListener('keydown', e => {
      this.keyStatus[e.keyCode] = true;
    });

    document.addEventListener('keyup', e => {
      this.keyStatus[e.keyCode] = false;
    });

    /**
     * 画像の読み込み
     */
    const loader = new PIXI.loaders.Loader();
    loader
    .add('sprite', '../images/sprite.json')
    .once('complete', () => {

      /**
       * ステージ生成、レイヤー追加
       */
      let sceneContainer, titleContainer;
      this.stage = new Stage();
      sceneContainer = this.stage.addContainer(sceneContainer);
      titleContainer = this.stage.addContainer(titleContainer);
      titleContainer.displayGroup = Config.OverlayLayer;
      sceneContainer.position.set(-Config.UNIT_SIZE_X / 2, 0);

      /**
       * シーンを作成
       */
      this.scene = new Scene(sceneContainer);

      /**
       * タイトル
       */
      this.title = new Title(titleContainer);

      /**
       * キャラクター追加
       */
      Config.player = new Player('player', sceneContainer, 2, 2);

      /**
       * 敵追加
       */
      Config.enemys = [];
      Config.enemys.push(new Enemy('enemy', sceneContainer, 18, 2));
      Config.enemys.push(new Enemy('enemy', sceneContainer, 10, 8));

      // メインループを実行
      this.mainLoop();
    });

    /**
     * 読み込む
     */
    loader.load();
  },

  /**
   * メインループ
   */
  mainLoop () {
    const tick = () => {
      this.stage.rendering();

      if (this.keyStatus[Config.KEY_LEFT]) {
        Config.player.move('left');
      }
      if (this.keyStatus[Config.KEY_UP]) {
        Config.player.move('up');
      }
      if (this.keyStatus[Config.KEY_RIGHT]) {
        Config.player.move('right');
      }
      if (this.keyStatus[Config.KEY_DOWN]) {
        Config.player.move('down');
      }
      if (this.keyStatus[Config.KEY_SPACE]) {
        Config.player.bomb();
      }

      for (let i = 0; i < Config.enemys.length; i++) {
        Config.enemys[i].control();
        if (Config.enemys[i].elm === null) {
          Config.enemys.splice(i, 1);
        }
      }

      if (Config.player.elm === null) {
        this.title.showText('miss');
      }

      if (Config.enemys.length === 0) {
        this.title.showText('clear');
      }

      requestAnimationFrame(tick);
    }
    tick();
  }
};

// 処理開始
BOMBER_MAID.BOMBER_MAID_OBJECT.init();
