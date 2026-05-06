import { notFound } from 'next/navigation';
import { parkingSpotsSeed } from '@/lib/store';
import SpotDetailClient from './spot-detail-client';

export default function SpotDetailPage({ params }: { params: { id: string } }) {
  const spot = parkingSpotsSeed.find((item) => item.id === params.id);

  if (!spot) {
    notFound();
  }

  return <SpotDetailClient spot={spot} />;
}
