import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { GardenPage } from './components/GardenPage';
import { Plant, RewardModal } from './components/RewardModal';
import { TimerPage } from './components/TimerPage';
import { usePomodoro } from './hooks/usePomodoro';

export default function App() {
	const navigate = useNavigate();

	const {
		timeLeft,
		isRunning,
		formatTime,
		start,
		pause,
		setCustomTime,
		showReward,
		closeRewardModal,
	} = usePomodoro();

	const defaultTime = 25;
	const [plants, setPlants] = useState<(Plant | null)[]>([]);
	const [lastSetTime, setLastSetTime] = useState<number>(defaultTime);

	const handleRewardSelected = (plant: Plant) => {
		setPlants((prev) => [...prev, plant]);
	};

	const handleSetTimer = (minutes: number) => {
		setLastSetTime(minutes);
		setCustomTime(minutes);
	};

	const handleReset = () => {
		pause();
		setCustomTime(lastSetTime);
	};

	const handleTestReward = () => {
		setCustomTime(5 / 60);
		start();
	};

	const goToGarden = () => {
		pause(); // stop timer
		navigate('/garden');
	};

	const goBackToTimer = () => {
		navigate('/');
	};

	return (
		<>
			<Routes>
				{/* TIMER PAGE — DEFAULT */}
				<Route
					path="/"
					element={
						<TimerPage
							timeLeft={timeLeft}
							isRunning={isRunning}
							formatTime={formatTime}
							onStart={start}
							onPause={pause}
							onReset={handleReset}
							onStartBreak={() => handleSetTimer(10)}
							onStartDefault={goToGarden} // "See your garden"
							onSetTimer60={() => handleSetTimer(60)}
							onSetTimer30={() => handleSetTimer(30)}
							onSetTimer45={() => handleSetTimer(45)}
							onSetTimer15={() => handleSetTimer(15)}
							onSetTimer5={() => handleSetTimer(5)}
							onTestReward={handleTestReward}
						/>
					}
				/>

				{/* GARDEN PAGE — URL ONLY */}
				<Route
					path="/garden"
					element={<GardenPage plants={plants} onBackToTimer={goBackToTimer} />}
				/>
			</Routes>

			<RewardModal
				isOpen={showReward}
				onClose={closeRewardModal}
				onRewardSelected={handleRewardSelected}
			/>
		</>
	);
}
