/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { educations } from "../data";
import { GraduationCap, Award, MapPin, Landmark, BookOpen } from "lucide-react";

export default function EducationSection() {
  return (
    <div className="space-y-6" id="education-section-root">
      {/* Section Header */}
      <div className="flex items-center gap-2 mb-6">
        <span className="p-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600">
          <GraduationCap className="w-5 h-5" />
        </span>
        <h3 className="font-sans font-extrabold text-lg text-slate-900 border-b border-slate-200 pb-1 flex-1">
          학력 사항 (Academic Excellence)
        </h3>
      </div>

      {/* Grid Layout representing B.S., M.S., Ph.D. as cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {educations.map((edu) => (
          <div
            key={edu.id}
            id={`edu-card-${edu.id}`}
            className="group bg-white rounded-2xl border border-slate-200 p-6 shadow-xs hover:shadow-md transition-all duration-300 relative overflow-hidden flex flex-col justify-between"
          >
            {/* Soft decorative background effect */}
            <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50/40 rounded-bl-full pointer-events-none transition-transform duration-500 group-hover:scale-110" />

            <div>
              {/* Institution Emblem representation */}
              <div className="flex items-center justify-between mb-4">
                <span className="p-2.5 rounded-xl bg-slate-50 text-slate-800 border border-slate-200 group-hover:bg-slate-900 group-hover:text-white transition-colors duration-300">
                  <Landmark className="w-5 h-5" />
                </span>
                <span className="text-xs font-mono font-bold text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full border border-blue-100">
                  {edu.period}
                </span>
              </div>

              {/* Title, Degree & Field */}
              <h4 className="font-sans font-extrabold text-lg text-slate-900 mb-0.5 group-hover:text-blue-600 transition-colors duration-200">
                {edu.degree}
              </h4>
              <p className="text-sm font-sans font-extrabold text-slate-800 mb-1 flex items-center gap-1">
                {edu.school}
              </p>
              <p className="text-xs font-sans font-medium text-slate-500 mb-4 flex items-center gap-1">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                {edu.field}
              </p>

              {/* Detail bullet descriptions */}
              <div className="border-t border-slate-200/60 pt-4 space-y-2.5">
                {edu.details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs text-slate-600 leading-relaxed">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom metadata */}
            <div className="mt-6 pt-3 border-t border-slate-200/60 flex justify-between items-center bg-slate-50/50 -mx-6 -mb-6 px-6 py-4 rounded-b-2xl">
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400 font-bold flex items-center gap-1">
                <MapPin className="w-3 h-3 text-slate-400" /> SEOUL, KOREA
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-blue-600 font-bold flex items-center gap-1">
                <Award className="w-3 h-3 text-blue-500" /> SNU PEDIGREE
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
