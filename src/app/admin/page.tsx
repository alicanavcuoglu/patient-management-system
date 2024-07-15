import Logo from "@/components/logo";
import StatCard from "@/components/stat-card";
import { columns } from "@/components/table/columns";
import { DataTable } from "@/components/table/data-table";
import { getRecentAppointmentList } from "@/lib/actions/appointment.actions";
import { CalendarCheck2, Hourglass, TriangleAlert } from "lucide-react";
import Link from "next/link";

const AdminPage = async () => {
	const appointments = await getRecentAppointmentList();
	return (
		<div className="mx-auto flex max-w-7xl flex-col space-y-14">
			<header className="admin-header">
				<Link href="/">
					<Logo width={162} height={32} className="h-8 w-fit mb-0" />
				</Link>

				<p className="font-semibold">Admin Dashboard</p>
			</header>

			<main className="admin-main">
				<section className="w-full space-y-4">
					<h1 className="header">Welcome 👋</h1>
					<p className="text-dark-700">
						Start the day with managing new appointments
					</p>
				</section>

				<section className="admin-stat">
					<StatCard
						type="appointments"
						count={appointments.scheduledCount}
						label="Scheduled appointments"
						Icon={CalendarCheck2}
					/>
					<StatCard
						type="pending"
						count={appointments.pendingCount}
						label="Pending appointments"
						Icon={Hourglass}
					/>
					<StatCard
						type="cancelled"
						count={appointments.cancelledCount}
						label="Cancelled appointments"
						Icon={TriangleAlert}
					/>
				</section>

				<DataTable columns={columns} data={appointments.documents} />
			</main>
		</div>
	);
};

export default AdminPage;
