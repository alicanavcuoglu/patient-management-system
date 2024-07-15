import { cn } from "@/lib/utils";
import Image from "next/image";

const Logo = ({
	width = 200,
	height = 50,
	className,
}: {
	width?: number;
	height?: number;
	className?: string;
}) => {
	return (
		<Image
			src="/assets/icons/logo-full.svg"
			alt="logo"
			width={width}
			height={height}
			className={cn("mb-12 h-10 w-fit", className)}
		/>
	);
};

export default Logo;
