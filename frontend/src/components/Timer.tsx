import { Pause, Play, RotateCcw, SkipForward } from 'lucide-react';
import { SessionType } from '../hooks/usePomodoro';
import { Button } from './ui/button';

interface TimerProps {
	timeLeft: number;
	isRunning: boolean;
	sessionType: SessionType;
	completedSessions: number;
	progress: number;
	formatTime: (seconds: number) => string;
	onStart: () => void;
	onPause: () => void;
	onReset: () => void;
	onSkip: () => void;
}

export function Timer({
	timeLeft,
	isRunning,
	sessionType,
	completedSessions,
	progress,
	formatTime,
	onStart,
	onPause,
	onReset,
	onSkip,
}: TimerProps) {
	const getSessionLabel = () => {
		switch (sessionType) {
			case 'work':
				return 'Focus Time';
			case 'shortBreak':
				return 'Short Break';
			case 'longBreak':
				return 'Long Break';
		}
	};

	const getSessionColor = () => {
		switch (sessionType) {
			case 'work':
				return 'text-green-700';
			case 'shortBreak':
				return 'text-blue-600';
			case 'longBreak':
				return 'text-purple-600';
		}
	};

	return (
		<div className="flex flex-col items-center gap-8">
			{/* Session Type Badge */}
			<div className={`text-sm font-medium uppercase tracking-wider ${getSessionColor()}`}>
				{getSessionLabel()}
			</div>

			{/* Timer Circle */}
			<div className="relative">
				{/* Progress Ring */}
				<svg className="w-72 h-72 transform -rotate-90">
					<circle
						cx="144"
						cy="144"
						r="136"
						stroke="currentColor"
						strokeWidth="8"
						fill="none"
						className="text-green-100"
					/>
					<circle
						cx="144"
						cy="144"
						r="136"
						stroke="currentColor"
						strokeWidth="8"
						fill="none"
						strokeLinecap="round"
						className={
							sessionType === 'work'
								? 'text-green-500'
								: sessionType === 'shortBreak'
									? 'text-blue-500'
									: 'text-purple-500'
						}
						style={{
							strokeDasharray: `${2 * Math.PI * 136}`,
							strokeDashoffset: `${2 * Math.PI * 136 * (1 - progress / 100)}`,
							transition: 'stroke-dashoffset 1s linear',
						}}
					/>
				</svg>

				{/* Timer Display */}
				<div className="absolute inset-0 flex flex-col items-center justify-center">
					<div className="text-6xl font-bold text-gray-800 tabular-nums">
						{formatTime(timeLeft)}
					</div>
				</div>
			</div>

			{/* Control Buttons */}
			<div className="flex items-center gap-4">
				<Button
					variant="outline"
					size="icon"
					onClick={onReset}
					className="h-12 w-12 rounded-full border-2"
				>
					<RotateCcw className="h-5 w-5" />
				</Button>

				<Button
					size="lg"
					onClick={isRunning ? onPause : onStart}
					className="h-16 w-16 rounded-full bg-green-600 hover:bg-green-700 text-white shadow-lg"
				>
					{isRunning ? (
						<Pause className="h-7 w-7" fill="currentColor" />
					) : (
						<Play className="h-7 w-7 ml-1" fill="currentColor" />
					)}
				</Button>

				<Button
					variant="outline"
					size="icon"
					onClick={onSkip}
					className="h-12 w-12 rounded-full border-2"
				>
					<SkipForward className="h-5 w-5" />
				</Button>
			</div>

			{/* Session Counter */}
			<div className="flex items-center gap-2">
				<span className="text-sm text-gray-600">Sessions completed:</span>
				<span className="text-lg font-semibold text-green-700">{completedSessions}</span>
			</div>
		</div>
	);
}
