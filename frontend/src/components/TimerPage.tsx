import { RotateCcw } from 'lucide-react';
import { Button } from './ui/button';

interface TimerPageProps {
	timeLeft: number;
	isRunning: boolean;
	formatTime: (seconds: number) => string;
	onStart: () => void;
	onPause: () => void;
	onReset: () => void;
	onStartBreak: () => void;
	onStartDefault: () => void;
	onSetTimer60: () => void;
	onSetTimer30: () => void;
	onSetTimer45: () => void;
	onSetTimer15: () => void;
	onSetTimer5: () => void;
	onTestReward?: () => void; // New test function
}

export function TimerPage({
	timeLeft,
	isRunning,
	formatTime,
	onStart,
	onPause,
	onReset,

	onStartBreak,
	onStartDefault,
	onSetTimer60,
	onSetTimer30,
	onSetTimer45,
	onSetTimer15,
	onSetTimer5,
	onTestReward,
}: TimerPageProps) {
	return (
		<div className="min-h-screen bg-[#CDFFC0] flex items-center justify-center p-8">
			<div className="w-full max-w-6xl">
				{/* Main Timer Layout */}
				<div className="flex flex-col items-center gap-8">
					{/* Control icons at top */}
					<div className="flex items-center gap-6">
						<button
							onClick={isRunning ? onPause : onStart}
							className="hover:opacity-70 transition-opacity"
							aria-label={isRunning ? 'Pause' : 'Play'}
						>
							{isRunning ? (
								<svg
									width="70"
									height="70"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<rect x="6" y="4" width="3" height="16" fill="#277645" rx="0.5" />
									<rect x="15" y="4" width="3" height="16" fill="#277645" rx="0.5" />
								</svg>
							) : (
								<svg
									width="70"
									height="70"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path d="M8 5v14l11-7z" fill="#277645" />
								</svg>
							)}
						</button>

						{/* ✅ Reset should call onReset, not onPause */}
						<button
							onClick={onReset}
							className="hover:opacity-70 transition-opacity"
							aria-label="Reset"
						>
							<RotateCcw className="w-16 h-16 text-[#277645]" strokeWidth={2.25} />
						</button>
					</div>

					<div className="flex items-center justify-between gap-6 w-full">
						{/* Left Side Controls */}
						<div className="flex flex-col items-center gap-5">
							<h3
								className="text-3xl font-semibold text-[#277645] underline mb-2"
								style={{
									fontFamily: 'Space Grotesk, sans-serif',
								}}
							>
								Start studying
							</h3>
							<Button
								variant="outline"
								className="w-[163px] h-10 text-xl font-semibold bg-[#BBFFD4] border-2 border-[#277645] text-[#2d5f4c] rounded-full hover:bg-[#a8e6c1]"
								onClick={() => {
									onSetTimer30();
									onStart();
								}}
							>
								30 mins
							</Button>
							<Button
								variant="outline"
								className="w-[163px] h-10 text-xl font-semibold bg-[#BBFFD4] border-2 border-[#277645] text-[#2d5f4c] rounded-full hover:bg-[#a8e6c1]"
								onClick={() => {
									onSetTimer45();
									onStart();
								}}
							>
								45 mins
							</Button>
							<Button
								variant="outline"
								className="w-[163px] h-10 text-xl font-semibold bg-[#BBFFD4] border-2 border-[#277645] text-[#2d5f4c] rounded-full hover:bg-[#a8e6c1]"
								onClick={() => {
									onSetTimer60();
									onStart();
								}}
							>
								60 mins
							</Button>
						</div>

						{/* Center Timer Display */}
						<div className="flex items-center justify-center">
							<div className="text-[188px] leading-none font-bold text-[#277645] tabular-nums">
								{formatTime(timeLeft)}
							</div>
						</div>

						{/* Right Side Controls */}
						<div className="flex flex-col items-center gap-5">
							<h3
								className="text-3xl font-semibold text-[#277645] underline mb-2"
								style={{
									fontFamily: 'Space Grotesk, sans-serif',
								}}
							>
								Start break
							</h3>
							<Button
								variant="outline"
								className="w-[163px] h-10 text-xl font-semibold bg-[#BBFFD4] border-2 border-[#277645] text-[#2d5f4c] rounded-full hover:bg-[#a8e6c1]"
								onClick={() => {
									onSetTimer5();
									onStart();
								}}
							>
								5 mins
							</Button>
							<Button
								variant="outline"
								className="w-[163px] h-10 text-xl font-semibold bg-[#BBFFD4] border-2 border-[#277645] text-[#2d5f4c] rounded-full hover:bg-[#a8e6c1]"
								onClick={() => {
									onStartBreak();
									onStart();
								}}
							>
								10 mins
							</Button>
							<Button
								variant="outline"
								className="w-[163px] h-10 text-xl font-semibold bg-[#BBFFD4] border-2 border-[#277645] text-[#2d5f4c] rounded-full hover:bg-[#a8e6c1]"
								onClick={() => {
									onSetTimer15();
									onStart();
								}}
							>
								15 mins
							</Button>
						</div>
					</div>

					<Button
						variant="outline"
						className="w-[204px] h-10 text-[17px] font-semibold bg-[#BBFFD4] border-2 border-[#277645] text-[#2d5f4c] rounded-full hover:bg-[#a8e6c1]"
						onClick={onStartDefault}
					>
						See your garden
					</Button>
					{onTestReward && (
						<Button
							variant="outline"
							className="w-[204px] h-10 text-[15px] font-medium bg-[#BBFFD4] border-2 border-[#277645] text-[#2d5f4c] rounded-full hover:bg-[#a8e6c1] opacity-70"
							onClick={onTestReward}
						>
							🌸 Test Reward (5 sec)
						</Button>
					)}
				</div>
			</div>
		</div>
	);
}
