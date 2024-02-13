// simulationEngine.js
// このモジュールは、仮想環境内でのロボットのシミュレーションを実行します。
// This module runs the simulation of the robot in a virtual environment.

const RobotController = require('./robotController.js');
const fs = require('fs');

class SimulationEngine {
  constructor() {
    this.robotController = new RobotController();
    this.obstacles = this.loadObstacles();
    this.isRunning = false;
  }

  // JSONファイルから障害物を読み込む（obstacles.jsonファイルがあると仮定）
  // Load obstacles from a JSON file (assuming there's an obstacles.json file)
  loadObstacles() {
    try {
      const data = fs.readFileSync('obstacles.json', 'utf8');
      return JSON.parse(data);
    } catch (err) {
      console.error("障害物の読み込みに失敗しました:", err);
      return [];
    }
  }

  // シミュレーションを開始する
  // Start the simulation
  start() {
    this.isRunning = true;
    console.log("シミュレーションを開始しました。");
    this.runLoop();
  }

  // メインのシミュレーションループ
  // Main simulation loop
  runLoop() {
    const deltaTime = 0.1; // シミュレーションの時間ステップ（秒）

    setInterval(() => {
      if (!this.isRunning) {
        return;
      }

      // 移動コマンドの例
      this.robotController.setSpeed(2); // ロボットの速度を設定
      this.robotController.move(deltaTime); // ロボットを移動

      // 障害物をチェック
      const hasObstacle = this.robotController.checkForObstacles(this.obstacles);
      if (hasObstacle) {
        console.log("障害物を検出。シミュレーションを停止します。");
        this.stop();
      }

      // UIを更新するか、状態をログに記録する（簡略化されたもの）
      console.log(this.robotController.getState());

    }, deltaTime * 1000); // setInterval用にdeltaTimeをミリ秒に変換
  }

  // シミュレーションを停止する
  // Stop the simulation
  stop() {
    this.isRunning = false;
    console.log("シミュレーションを停止しました。");
  }
}

// 他のモジュールでSimulationEngineクラスを使用できるようにエクスポート
// Export the SimulationEngine class for use in other modules
module.exports = SimulationEngine;
