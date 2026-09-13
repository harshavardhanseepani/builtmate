import { Suspense } from 'react';
import DashboardContent from './DashboardClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-bold animate-pulse">Initializing BuildMate HUD...</div>}>
      <DashboardContent />
    </Suspense>
  );
}
