// app.js
// ロボットシミュレーションアプリケーションのメインエントリーポイントです。
// Main entry point for the robot simulation application.

const SimulationEngine = require('./simulationEngine.js');
const express = require('express');
const path = require('path');

// シミュレーションエンジンを初期化します。
// Initialize the simulation engine
const simulationEngine = new SimulationEngine();

// Expressサーバーを設定します。
// Set up the express server
const app = express();
const port = 3000;

// 'public'ディレクトリから静的ファイルを提供します。
// Serve static files from the 'public' directory
app.use(express.static('public'));

// UIのHTMLファイルを提供します。
// Serve the UI HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'ui.html'));
});

// APIエンドポイントを介してシミュレーションを開始します。
// Start the simulation via an API endpoint
app.post('/start-simulation', (req, res) => {
  simulationEngine.start();
  res.send('Simulation started');
});

// APIエンドポイントを介してシミュレーションを停止します。
// Stop the simulation via an API endpoint
app.post('/stop-simulation', (req, res) => {
  simulationEngine.stop();
  res.send('Simulation stopped');
});

// 設定されたポートでリッスンします。
// Listen on the configured port
app.listen(port, () => {
  console.log(`Robot simulation app listening at http://localhost:${port}`);
});
