import RegisterForm from "@/components/forms/register-form";
import Logo from "@/components/logo";
import { getUser } from "@/lib/actions/patient.actions";
import * as Sentry from "@sentry/nextjs";
import Image from "next/image";

const Page = async ({ params: { userId } }: SearchParamProps) => {
	const user = await getUser(userId);

	Sentry.metrics.set("user_view_register", user.name);

	return (
		<main className="flex h-screen max-h-screen">
			{/* TODO: OTP Verification */}
			<section className="remove-scrollbar container">
				<div className="sub-container max-w-[860px] flex-1 flex-col py-10">
					<Logo />
					<RegisterForm user={user} />
					<p className="copyright py-12">
						&copy; {new Date().getFullYear()} SysCare
					</p>
				</div>
			</section>
			<Image
				src="/assets/images/register-img.png"
				alt="patient"
				width={1000}
				height={1000}
				className="side-img max-w-[390px]"
			/>
		</main>
	);
};

export default Page;
