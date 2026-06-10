/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { experiences } from "../data";
import { Briefcase, Building2, Calendar, Award, CheckCircle2, Star } from "lucide-react";

export default function ExperienceSection() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="space-y-8" id="experience-section-root">
      {/* Title */}
      <div className="flex items-center gap-2 mb-6">
        <span className="p-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600">
          <Briefcase className="w-5 h-5" />
        </span>
        <h3 className="font-sans font-extrabold text-lg text-slate-900 border-b border-slate-200 pb-1 flex-1">
          전문 경력 (Professional Experience)
        </h3>
      </div>

      {/* Main Timeline */}
      <div className="relative border-l border-slate-200 ml-4 md:ml-6 pl-6 md:pl-8 space-y-12">
        {experiences.map((exp, idx) => {
          const isSamsung = exp.logoType === "samsung";
          
          return (
            <div key={exp.id} className="relative group" id={`exp-card-${exp.id}`}>
              {/* Timeline dot */}
              <div className={`absolute -left-[31px] md:-left-[39px] top-1 w-6 h-6 rounded-full border-2 bg-white flex items-center justify-center transition-transform duration-300 group-hover:scale-110 ${
                isSamsung 
                  ? "border-blue-600 shadow-[0_0_8px_rgba(37,99,235,0.2)] text-blue-600" 
                  : "border-slate-800 shadow-[0_0_8px_rgba(15,23,42,0.2)] text-slate-800"
              }`}>
                {isSamsung ? <Building2 className="w-3.5 h-3.5" /> : <Star className="w-3.5 h-3.5" />}
              </div>

              {/* Card wrapper */}
              <div className="bg-white rounded-2xl border border-slate-200 p-6 md:p-8 hover:shadow-md transition-all duration-300 transform group-hover:-translate-y-0.5 flex flex-col justify-between shadow-xs">
                <div>
                  {/* Top line with title and company */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-slate-200/60 pb-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-sans font-extrabold text-lg md:text-xl text-slate-900">
                          {exp.company}
                        </h4>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-wider font-bold uppercase ${
                          isSamsung 
                            ? "bg-blue-50 text-blue-700 border border-blue-100" 
                            : "bg-slate-100 text-slate-700 border border-slate-200"
                        }`}>
                          {exp.logoType === "samsung" ? "Global Tech Giant" : "Audio Specialist"}
                        </span>
                      </div>
                      <p className="text-sm font-sans font-semibold text-blue-600 flex items-center gap-1.5">
                        <Award className="w-4 h-4 text-blue-500" />
                        {exp.role}
                      </p>
                    </div>

                    <div className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-250 self-start md:self-center font-mono">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      {exp.period}
                    </div>
                  </div>

                  {/* High level overview paragraph */}
                  <p className="text-sm text-slate-600 leading-relaxed font-sans mb-6">
                    {exp.description}
                  </p>

                  {/* Bullet accomplishments */}
                  <div className="space-y-3.5">
                    <h5 className="font-sans text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">
                      주요 성과 및 연구 분야 (Key Achievements)
                    </h5>
                    {exp.achievements.map((item, idy) => (
                      <div key={idy} className="flex items-start gap-3 text-sm text-slate-700">
                        <span className="mt-1 flex-shrink-0">
                          <CheckCircle2 className={`w-3.5 h-3.5 ${isSamsung ? "text-blue-600" : "text-slate-700"}`} />
                        </span>
                        <p className="leading-relaxed font-sans">{item}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Badges / Keywords list */}
                <div className="mt-8 pt-4 border-t border-slate-200/60 flex flex-wrap gap-2">
                  {exp.techKeywords.map((tag) => (
                    <span
                      key={tag}
                      onMouseEnter={() => setHoveredSkill(tag)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono transition-all duration-200 cursor-default border ${
                        hoveredSkill === tag
                          ? isSamsung
                            ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                            : "bg-slate-900 text-white border-slate-900 shadow-sm"
                          : "bg-slate-50 text-slate-500 border-slate-200 hover:bg-slate-100 hover:text-slate-700"
                      }`}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
