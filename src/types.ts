/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Experience {
  id: string;
  company: string;
  period: string;
  role: string;
  description: string;
  achievements: string[];
  techKeywords: string[];
  logoType: "samsung" | "bumjin" | "general";
}

export interface Education {
  id: string;
  degree: string;
  field: string;
  school: string;
  period: string;
  details: string[];
}
