'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '@/components/Navbar';

export default function ProjectsClient() {
  const [projects] = useState<any[]>([
    {
      id: '1',
      name: 'Modern 3BHK Residence',
      location: 'Hyderabad, TS',
      progress: 68,
      budget: ',000',
      startDate: 'Oct 2025',
      expectedCompletion: 'May 2026',
      builder: 'Apex Builders',
      milestones: [
        { name: 'Foundation', status: 'completed' },
        { name: 'Structure', status: 'completed' },
        { name: 'Brickwork', status: 'completed' },
        { name: 'Electrical', status: 'pending' },
        { name: 'Plumbing', status: 'pending' },
        { name: 'Interior', status: 'pending' },
        { name: 'Completion', status: 'pending' }
      ]
    }
  ]);

  return (
    <main className="min-h-screen bg-[#020617] text-slate-200 overflow-x-hidden pt-28">
      <Navbar />

      <div className="max-w-[1400px] mx-auto px-8 pb-20">
        
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 tracking-tight">Your Construction Projects</h1>
          <p className="text-lg text-slate-400">Track every stage of your dream home in one place.</p>
        </div>

        {/* Dashboard Content */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Project Cards */}
            <div className="lg:col-span-2 space-y-6">
              {projects.map(project => (
                <div key={project.id} className="glass-card p-6 md:p-8 rounded-3xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-3xl rounded-full -translate-y-1/2 translate-x-1/2"></div>
                  
                  <div className="flex flex-col md:flex-row justify-between items-start gap-6 relative z-10">
                    <div className="flex-1 w-full">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-[10px] font-black uppercase tracking-widest rounded-full">ACTIVE</span>
                        <span className="text-slate-400 text-sm font-medium"><i className="hidden sm:inline-block bx bx-map"></i> {project.location}</span>
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-6">{project.name}</h2>
                      
                      {/* Progress Bar */}
                      <div className="mb-8">
                        <div className="flex justify-between items-end mb-2">
                          <span className="text-sm font-bold text-slate-300">Overall Progress</span>
                          <span className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">{project.progress}%</span>
                        </div>
                        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" style={{ width: `${project.progress}%` }}></div>
                        </div>
                      </div>

                      {/* Details Grid */}
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Budget</div>
                          <div className="text-sm font-bold text-white">{project.budget}</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Start Date</div>
                          <div className="text-sm font-bold text-white">{project.startDate}</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Expected</div>
                          <div className="text-sm font-bold text-white">{project.expectedCompletion}</div>
                        </div>
                        <div className="bg-slate-800/50 p-4 rounded-2xl border border-white/5">
                          <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Builder</div>
                          <div className="text-sm font-bold text-blue-400 truncate">{project.builder}</div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-wrap gap-4">
                        <Link href="/projects/1" className="px-6 py-3 bg-white text-black text-sm font-bold rounded-xl hover:bg-slate-200 transition-colors">
                          View Project
                        </Link>
                        <button className="px-6 py-3 border border-white/10 text-white text-sm font-bold rounded-xl hover:bg-white/5 transition-colors">
                          Track Progress
                        </button>
                        <Link href="/design" className="px-6 py-3 border border-indigo-500/30 text-indigo-400 text-sm font-bold rounded-xl hover:bg-indigo-500/10 transition-colors flex items-center gap-2">
                          <i className="hidden sm:inline-block bx bx-cube-alt text-lg"></i> Open 3D Design
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Milestones */}
            <div className="lg:col-span-1">
              <div className="glass-card p-6 md:p-8 rounded-3xl sticky top-28">
                <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                  <i className="hidden sm:inline-block bx bx-list-check text-blue-500 text-2xl"></i> Construction Milestones
                </h3>
                
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-[11px] before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-slate-700 before:to-transparent">
                  {projects[0].milestones.map((milestone: any, i: number) => (
                    <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full border-2 bg-slate-900 border-slate-700 group-[.is-active]:border-blue-500 text-slate-500 group-[.is-active]:text-blue-500 shadow shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 z-10 transition-colors">
                        {milestone.status === 'completed' ? (
                          <i className="bx bx-check text-sm text-white bg-blue-500 rounded-full p-0.5"></i>
                        ) : (
                          <div className="w-2 h-2 bg-slate-600 rounded-full"></div>
                        )}
                      </div>
                      <div className="w-[calc(100%-4rem)] md:w-[calc(50%-2.5rem)] p-4 rounded-2xl bg-slate-800/50 border border-white/5 shadow-xl">
                          <div className="flex items-center justify-between">
                            <h4 className={`font-bold text-sm ${milestone.status === 'completed' ? 'text-white' : 'text-slate-400'}`}>{milestone.name}</h4>
                          </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Empty State */
          <div className="glass-card p-20 rounded-3xl flex flex-col items-center justify-center text-center border-dashed border-2 border-white/10">
            <div className="w-24 h-24 bg-blue-500/10 rounded-full flex items-center justify-center mb-6">
              <i className="bx bx-buildings text-4xl text-blue-500"></i>
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">No projects yet</h2>
            <p className="text-slate-400 mb-8 max-w-md">Start by creating your AI-powered house design, finding a builder, and kicking off your construction journey.</p>
            <Link href="/design" className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold rounded-2xl shadow-lg shadow-blue-500/25 transition-all transform hover:-translate-y-1">
              Create Your First Project &rarr;
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}
