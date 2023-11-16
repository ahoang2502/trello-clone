import { OrganizationSwitcher, auth } from "@clerk/nextjs";
import React from "react";

export default function OrganizationIdPage() {
	const { userId, orgId } = auth();

	return <div>Organization Page</div>;
}
