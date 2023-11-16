import React from "react";

import DashboardNavbar from "./_components/DashboardNavbar";

export default function DashboardLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div className="h-full ">
			<DashboardNavbar />
			{children}
		</div>
	);
}
