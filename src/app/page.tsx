import PatientForm from "@/components/forms/patient-form";
import Logo from "@/components/logo";
import { PasskeyModal } from "@/components/passkey-modal";
import Image from "next/image";
import Link from "next/link";

export default function Home({ searchParams }: SearchParamProps) {
	const isAdmin = searchParams.admin === "true";
	return (
		<main className="flex h-screen max-h-screen">
			{isAdmin && <PasskeyModal />}

			<section className="remove-scrollbar container my-auto">
				<div className="sub-container max-w-[496px]">
					<Logo />
					<PatientForm />
					<div className="flex justify-between text-sm mt-20">
						<p className="text-muted-foreground justify-items-end lg:text-left">
							&copy; {new Date().getFullYear()} SysCare
						</p>
						<Link href="/?admin=true" className="text-green-500">
							Admin
						</Link>
					</div>
				</div>
			</section>
			<Image
				src="/assets/images/onboarding-img.png"
				alt="patient"
				width={1000}
				height={1000}
				className="side-img max-w-[50%]"
			/>
		</main>
	);
}
