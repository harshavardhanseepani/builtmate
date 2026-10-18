import { Suspense } from 'react';
import DesignStudioContent from './DesignClient';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center bg-[#faf9f6] bg-texture-luxury text-amber-800 font-bold animate-pulse">Summoning AI Architect...</div>}>
      <DesignStudioContent />
    </Suspense>
  );
}
