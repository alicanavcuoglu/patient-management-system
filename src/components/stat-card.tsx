import clsx from "clsx";
import { LucideIcon } from "lucide-react";

interface Props {
	type: "appointments" | "pending" | "cancelled";
	count: number;
	label: string;
	Icon: LucideIcon;
}

const StatCard = ({ type, count, label, Icon }: Props) => {
	return (
		<div
			className={clsx("stat-card", {
				"bg-appointments": type === "appointments",
				"bg-pending": type === "pending",
				"bg-cancelled": type === "cancelled",
			})}>
			<div className="flex items-center gap-4">
				<Icon
					className={clsx("size-8 w-fit", {
						"text-yellow-300": type === "appointments",
						"text-cyan-300": type === "pending",
						"text-red-300": type === "cancelled",
					})}
				/>
				<h2 className="text-3xl font-bold text-white">{count}</h2>
			</div>
			<p className="text-sm">{label}</p>
		</div>
	);
};

export default StatCard;
