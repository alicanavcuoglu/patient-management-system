"use client";

import CustomFormField from "@/components/custom-form-field";
import { FileUploader } from "@/components/file-uploader";
import SubmitButton from "@/components/submit-button";
import { Form, FormControl } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SelectItem } from "@/components/ui/select";
import {
	Doctors,
	GenderOptions,
	IdentificationTypes,
	PatientFormDefaultValues,
} from "@/constants";
import { registerPatient } from "@/lib/actions/patient.actions";
import { FormFieldType } from "@/lib/types";
import { PatientFormValidation } from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, User } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const RegisterForm = ({ user }: { user: User }) => {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(false);

	const form = useForm<z.infer<typeof PatientFormValidation>>({
		resolver: zodResolver(PatientFormValidation),
		defaultValues: {
			...PatientFormDefaultValues,
			name: "",
			email: "",
			phone: "",
		},
	});

	const onSubmit = async (values: z.infer<typeof PatientFormValidation>) => {
		setIsLoading(true);

		let formData;

		if (
			values.identificationDocument &&
			values.identificationDocument.length > 0
		) {
			const blobFile = new Blob([values.identificationDocument[0]], {
				type: values.identificationDocument[0].type,
			});

			formData = new FormData();
			formData.append("blobFile", blobFile);
			formData.append("fileName", values.identificationDocument[0].name);
		}

		try {
			const patientData = {
				...values,
				userId: user.$id,
				birthDate: new Date(values.birthDate),
				identificationDocument: formData
			};

			// @ts-ignore
			const patient = await registerPatient(patientData)

			if (patient) router.push(`/patients/${user.$id}/new-appointment`)
		} catch (error) {
			console.log(error);
		}

		setIsLoading(false);
	};

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="space-y-12 flex-1">
				<section className="space-y-4">
					<h1 className="header">Welcome 👋</h1>
					<p className="text-dark-700">
						Let us know more about yourself.
					</p>
				</section>
				<section className="space-y-6">
					<h2 className="sub-header mb-9">Personal Information</h2>
					<CustomFormField
						fieldType={FormFieldType.INPUT}
						control={form.control}
						name="name"
						label="Name"
						placeholder="Alican Avcuoglu"
						Icon={User}
					/>
					<div className="flex flex-col gap-6 lg:flex-row">
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
							label="Phone number"
							placeholder="+994 51 797 87 26"
						/>
					</div>
					<div className="flex flex-col gap-6 lg:flex-row">
						<CustomFormField
							fieldType={FormFieldType.DATE_PICKER}
							control={form.control}
							name="birthDate"
							label="Date of Birth"
						/>
						<CustomFormField
							fieldType={FormFieldType.SKELETON}
							control={form.control}
							name="gender"
							label="Gender"
							renderSkeleton={(field) => (
								<FormControl>
									<RadioGroup
										className="flex h-11 gap-6 lg:justify-between"
										onChange={field.onChange}
										defaultValue={field.value}>
										{GenderOptions.map((option) => (
											<div
												key={option}
												className="radio-group">
												<RadioGroupItem
													value={option}
													id={option}
												/>
												<Label
													htmlFor={option}
													className="cursor-pointer capitalize">
													{option}
												</Label>
											</div>
										))}
									</RadioGroup>
								</FormControl>
							)}
						/>
					</div>
					<div className="flex flex-col gap-6 lg:flex-row">
						<CustomFormField
							fieldType={FormFieldType.INPUT}
							control={form.control}
							name="address"
							label="Address"
							placeholder="14th Street, New York"
						/>
						<CustomFormField
							fieldType={FormFieldType.INPUT}
							control={form.control}
							name="occupation"
							label="Occupation"
							placeholder="Software Engineer"
						/>
					</div>
					<div className="flex flex-col gap-6 lg:flex-row">
						<CustomFormField
							fieldType={FormFieldType.INPUT}
							control={form.control}
							name="emergencyContactName"
							label="Emergency contact name"
							placeholder="Guardian's name"
						/>
						<CustomFormField
							fieldType={FormFieldType.PHONE_INPUT}
							control={form.control}
							name="emergencyContactNumber"
							label="Emergency contact number"
							placeholder="+994 51 797 87 26"
						/>
					</div>
				</section>

				<section className="space-y-6">
					<h2 className="sub-header mb-9">Medical Information</h2>
					<CustomFormField
						fieldType={FormFieldType.SELECT}
						control={form.control}
						name="primaryPhysician"
						label="Primary Physician"
						placeholder="Select a physician">
						{Doctors.map((doctor) => (
							<SelectItem key={doctor.name} value={doctor.name}>
								<div className="flex cursor-pointer items-center gap-2">
									<Image
										alt={doctor.name}
										src={doctor.image}
										width={32}
										height={32}
										className="rounded-full border border-dark-500"
									/>
									<p>{doctor.name}</p>
								</div>
							</SelectItem>
						))}
					</CustomFormField>
					<div className="flex flex-col gap-6 lg:flex-row">
						<CustomFormField
							fieldType={FormFieldType.INPUT}
							control={form.control}
							name="insuranceProvider"
							label="Insurance provider"
							placeholder="Bluerock Insurance"
						/>
						<CustomFormField
							fieldType={FormFieldType.INPUT}
							control={form.control}
							name="insurancePolicyNumber"
							label="Insurance policy number"
							placeholder="ABC123456789"
						/>
					</div>
					<div className="flex flex-col gap-6 lg:flex-row">
						<CustomFormField
							fieldType={FormFieldType.TEXTAREA}
							control={form.control}
							name="allergies"
							label="Allergies (if any)"
							placeholder="Peanuts, Penicillin, Pollen"
						/>
						<CustomFormField
							fieldType={FormFieldType.TEXTAREA}
							control={form.control}
							name="currentMedication"
							label="Current medication (if any)"
							placeholder="Ibuprofen 200mg, Paracetamol 500mg"
						/>
					</div>
					<div className="flex flex-col gap-6 xl:flex-row">
						<CustomFormField
							fieldType={FormFieldType.TEXTAREA}
							control={form.control}
							name="familyMedicalHistory"
							label=" Family medical history (if relevant)"
							placeholder="Mother had brain cancer, Father has hypertension"
						/>

						<CustomFormField
							fieldType={FormFieldType.TEXTAREA}
							control={form.control}
							name="pastMedicalHistory"
							label="Past medical history"
							placeholder="Appendectomy in 2015, Asthma diagnosis in childhood"
						/>
					</div>
				</section>

				<section className="space-y-6">
					<div className="mb-9 space-y-1">
						<h2 className="sub-header">
							Identification and Verfication
						</h2>
					</div>

					<CustomFormField
						fieldType={FormFieldType.SELECT}
						control={form.control}
						name="identificationType"
						label="Identification Type"
						placeholder="Select identification type">
						{IdentificationTypes.map((type, i) => (
							<SelectItem key={type + i} value={type}>
								{type}
							</SelectItem>
						))}
					</CustomFormField>

					<CustomFormField
						fieldType={FormFieldType.INPUT}
						control={form.control}
						name="identificationNumber"
						label="Identification Number"
						placeholder="123456789"
					/>

					<CustomFormField
						fieldType={FormFieldType.SKELETON}
						control={form.control}
						name="identificationDocument"
						label="Scanned Copy of Identification Document"
						renderSkeleton={(field) => (
							<FormControl>
								<FileUploader
									files={field.value}
									onChange={field.onChange}
								/>
							</FormControl>
						)}
					/>
					{/* Consents */}
					<div className="space-y-3">
						<CustomFormField
							fieldType={FormFieldType.CHECKBOX}
							control={form.control}
							name="treatmentConsent"
							label="I consent to treatment"
						/>
						<CustomFormField
							fieldType={FormFieldType.CHECKBOX}
							control={form.control}
							name="disclosureConsent"
							label="I consent to disclosure of information"
						/>
						<CustomFormField
							fieldType={FormFieldType.CHECKBOX}
							control={form.control}
							name="privacyConsent"
							label="I consent to privacy policy"
						/>
					</div>
				</section>
				<SubmitButton isLoading={isLoading}>Get Started</SubmitButton>
			</form>
		</Form>
	);
};

export default RegisterForm;
