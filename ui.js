document.addEventListener('DOMContentLoaded', () => {
    // シミュレーションの開始と停止、速度、バッテリー、障害物検出の表示を管理する要素を取得します。
    // Retrieve elements for managing simulation start/stop, speed, battery, and obstacle detection display.
    const startSimulationButton = document.getElementById('startSimulation');
    const stopSimulationButton = document.getElementById('stopSimulation');
    const speedDisplay = document.getElementById('speed');
    const batteryDisplay = document.getElementById('battery');
    const obstacleDetectedDisplay = document.getElementById('obstacleDetected');

    let simulationInterval;

    // シミュレーションの状態を保持する変数を初期化します。
    // Initialize a variable to hold the simulation state.
    let simulationState = {
        speed: 0,
        battery: 100,
        obstacleDetected: false
    };

    // 現在の状態でUIを更新する関数です。
    // Function to update the UI with the current state.
    function updateUI() {
        speedDisplay.textContent = simulationState.speed + ' m/s';
        batteryDisplay.textContent = simulationState.battery + '%';
        obstacleDetectedDisplay.textContent = simulationState.obstacleDetected ? 'あり' : 'なし';
    }

    // シミュレーションを開始する関数です。
    // Function to start the simulation.
    function startSimulation() {
        startSimulationButton.disabled = true;
        stopSimulationButton.disabled = false;

        // シミュレーションを開始するためのプレースホルダーです。
        // Placeholder for starting the simulation.
        console.log('Simulation started.');
        // 実際のシミュレーション開始ロジックに置き換えられます。
        // This would be replaced with actual simulation start logic.
        simulationInterval = setInterval(() => {
            // シミュレーションロジックのプレースホルダーです。
            // Placeholder for simulation logic.
            simulationState.speed = Math.random() * 5; // デモンストレーション用のランダム速度
            simulationState.battery -= 0.1; // デモンストレーション用のバッテリー減少
            simulationState.obstacleDetected = Math.random() > 0.8; // ランダムな障害物検出

            updateUI();
        }, 1000);
    }

    // シミュレーションを停止する関数です。
    // Function to stop the simulation.
    function stopSimulation() {
        clearInterval(simulationInterval);
        startSimulationButton.disabled = false;
        stopSimulationButton.disabled = true;

        console.log('Simulation stopped.');
        // シミュレーション状態をリセットします。
        // Reset simulation state.
        simulationState.speed = 0;
        simulationState.battery = 100;
        simulationState.obstacleDetected = false;
        updateUI();
    }

    // シミュレーションの開始と停止のイベントリスナーを追加します。
    // Add event listeners for starting and stopping the simulation.
    startSimulationButton.addEventListener('click', startSimulation);
    stopSimulationButton.addEventListener('click', stopSimulation);

    // 初期UI更新を行います。
    // Perform initial UI update.
    updateUI();
});
