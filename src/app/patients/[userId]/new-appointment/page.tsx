import { AppointmentForm } from "@/components/forms/appointment-form";
import Logo from "@/components/logo";
import { getPatient } from "@/lib/actions/patient.actions";
import * as Sentry from "@sentry/nextjs";
import Image from "next/image";

export default async function NewAppointment({
	params: { userId },
}: SearchParamProps) {
	const patient = await getPatient(userId);

	Sentry.metrics.set("user_view_new-appointment", patient.name);

	return (
		<main className="flex h-screen max-h-screen">
			{/* TODO: OTP Verification */}
			<section className="remove-scrollbar container my-auto">
				<div className="sub-container max-w-[860px] flex-1 justify-between">
					<Logo />
					<AppointmentForm
						type="create"
						userId={userId}
						patientId={patient.$id}
					/>
					<p className="copyright py-12 mt-10">
						&copy; {new Date().getFullYear()} SysCare
					</p>
				</div>
			</section>
			<Image
				src="/assets/images/appointment-img.png"
				alt="appointment"
				width={1000}
				height={1000}
				className="side-img max-w-[390px]"
			/>
		</main>
	);
}
