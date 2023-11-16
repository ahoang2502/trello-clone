"use client";

import React, { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { useMobileSidebar } from "@/hooks/useMobileSidebar";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Sidebar } from "./Sidebar";

export default function MobileSidebar() {
	const pathname = usePathname();
	const [isMounted, setIsMounted] = useState(false);

	const onOpen = useMobileSidebar((state) => state.onOpen);
	const onClose = useMobileSidebar((state) => state.onClose);
	const isOpen = useMobileSidebar((state) => state.isOpen);

	useEffect(() => setIsMounted(true), []);

	useEffect(() => {
		onClose();
	}, [pathname, onClose]);

	if (!isMounted) return null;

	return (
		<>
			<Button
				onClick={onOpen}
				className="block md:hidden mr-2"
				variant="ghost"
				size="sm"
			>
				<Menu className="h-4 w-4" />
			</Button>

			<Sheet open={isOpen} onOpenChange={onClose}>
				<SheetContent className="p-2 pt-10" side="left">
					<Sidebar storageKey="t-sidebar-mobileState" />
				</SheetContent>
			</Sheet>
		</>
	);
}
