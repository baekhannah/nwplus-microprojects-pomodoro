import { Plant, plantImages } from './RewardModal';
import { Button } from './ui/button';

const GRID_SIZE = 18; // 6 columns x 4 rows

interface GardenPageProps {
	plants: (Plant | null)[];
	onBackToTimer: () => void;
}

export function GardenPage({ plants, onBackToTimer }: GardenPageProps) {
	const ICON_SIZE = 64;
	const getPlantIcon = (plant: Plant | null) => {
		return (
			<div
				className="flex items-center justify-center"
				style={{ width: ICON_SIZE, height: ICON_SIZE, margin: 10 }}
			>
				<img
					src={plant ? plantImages[plant.type] : plantImages['flower']}
					alt={plant ? plant.type : 'flower'}
					className="w-full h-full object-contain"
				/>
			</div>
		);
	};

	// Fill grid with plants or empty slots
	const gardenGrid = Array.from({ length: GRID_SIZE }, (_, i) => plants[i] ?? null);

	return (
		<div className="min-h-screen bg-[#CDFFC0] flex items-center justify-center p-12">
			<div className="w-full max-w-6xl">
				<div className="flex flex-col gap-8">
					{/* Buttons */}
					<div className="flex gap-3 items-center">
						<Button
							className="h-10 text-[17px] font-semibold bg-[#BBFFD4] border-2 border-[#277645] text-[#2d5f4c] rounded-full hover:bg-[#a8e6c1]"
							onClick={onBackToTimer}
						>
							Go Back to Timer
						</Button>

						<Button
							variant="outline"
							className=" h-10 text-[17px] font-semibold bg-[#BBFFD4] border-2 border-[#277645] text-[#2d5f4c] rounded-full hover:bg-[#a8e6c1]"
						>
							Filter garden
						</Button>
					</div>

					{/* Garden Grid */}
					<div className="grid grid-cols-6 place-items-center gap-6 p-5">
						{gardenGrid.map((plant, index) => (
							<div key={index} className="flex items-center justify-center">
								{getPlantIcon(plant)}
							</div>
						))}
					</div>
				</div>
			</div>
		</div>
	);
}
