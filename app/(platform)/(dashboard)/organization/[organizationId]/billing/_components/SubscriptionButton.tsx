"use client";

import { toast } from "sonner";

import { stripeRedirect } from "@/actions/stripe-redirect";
import { Button } from "@/components/ui/button";
import { useAction } from "@/hooks/useAction";
import { checkSubscription } from "@/lib/subscription";
import { useProModal } from "@/hooks/useProModal";

interface SubscriptionButtonProps {
	isPro: boolean;
}

export default function SubscriptionButton({ isPro }: SubscriptionButtonProps) {
	const proModal = useProModal();

	const { execute, isLoading } = useAction(stripeRedirect, {
		onSuccess: (data) => (window.location.href = data),
		onError: (error) => toast.error(error),
	});

	const onClick = () => {
		if (isPro) execute({});
		else proModal.onOpen();
	};

	return (
		<Button variant="primaryOrange" disabled={isLoading} onClick={onClick}>
			{isPro ? "Manage subscription" : "Upgrade to Pro"}
		</Button>
	);
}
