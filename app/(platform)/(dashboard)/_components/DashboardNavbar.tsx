import React from "react";
import { OrganizationSwitcher, UserButton } from "@clerk/nextjs";
import { Plus } from "lucide-react";

import { Logo } from "@/components/Logo";
import { Button } from "@/components/ui/button";

export default function DashboardNavbar() {
	return (
		<div className="fixed z-50 top-0 w-full h-14 border-b shadow-sm bg-white flex items-center">
			{/* Mobile Sidebar */}
			<div className="flex items-center gap-x-4">
				<div className="hidden md:flex">
					<Logo />
				</div>

				<Button
					className="rounded-sm hidden md:block h-auto py-1.5 px-3"
					size="sm"
					variant="primary2"
				>
					Create
				</Button>
				<Button
					className="rounded-sm block md:hidden"
					size="sm"
					variant="primary2"
				>
					<Plus className="h-4 w-4 " />
				</Button>
			</div>

			<div className="ml-auto flex items-center gap-x-2">
				<OrganizationSwitcher
					hidePersonal
					afterCreateOrganizationUrl="/organization/:id"
					afterLeaveOrganizationUrl="/select-org"
					afterSelectOrganizationUrl="/organization/:id"
					appearance={{
						elements: {
							rootBox: {
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
							},
						},
					}}
				/>

				<UserButton
					afterSignOutUrl="/"
					appearance={{
						elements: {
							avatarBox: { height: 30, width: 30 },
						},
					}}
				/>
			</div>
		</div>
	);
}
