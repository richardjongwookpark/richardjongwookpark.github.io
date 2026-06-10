/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  User, 
  Mail, 
  Compass, 
  MapPin, 
  Linkedin, 
  Send, 
  Check, 
  PhoneCall, 
  Volume2, 
  Sparkles, 
  Cpu, 
  Award, 
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  ShieldCheck,
  Code,
  Camera,
  Upload,
  Trash2,
  Link,
  Image as ImageIcon
} from "lucide-react";

import AudioSimulator from "./components/AudioSimulator";
import ExperienceSection from "./components/Experience";
import EducationSection from "./components/Education";

export default function App() {
  const [activeSection, setActiveSection] = useState<string>("intro");
  const [contactForm, setContactForm] = useState({ name: "", company: "", email: "", message: "" });
  const [isSent, setIsSent] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  // Profile photo state management
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null);
  const [photoUrlInput, setPhotoUrlInput] = useState<string>("");
  const [showPhotoConfig, setShowPhotoConfig] = useState<boolean>(false);

  // Load custom profile photo from localStorage upon mount
  useEffect(() => {
    try {
      const savedPhoto = localStorage.getItem("jwp_profile_photo");
      if (savedPhoto) {
        setProfilePhoto(savedPhoto);
        if (!savedPhoto.startsWith("data:")) {
          setPhotoUrlInput(savedPhoto);
        }
      }
    } catch (e) {
      console.error("Failed to load profile photo:", e);
    }
  }, []);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setProfilePhoto(base64String);
        try {
          localStorage.setItem("jwp_profile_photo", base64String);
        } catch (err) {
          alert("파일 크기가 너무 큽니다. 다른 작은 용량 크기의 이미지나 URL 입력을 권장합니다.");
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePhotoUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (photoUrlInput.trim()) {
      setProfilePhoto(photoUrlInput.trim());
      try {
        localStorage.setItem("jwp_profile_photo", photoUrlInput.trim());
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleResetPhoto = () => {
    setProfilePhoto(null);
    setPhotoUrlInput("");
    try {
      localStorage.removeItem("jwp_profile_photo");
    } catch (err) {
      console.error(err);
    }
  };

  // Auto detect active section on window scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = ["intro", "experience", "simulator", "education", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setActiveSection(id);
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.message) return;
    
    // Simulate API call to send email
    setIsSent(true);
    setTimeout(() => {
      setIsSent(false);
      setContactForm({ name: "", company: "", email: "", message: "" });
    }, 4500);
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText("RichardJWPark@gmail.com");
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-sans selection:bg-blue-600 selection:text-white" id="portfolio-app-root">
      
      {/* Dynamic Header & Sticky Sidebar Combined */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-slate-900 flex items-center justify-center text-white font-mono font-black text-lg tracking-tighter" id="profile-initials-badge">
              JWP
            </div>
            <div>
              <span className="font-sans font-extrabold text-base text-slate-900 tracking-tight block leading-none">
                박종욱 (Jongwook Park)
              </span>
              <span className="text-[10px] font-mono tracking-wider text-blue-600 block mt-1 leading-none font-extrabold uppercase">
                Senior VP, Head of R&D Lab
              </span>
            </div>
          </div>

          {/* Nav pills */}
          <nav className="hidden md:flex items-center gap-1.5">
            {[
              { id: "intro", label: "소개" },
              { id: "experience", label: "전문 경력" },
              { id: "simulator", label: "제어·음향 연구" },
              { id: "education", label: "학위" },
              { id: "contact", label: "네트워킹" }
            ].map((tab) => (
              <button
                key={tab.id}
                id={`nav-${tab.id}`}
                onClick={() => scrollToSection(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-sans font-semibold transition-all duration-200 border ${
                  activeSection === tab.id
                    ? "bg-blue-50 text-blue-700 border-blue-200 font-bold"
                    : "text-slate-600 border-transparent hover:text-slate-900 hover:bg-slate-100"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Quick Contact Action Button */}
          <button
            id="header-contact-button"
            onClick={() => scrollToSection("contact")}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-xs font-sans font-bold rounded-xl shadow-xs transition-colors duration-200 flex items-center gap-1.5 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            이메일 발송
          </button>
        </div>
      </header>

      {/* Main Container Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-16">
        
        {/* Intro Section - Hero Grid */}
        <section id="intro" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Hero Left Profile Summary Card */}
          <div className="lg:col-span-8 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm relative overflow-hidden flex flex-col justify-between" id="hero-main-card">
            {/* Background design line wave generated image container */}
            <div className="absolute top-0 right-0 left-0 h-44 overflow-hidden pointer-events-none rounded-t-3xl">
              <div className="absolute inset-0 bg-gradient-to-b from-[#0c101b]/0 to-white/100 z-10" />
              <img 
                src="/src/assets/images/tech_banner_1781086239811.png"
                alt="Tech Banner Abstract Wave"
                className="w-full h-full object-cover filter brightness-[0.80] contrast-[1.1]"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Float badge */}
            <div className="relative z-20 self-start">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-xs text-indigo-700 font-sans font-bold text-xs uppercase tracking-widest rounded-full border border-indigo-100/50 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" /> Executive Resume Portfolio
              </span>
            </div>

            {/* Profile Content */}
            <div className="relative z-20 mt-20">
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
                {/* Flexible avatar block supporting dynamic photo rendering or monogram fallback */}
                <div 
                  onClick={() => setShowPhotoConfig(!showPhotoConfig)}
                  className="w-24 h-24 rounded-2xl overflow-hidden shadow-md border-2 border-slate-100 flex-shrink-0 relative group/avatar bg-slate-100 cursor-pointer" 
                  id="profile-photo-avatar"
                  title="사진 설정 변경하기"
                >
                  {profilePhoto ? (
                    <img 
                      src={profilePhoto}
                      alt="Dr. Jongwook Park Portrait"
                      className="w-full h-full object-cover group-hover/avatar:scale-105 transition-transform duration-300"
                      referrerPolicy="no-referrer"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-tr from-slate-900 to-indigo-950 flex flex-col justify-center items-center">
                      <Cpu className="w-10 h-10 text-cyan-400 mb-1 animate-pulse" />
                      <span className="text-[9px] font-mono text-cyan-200 uppercase font-black tracking-widest leading-none">SNU Ph.D</span>
                    </div>
                  )}
                  {/* Hover Camera overlay to hint that it is interactive! */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover/avatar:opacity-100 flex flex-col items-center justify-center transition-opacity duration-300">
                    <Camera className="w-6 h-6 text-white mb-1" />
                    <span className="text-[9px] text-white font-sans font-semibold">사진 변경</span>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="font-sans font-black text-3.5xl text-slate-900 tracking-tight leading-none mb-1">
                      박종욱 <span className="text-xl text-slate-400 font-medium font-mono">Jongwook Park</span>
                    </h1>
                    {/* Tiny button indicating user can upload photo */}
                    <button 
                      onClick={() => setShowPhotoConfig(!showPhotoConfig)}
                      className={`px-2 py-0.5 rounded-md text-[10px] font-sans font-bold flex items-center gap-1 border transition-colors ${
                        showPhotoConfig 
                          ? "bg-indigo-50 text-indigo-700 border-indigo-200" 
                          : "bg-slate-50 text-slate-500 hover:text-indigo-600 hover:border-indigo-100 cursor-pointer"
                      }`}
                    >
                      <Camera className="w-3 h-3" />
                      사진 {profilePhoto ? "변경" : "추가"}
                    </button>
                  </div>
                  <p className="font-sans font-medium text-sm text-indigo-600 mt-1">
                    범진전자 전무 겸 연구소장 | 前 삼성전자 오디오 핵심제품 연구개발 리더
                  </p>
                </div>
              </div>

              {/* Photo Upload & URL Configuration Panel */}
              {showPhotoConfig && (
                <div className="mt-4 p-4 bg-slate-50 rounded-2xl border border-slate-200 max-w-lg shadow-xs space-y-4 animate-fadeIn relative z-30" id="photo-config-widget">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-800 font-sans font-bold text-xs">
                      <ImageIcon className="w-4 h-4 text-indigo-600" />
                      <span>프로필 사진 커스텀 설정</span>
                    </div>
                    <button 
                      onClick={() => setShowPhotoConfig(false)}
                      className="text-[11px] text-slate-400 hover:text-slate-600 font-sans cursor-pointer"
                    >
                      닫기
                    </button>
                  </div>

                  <p className="text-[11px] text-slate-500 leading-relaxed font-sans">
                    💡 <strong>링크드인 사진 연결 방법:</strong> 내 <a href="https://www.linkedin.com/in/jongwook-park-1188992/" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline font-bold">LinkedIn 프로필</a>에 접속한 후, 프로필 이미지 위에서 <strong>마우스 우클릭 &gt; '이미지 주소 복사(Copy Image Address)'</strong>를 누르고 아래 입력란에 넣고 적용을 클릭해 주세요. 혹은 소장하고 계신 <strong>사진 파일(PNG, JPG)을 직접 업로드</strong>할 수도 있습니다.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    {/* Method 1: Local File Upload */}
                    <div className="p-3 bg-white rounded-xl border border-slate-200/50 flex flex-col justify-between">
                      <span className="text-[10px] font-mono text-slate-400 block font-bold tracking-wider mb-2">METHOD 1: 파일 업로드</span>
                      <label className="flex items-center justify-center gap-1.5 px-3 py-2 bg-indigo-50 hover:bg-indigo-100/80 text-indigo-700 text-xs font-sans font-bold rounded-lg border border-indigo-100 transition-colors cursor-pointer text-center">
                        <Upload className="w-3.5 h-3.5" />
                        사진 파일 선택
                        <input 
                          type="file" 
                          accept="image/*" 
                          onChange={handlePhotoUpload}
                          className="hidden" 
                        />
                      </label>
                    </div>

                    {/* Method 2: Image URL Submission */}
                    <form onSubmit={handlePhotoUrlSubmit} className="p-3 bg-white rounded-xl border border-slate-200/50 flex flex-col justify-between space-y-2">
                      <span className="text-[10px] font-mono text-slate-400 block font-bold tracking-wider">METHOD 2: 이미지 웹 URL 링크</span>
                      <div className="flex gap-1.5">
                        <input
                          type="url"
                          placeholder="https://media.licdn.com/..."
                          value={photoUrlInput}
                          onChange={(e) => setPhotoUrlInput(e.target.value)}
                          className="w-full text-[11px] font-sans p-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-indigo-500 text-slate-700"
                        />
                        <button 
                          type="submit"
                          className="px-2.5 py-1.5 bg-slate-900 hover:bg-slate-800 text-white text-[11px] font-sans font-bold rounded-lg cursor-pointer flex-shrink-0"
                        >
                          적용
                        </button>
                      </div>
                    </form>
                  </div>

                  {profilePhoto && (
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200/10">
                      <span className="text-[10px] font-mono text-emerald-600 font-bold flex items-center gap-1">
                        <span className="inline-block w-1.5 bg-emerald-500 rounded-full h-1.5 animate-ping" />
                        현재 이미지 반영 중
                      </span>
                      <button 
                        onClick={handleResetPhoto}
                        className="text-[10px] text-red-500 hover:text-red-650 font-sans font-semibold flex items-center gap-1 cursor-pointer bg-red-50 px-2 py-1 rounded"
                      >
                        <Trash2 className="w-3 h-3" />
                        지우고 기본 로고로 복원
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Pitch Statement */}
              <div className="mt-8 space-y-4">
                <p className="text-base text-slate-700 font-sans leading-relaxed">
                  <strong>대한민국 오디오 및 디지털 신호 처리 분야의 기술 혁신을 주도해 왔습니다.</strong> 서울대학교에서 제어계측공학 학·석·박사 학위를 수여받아 다져진 강력한 자동제어 신호 이론을 바탕으로, <strong>삼성전자 중앙연구소</strong> 및 실리콘밸리 <strong>SRA(Samsung Research America)</strong>에서 차세대 임베디드 오디오 모듈, 네트워크 허브 및 가전특화 AI 알고리즘 설계를 총괄하는 핵심 역할을 담당하였습니다.
                </p>
                <p className="text-sm text-slate-500 font-sans leading-relaxed">
                  현재는 프리미엄 가전 음향 브랜드 파트너인 <strong>범진전자 연구소장(전무)</strong>으로 근무하며 차세대 무선 오디오와 첨단 DSP 필터 알고리즘, 양산 품질 표준 프로세스를 이끌고 있습니다.
                </p>
              </div>
            </div>

            {/* Bottom Quick Specs Grid */}
            <div className="mt-8 pt-6 border-t border-slate-100 grid grid-cols-2 sm:grid-cols-4 gap-4 relative z-20" id="quick-facts-header">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold tracking-wider">주요 도메인 (Industry Focus)</span>
                <span className="text-xs font-semibold text-slate-800">프리미엄 음향 R&D / DSP</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold tracking-wider">학위 백그라운드 (Academic)</span>
                <span className="text-xs font-semibold text-slate-800">서울대 제어계측공학 박사</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold tracking-wider">주요 역량 (Core Competency)</span>
                <span className="text-xs font-semibold text-slate-800">능동제어 알고리즘 설계</span>
              </div>
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-slate-400 block uppercase font-bold tracking-wider">누적 신뢰성 제어 (Reliability)</span>
                <span className="text-xs font-semibold text-slate-800">삼성전자 全 제품 품질연구</span>
              </div>
            </div>
          </div>

          {/* Hero Right Sidebar Contact Info Card */}
          <div className="lg:col-span-4 bg-slate-900 text-slate-100 rounded-3xl p-8 shadow-sm flex flex-col justify-between relative overflow-hidden border border-slate-800" id="hero-contact-sidebar">
            {/* Subtle mesh background */}
            <div className="absolute top-0 right-0 w-44 h-44 bg-blue-500/10 rounded-full filter blur-3xl pointer-events-none" />
            
            <div className="space-y-6">
              <div>
                <span className="text-[11px] font-mono text-cyan-400 font-bold tracking-wider uppercase bg-cyan-950/80 px-2.5 py-1 rounded border border-cyan-800/40">
                  Global Networking
                </span>
                <h3 className="font-sans font-extrabold text-xl text-white mt-3">
                  박종욱 연구소장 연락처
                </h3>
                <p className="text-xs text-slate-400 font-sans mt-1">
                  기술 자문, 산학협력 R&D, 글로벌 오디오 프로젝트 제안 등 상시 소통이 가능합니다.
                </p>
              </div>

              {/* Dynamic Action Contact Lines */}
              <div className="space-y-4">
                {/* Email line click to copy */}
                <div 
                  id="click-copy-email-box"
                  onClick={copyEmailToClipboard}
                  className="p-3.5 bg-slate-800/60 border border-slate-700/50 hover:border-cyan-500/50 rounded-2xl group transition-all duration-300 cursor-pointer text-left relative"
                >
                  <span className="text-[10px] font-sans text-cyan-400 font-semibold block uppercase tracking-wider">이메일 주소 (Email)</span>
                  <div className="flex items-center justify-between gap-2 mt-1">
                    <span className="text-xs md:text-sm font-mono font-medium text-white group-hover:text-cyan-200 transition-colors">
                      RichardJWPark@gmail.com
                    </span>
                    <span className="px-2 py-0.5 rounded text-[10px] bg-slate-700/80 text-slate-300 font-sans group-hover:bg-cyan-950 group-hover:text-cyan-300 transition-colors">
                      {isCopied ? "복사됨!" : "복사"}
                    </span>
                  </div>
                </div>

                {/* Office Location info */}
                <div className="p-3.5 bg-slate-800/60 border border-slate-700/50 rounded-2xl text-left">
                  <span className="text-[10px] font-sans text-slate-400 font-semibold block uppercase tracking-wider">근무처 정보 (Office Location)</span>
                  <div className="flex items-start gap-2 mt-1.5">
                    <MapPin className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-slate-200 font-sans leading-snug">
                      범진전자 연구소 본사 (S. Korea)<br />
                      <span className="text-slate-500 font-mono text-[10px]">Senior VP & Head of R&D Lab</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick action cards/external handles */}
            <div className="mt-8 pt-6 border-t border-slate-800/80 space-y-3">
              <a
                href="https://www.linkedin.com/in/jongwook-park-1188992/"
                target="_blank"
                rel="noreferrer"
                id="link-linkedin-profile-card"
                className="flex items-center justify-between p-3.5 bg-indigo-950/55 border border-indigo-900/40 hover:bg-indigo-900/60 rounded-xl transition-all duration-300 group text-slate-200"
              >
                <div className="flex items-center gap-2">
                  <span className="p-1.5 rounded bg-indigo-600/30 text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-colors duration-200">
                    <Linkedin className="w-4 h-4" />
                  </span>
                  <div className="flex flex-col">
                    <span className="text-xs font-sans font-semibold">LinkedIn Profile</span>
                    <span className="text-[9px] font-mono text-indigo-400">Jongwook Park Link</span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover:text-white transition-colors" />
              </a>

              <div className="flex items-center justify-center gap-1.5 py-1 text-[10px] text-slate-500 font-mono">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Authorized Academic Persona
              </div>
            </div>
          </div>
        </section>

        {/* Section: Academic Control & Audio Simulator Explanation Card */}
        <section id="simulator">
          <AudioSimulator />
        </section>

        {/* Section: Professional Experience */}
        <section id="experience" className="pt-2">
          <ExperienceSection />
        </section>

        {/* Section: Education Background */}
        <section id="education" className="pt-2">
          <EducationSection />
        </section>

        {/* Section: Contact & Networking Form */}
        <section id="contact" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch pt-2">
          
          {/* Contact introduction panel */}
          <div className="lg:col-span-5 bg-gradient-to-br from-indigo-900 to-slate-950 text-white rounded-3xl p-8 relative overflow-hidden border border-indigo-950 shadow-md flex flex-col justify-between" id="contact-intro-panel">
            {/* Background design glow */}
            <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-indigo-500/20 rounded-full filter blur-3xl" />
            
            <div className="space-y-6">
              <span className="text-[11px] font-mono text-emerald-400 font-bold tracking-widest uppercase bg-emerald-950/80 px-2.5 py-1 rounded border border-emerald-800/40 self-start inline-block">
                Request Cooperation
              </span>
              
              <h3 className="font-sans font-extrabold text-2xl text-white">
                음향 혁신 솔루션 제휴 및 학술 자문 요청
              </h3>
              
              <div className="space-y-4 text-sm text-slate-300 font-sans leading-relaxed">
                <p>
                  범진전자의 혁신 오디오 기술이나 저의 삼성전자 중앙연구소·SRA 시절의 다양한 차세대 가전 인공지능 신뢰성 연구 역량을 원천으로 하는 전문 자문이 필요하시다면 아래 양식을 사용해 주시기 바랍니다.
                </p>
                <p className="text-xs text-slate-400">
                  작성해 주신 메시지는 박종욱 전용 이메일 계정 <strong className="text-white font-mono">RichardJWPark@gmail.com</strong>으로 가상 전달되어 직접 피드백을 전달드립니다.
                </p>
              </div>
            </div>

            <div className="mt-8 pt-6 border-t border-slate-800 flex items-center gap-4">
              <div className="p-2.5 rounded-full bg-slate-900/80 border border-slate-800 text-cyan-400 animate-pulse">
                <Volume2 className="w-5 h-5" />
              </div>
              <div className="font-sans">
                <p className="text-xs font-semibold text-slate-300">범진전자 오디오 R&D 연구소</p>
                <p className="text-[10px] text-slate-500 font-mono">Building Sound Innovation Globally</p>
              </div>
            </div>
          </div>

          {/* Contact form interactive input panel */}
          <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-100 p-8 shadow-sm" id="contact-form-panel">
            <h4 className="font-sans font-bold text-lg text-slate-900 mb-6 flex items-center gap-2">
              <Code className="w-5 h-5 text-indigo-500" />
              네트워킹 온라인 질문 메신저
            </h4>

            {isSent ? (
              <div className="h-64 flex flex-col items-center justify-center text-center p-6 bg-emerald-50/50 rounded-2xl border border-emerald-200/50" id="contact-success-screen">
                <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 animate-bounce">
                  <Check className="w-6 h-6" />
                </div>
                <h5 className="font-sans font-bold text-slate-950 text-lg mb-1">메시지 발송을 완료했습니다!</h5>
                <p className="text-xs text-slate-600 font-sans max-w-sm">
                  박종욱 전무/연구소장의 공식 수신함 <br />
                  <strong className="text-slate-800 font-mono">RichardJWPark@gmail.com</strong>으로 가상 접수되었습니다. 감사합니다.
                </p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit} className="space-y-4" id="online-message-form">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">성함 (Representative Name) *</label>
                    <input
                      id="input-form-name"
                      type="text"
                      required
                      placeholder="홍길동"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full text-xs font-sans p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-700"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">기업 및 기관명 (Company/Affiliation)</label>
                    <input
                      id="input-form-company"
                      type="text"
                      placeholder="범진전자 공동 R&D 파트너"
                      value={contactForm.company}
                      onChange={(e) => setContactForm({ ...contactForm, company: e.target.value })}
                      className="w-full text-xs font-sans p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-700"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">이메일 주소 (Reply Email) *</label>
                  <input
                    id="input-form-email"
                    type="email"
                    required
                    placeholder="partner@com.co.kr"
                    value={contactForm.email}
                    onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                    className="w-full text-xs font-sans p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-700"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-mono font-bold text-slate-400 uppercase tracking-wider block">협력 제안 메시지 (Detailed Proposal) *</label>
                  <textarea
                    id="input-form-message"
                    required
                    rows={4}
                    placeholder="오디오 개발 프로젝트 및 시스템 신뢰성 제어 관련 자문 요청 제안을 기재하세요."
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    className="w-full text-xs font-sans p-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-1 focus:ring-indigo-500/50 focus:border-indigo-500 text-slate-750 resize-none"
                  />
                </div>

                <button
                  id="form-submit-trigger"
                  type="submit"
                  className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-sans text-xs font-semibold rounded-xl transition-all duration-300 shadow-sm flex items-center justify-center gap-2 mt-4 cursor-pointer"
                >
                  <Send className="w-4 h-4" /> Message 전달하기
                </button>
              </form>
            )}
          </div>
        </section>
      </main>

      {/* Elegant minimalist footer */}
      <footer className="bg-white border-t border-slate-100 py-12 mt-20 text-slate-500 text-center text-xs font-sans">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <p className="font-medium text-slate-700">
            박종욱 박사 개인 가상 포트폴리오 홀딩스 주식회사
          </p>
          <p className="text-slate-400 max-w-lg mx-auto leading-relaxed">
            본 사이트는 박종욱(Jongwook Park)의 공인 경력(삼성전자, 범진전자) 및 서울대 학위 전공(제어계측공학과)을 기반으로 개발된 프리미엄 개인 디지털 홈페이지입니다.
          </p>
          <div className="pt-4 border-t border-slate-50 flex flex-wrap justify-center gap-6 text-slate-400">
            <span>Email: <strong className="text-slate-600 font-mono">RichardJWPark@gmail.com</strong></span>
            <span>LinkedIn: <a href="https://www.linkedin.com/in/jongwook-park-1188992/" target="_blank" rel="noreferrer" className="text-indigo-600 hover:underline">Profile Page</a></span>
            <span>Copyright © 2026. All Rights Reserved.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
