import { Loader } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";

interface Props {
	isLoading?: boolean;
	className?: string;
	variant?:
		| "default"
		| "destructive"
		| "outline"
		| "secondary"
		| "ghost"
		| "link";
	children: React.ReactNode;
}

const SubmitButton = ({
	children,
	isLoading = false,
	variant,
	className,
}: Props) => {
	return (
		<Button
			type="submit"
			variant={variant || "default"}
			disabled={isLoading}
			className={className ?? "text-white !bg-green-500 w-full "}>
			{isLoading ? (
				<div className="flex items-center gap-4">
					<Loader className="animate-spin" />
					Loading...
				</div>
			) : (
				children
			)}
		</Button>
	);
};

export default SubmitButton;
