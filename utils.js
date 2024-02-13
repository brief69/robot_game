// utils.js
// このモジュールは、ロボットシミュレーションアプリケーションのためのユーティリティ関数を提供します。
// This module provides utility functions for the robot simulation application.

/**
 * 度をラジアンに変換します。
 * Converts degrees to radians.
 * @param {number} degrees - 角度（度）。
 * @param {number} degrees - The angle in degrees.
 * @returns {number} 角度（ラジアン）。
 * @returns {number} The angle in radians.
 */
function degreesToRadians(degrees) {
  return degrees * (Math.PI / 180);
}

/**
 * ラジアンを度に変換します。
 * Converts radians to degrees.
 * @param {number} radians - 角度（ラジアン）。
 * @param {number} radians - The angle in radians.
 * @returns {number} 角度（度）。
 * @returns {number} The angle in degrees.
 */
function radiansToDegrees(radians) {
  return radians * (180 / Math.PI);
}

/**
 * 数値を最小値と最大値の間に制限します。
 * Clamps a number between a minimum and maximum value.
 * @param {number} value - 制限する数値。
 * @param {number} value - The number to clamp.
 * @param {number} min - 最小値。
 * @param {number} min - The minimum value.
 * @param {number} max - 最大値。
 * @param {number} max - The maximum value.
 * @returns {number} 制限された値。
 * @returns {number} The clamped value.
 */
function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

/**
 * 二点間の距離を計算します。
 * Calculates the distance between two points.
 * @param {object} point1 - 最初の点（xとyのプロパティを持つ）。
 * @param {object} point1 - The first point with x and y properties.
 * @param {object} point2 - 二番目の点（xとyのプロパティを持つ）。
 * @param {object} point2 - The second point with x and y properties.
 * @returns {number} 二点間の距離。
 * @returns {number} The distance between the two points.
 */
function calculateDistance(point1, point2) {
  return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
}

/**
 * タイムスタンプ付きでメッセージをログに記録します。
 * Logs a message with a timestamp.
 * @param {string} message - ログに記録するメッセージ。
 * @param {string} message - The message to log.
 */
function logWithTimestamp(message) {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${message}`);
}

// 他のモジュールで使用するためにユーティリティ関数をエクスポートします。
// Export the utility functions for use in other modules
module.exports = {
  degreesToRadians,
  radiansToDegrees,
  clamp,
  calculateDistance,
  logWithTimestamp,
};
