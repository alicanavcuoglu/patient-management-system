"use client";

import { AppointmentModal } from "@/components/appointment-modal";
import StatusBadge from "@/components/status-badge";
import { Doctors } from "@/constants";
import { formatDateTime } from "@/lib/utils";
import { Appointment } from "@/types/appwrite.types";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";


export const columns: ColumnDef<Appointment>[] = [
	{
		header: "ID",
		cell: ({ row }) => (
			<p className="text-sm font-medium">{row.index + 1}</p>
		),
	},
	{
		accessorKey: "patient",
		header: "Patient",
		cell: ({ row }) => (
			<p className="text-sm font-medium">{row.original.patient.name}</p>
		),
	},
	{
		accessorKey: "status",
		header: "Status",
		cell: ({ row }) => (
			<div className="min-w-[115px]">
				<StatusBadge status={row.original.status} />
			</div>
		),
	},
	{
		accessorKey: "schedule",
		header: "Appointment",
		cell: ({ row }) => (
			<p className="text-sm min-w-[100px]">
				{formatDateTime(row.original.schedule).dateTime}
			</p>
		),
	},
	{
		accessorKey: "primaryPhysician",
		header: "Doctor",
		cell: ({ row }) => {
			const doctor = Doctors.find(
				(doctor) => doctor.name === row.original.primaryPhysician
			);

			return (
				<div className="flex items-center gap-3">
					<Image
						src={doctor?.image!}
						alt={doctor?.name!}
						width={32}
						height={32}
					/>
					<p className="whitespace-nowrap">Dr. {doctor?.name}</p>
				</div>
			);
		},
	},
	{
		id: "actions",
		header: () => <div className="pl-4">Actions</div>,
		cell: ({ row: { original: data } }) => {
			return (
				<div className="flex gap-1">
					<AppointmentModal
						type="schedule"
						patientId={data.patient.$id}
						userId={data.userId}
						appointment={data}
						title="Schedule Appointment"
						description="Please confirm the following details to schedule."
					/>
					<AppointmentModal
						type="cancel"
						patientId={data.patient.$id}
						userId={data.userId}
						appointment={data}
						title="Cancel Appointment"
						description="Are you sure you want to cancel this appointment?"
					/>
				</div>
			);
		},
	},
];
