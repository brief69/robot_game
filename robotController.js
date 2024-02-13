// robotController.js
// このモジュールは、シミュレーション内のロボットの動きと相互作用を制御します。
// This module controls the robot's movements and interactions within the simulation.

const PhysicsEngine = require('./physicsEngine.js');
const { robotSettings } = require('./config.json');
const robotModel = require('./robotModel.json');

class RobotController {
  constructor() {
    // 物理エンジンのインスタンスを作成し、初期位置、初期回転、速度、方向、エネルギーを設定します。
    // Create an instance of the Physics Engine and set initial position, rotation, speed, direction, and energy.
    this.physicsEngine = new PhysicsEngine(robotModel);
    this.position = robotSettings.initialPosition;
    this.rotation = robotSettings.initialRotation;
    this.speed = 0;
    this.direction = 0; // 方向はラジアンで、0は右を指します。Direction in radians, 0 pointing to the right.
    this.energy = robotModel.power.capacity;
  }

  // ロボットの速度を設定します。車輪の最大速度を考慮します。
  // Set the robot's speed, considering the max speed of its wheels
  setSpeed(newSpeed) {
    const maxSpeed = Math.min(...robotModel.actuators.filter(actuator => actuator.type === 'wheel').map(wheel => wheel.maxSpeed));
    this.speed = Math.min(newSpeed, maxSpeed);
  }

  // ロボットを特定の角度（度）で回転させます。
  // Rotate the robot by a certain angle in degrees
  rotate(angleDegrees) {
    const angleRadians = angleDegrees * (Math.PI / 180);
    this.direction += angleRadians;
  }

  // 特定の時間だけロボットを移動させます。
  // Move the robot for a certain amount of time
  move(deltaTime) {
    const newPosition = this.physicsEngine.updatePosition(this.position, this.speed, this.direction, deltaTime);
    const distance = Math.sqrt(Math.pow(newPosition.x - this.position.x, 2) + Math.pow(newPosition.y - this.position.y, 2));
    const energyConsumed = this.physicsEngine.calculateEnergyConsumption(distance, this.speed);

    if (this.energy - energyConsumed > 0) {
      this.position = newPosition;
      this.energy -= energyConsumed;
    } else {
      console.log("エネルギーが足りないため、移動を完了できません。");
      // Not enough energy to complete the movement.
    }
  }

  // ロボットの経路上の障害物をチェックします。
  // Check for obstacles in the robot's path
  checkForObstacles(obstacles) {
    const sensorData = robotModel.sensors.map(sensor => ({
      ...sensor,
      position: { x: this.position.x, y: this.position.y } // センサー位置を簡略化 Simplified sensor position
    }));
    return this.physicsEngine.detectObstacles(sensorData, obstacles);
  }

  // ロボットのバッテリーを再充電します。
  // Recharge the robot's battery
  recharge() {
    this.energy = robotModel.power.capacity;
    console.log("ロボットが再充電されました。");
    // Robot recharged.
  }

  // ロボットの現在の状態を取得します。
  // Get the current state of the robot
  getState() {
    return {
      position: this.position,
      rotation: this.rotation,
      speed: this.speed,
      energy: this.energy
    };
  }
}

// 他のモジュールでRobotControllerクラスを使用できるようにエクスポートします。
// Export the RobotController class for use in other modules
module.exports = RobotController;
