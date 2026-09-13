import { Suspense } from 'react';
import DesignStudioContent from './DesignClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-slate-950 text-white font-bold animate-pulse">Summoning AI Architect...</div>}>
      <DesignStudioContent />
    </Suspense>
  );
}
