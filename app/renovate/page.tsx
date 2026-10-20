import type { Metadata } from 'next';
import RenovateClient from './RenovateClient';

export const metadata: Metadata = {
  title: 'AI Renovate — Transform Your Existing House | BuildMate AI',
  description: 'Upload your existing house photos and transform them into modern architectural concepts, facade revamps, and vertical extensions with AI.',
};

export default function RenovatePage() {
  return <RenovateClient />;
}
