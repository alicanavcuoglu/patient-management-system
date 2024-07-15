"use client";

import CustomFormField from "@/components/custom-form-field";
import SubmitButton from "@/components/submit-button";
import { Form } from "@/components/ui/form";
import { createUser } from "@/lib/actions/patient.actions";
import { FormFieldType } from "@/lib/types";
import { UserFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const PatientForm = () => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof UserFormValidation>>({
		resolver: zodResolver(UserFormValidation),
		defaultValues: {
			name: "",
			email: "",
			phone: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof UserFormValidation>) => {
		setIsLoading(true);

		try {
			const user = {
				name: values.name,
				email: values.email,
				phone: values.phone,
			};

			const newUser = await createUser(user);

			if (newUser) {
				router.push(`/patients/${newUser.$id}/register`);
			}
		} catch (error) {
			console.log(error);
		}

		setIsLoading(false);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-6 flex-1">
				<section className="mb-12 space-y-4">
					<h1 className="header">Hi there! 👋</h1>
					<p className="text-dark-700">
						Schedule your first appointment.
					</p>
				</section>
				<CustomFormField
					fieldType={FormFieldType.INPUT}
					control={form.control}
					name="name"
					label="Name"
					placeholder="Alican Avcuoglu"
					Icon={User}
				/>
				<CustomFormField
					fieldType={FormFieldType.INPUT}
					control={form.control}
					name="email"
					label="Email"
					placeholder="hello@vivitate.com"
					Icon={Mail}
				/>
				<CustomFormField
					fieldType={FormFieldType.PHONE_INPUT}
					control={form.control}
					name="phone"
					label="Phone Number"
					placeholder="+994 51 797 87 26"
				/>
				<SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
			</form>
		</Form>
	);
};

export default PatientForm;
