import { notFound } from "next/navigation";

import { EventDetailView } from "@/components/event-detail-view";
import { sortBySoonest } from "@/lib/event-utils";
import { seedEvents } from "@/lib/seed";

type EventPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EventPage({ params }: EventPageProps) {
  const { id } = await params;
  const event = seedEvents.find((item) => item.id === id);

  if (!event) {
    notFound();
  }

  const currentEvent = event;
  const related = sortBySoonest(
    seedEvents.filter((item) => item.id !== currentEvent.id && item.category === currentEvent.category),
  ).slice(0, 3);

  return <EventDetailView event={currentEvent} related={related} />;
}
