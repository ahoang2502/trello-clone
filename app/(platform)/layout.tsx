import { ClerkProvider } from "@clerk/nextjs";
import React from "react";
import { Toaster } from "sonner";

import ModalProvider from "@/components/providers/ModalProvider";
import { QueryProvider } from "@/components/providers/QueryProvider";

export default function PlatformLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<ClerkProvider>
			<QueryProvider>
				<Toaster />
				<ModalProvider />
				{children}
			</QueryProvider>
		</ClerkProvider>
	);
}
