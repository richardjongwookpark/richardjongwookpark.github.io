/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from "react";
import { Sliders, Activity, Zap, Volume2, ShieldAlert } from "lucide-react";

export default function AudioSimulator() {
  const [frequency, setFrequency] = useState<number>(440); // 440Hz standard A
  const [damping, setDamping] = useState<number>(0.2); // ζ - damping factor
  const [feedbackGain, setFeedbackGain] = useState<number>(1.5); // K - control gain
  const [noiseLevel, setNoiseLevel] = useState<number>(0.3); // Ambient noise level
  const [isControlActive, setIsControlActive] = useState<boolean>(true); // Active feedforward correction
  const [selectedPreset, setSelectedPreset] = useState<string>("default");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);
  const phaseRef = useRef<number>(0);

  // Apply presets to demonstrate his career expertise areas
  const applyPreset = (preset: string) => {
    setSelectedPreset(preset);
    if (preset === "anc") {
      // Active Noise Cancellation Focus (Premium Headset/Audio)
      setFrequency(220);
      setDamping(0.8);
      setFeedbackGain(2.5);
      setNoiseLevel(0.6);
      setIsControlActive(true);
    } else if (preset === "soundbar") {
      // Premium Soundbar Acoustic Calibration
      setFrequency(540);
      setDamping(0.4);
      setFeedbackGain(1.8);
      setNoiseLevel(0.15);
      setIsControlActive(true);
    } else if (preset === "unstable") {
      // Uncontrolled feedback resonance (High quality/Reliability testing)
      setFrequency(880);
      setDamping(0.05);
      setFeedbackGain(0.2);
      setNoiseLevel(0.4);
      setIsControlActive(false);
    } else {
      // Standard balanced audio R&D
      setFrequency(440);
      setDamping(0.25);
      setFeedbackGain(1.5);
      setNoiseLevel(0.3);
      setIsControlActive(true);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Handle canvas dimensions with high-density DPI support
    const resizeCanvas = () => {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * window.devicePixelRatio;
      canvas.height = rect.height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resizeCanvas();

    // Create custom ResizeObserver to handle responsiveness natively and safely
    const observer = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (canvas.parentElement) {
      observer.observe(canvas.parentElement);
    }

    const draw = () => {
      const width = canvas.width / window.devicePixelRatio;
      const height = canvas.height / window.devicePixelRatio;

      // Clear Canvas
      ctx.fillStyle = "#0c101b"; // Dark deep cosmic background
      ctx.fillRect(0, 0, width, height);

      // Draw Grid System representing measuring grid
      ctx.strokeStyle = "rgba(40, 50, 80, 0.4)";
      ctx.lineWidth = 1;
      
      // Horizontal grids
      const gridRows = 6;
      for (let i = 1; i < gridRows; i++) {
        const y = (height / gridRows) * i;
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
      
      // Vertical grids
      const gridCols = 12;
      for (let i = 1; i < gridCols; i++) {
        const x = (width / gridCols) * i;
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }

      // Center Reference Line (0v)
      ctx.strokeStyle = "rgba(100, 116, 139, 0.5)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([5, 5]);
      ctx.beginPath();
      ctx.moveTo(0, height / 2);
      ctx.lineTo(width, height / 2);
      ctx.stroke();
      ctx.setLineDash([]); // Reset line dash

      const midY = height / 2;
      const wavePoints: number[] = [];
      const controlPoints: number[] = [];
      const outputPoints: number[] = [];

      // Phase update rate depends on frequency
      phaseRef.current += (frequency / 1000) * 0.15;

      for (let x = 0; x < width; x++) {
        const normalizedX = x / width;
        // Generate raw acoustic sine wave with exponential decay envelope representing resonance control
        const envelope = Math.exp(-damping * normalizedX * 4);
        const originalWave = Math.sin(normalizedX * Math.PI * 10 + phaseRef.current) * 45 * envelope;
        
        // Add pseudo-random white noise (disturbances standard in Control Automation)
        const rawNoise = (Math.sin(normalizedX * 123.45 + phaseRef.current * 3) + Math.cos(normalizedX * 456.78 - phaseRef.current * 1.5)) * 0.5;
        const cumulativeNoise = rawNoise * noiseLevel * 35;
        const dynamicInput = originalWave + cumulativeNoise;

        // Active control simulation calculations
        // Real-time control acts as anti-phase canceling signal using the feedback Gain value K
        const antiFeedbackFactor = isControlActive ? -1 * (1 - Math.exp(-feedbackGain)) : 0;
        const controlSignal = (originalWave + cumulativeNoise * 0.8) * antiFeedbackFactor;

        // Superposition yields optimized output
        // High feedback gain controls noise, high damping flattens resonance spikes
        const optimizedOutput = dynamicInput + controlSignal;

        wavePoints.push(dynamicInput);
        controlPoints.push(controlSignal);
        outputPoints.push(optimizedOutput);
      }

      // -- Draw Base / Noisy Audio Input Wave --
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = "rgba(239, 68, 68, 0.75)"; // Crimson Red for noisy/distorted signal
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        if (x === 0) ctx.moveTo(x, midY + wavePoints[x]);
        else ctx.lineTo(x, midY + wavePoints[x]);
      }
      ctx.stroke();

      // -- Draw Control Correction Signal (Anti-noise) --
      if (isControlActive) {
        ctx.lineWidth = 1.5;
        ctx.strokeStyle = "rgba(168, 85, 247, 0.7)"; // Amethyst Purple for control correction wave
        ctx.setLineDash([2, 3]);
        ctx.beginPath();
        for (let x = 0; x < width; x++) {
          if (x === 0) ctx.moveTo(x, midY + controlPoints[x]);
          else ctx.lineTo(x, midY + controlPoints[x]);
        }
        ctx.stroke();
        ctx.setLineDash([]);
      }

      // -- Draw Final Clean Optimized Wave --
      ctx.lineWidth = 2.5;
      ctx.strokeStyle = isControlActive ? "#06b6d4" : "rgba(239, 68, 68, 0.5)"; // Deep Cyan for optimized / same warning red
      ctx.shadowBlur = isControlActive ? 8 : 0;
      ctx.shadowColor = "#06b6d4";
      ctx.beginPath();
      for (let x = 0; x < width; x++) {
        if (x === 0) ctx.moveTo(x, midY + outputPoints[x]);
        else ctx.lineTo(x, midY + outputPoints[x]);
      }
      ctx.stroke();
      ctx.shadowBlur = 0; // Reset shadow

      // Render Text indicators on the canvas relative coordinates for technical aesthetics
      ctx.fillStyle = "#94a3b8";
      ctx.font = "10px monospace";
      ctx.fillText(`FREQ: ${frequency.toFixed(0)} Hz`, 15, 20);
      ctx.fillText(`DAMPING (ζ): ${damping.toFixed(2)}`, 15, 35);
      ctx.fillText(`FEEDBACK GAIN (K): ${feedbackGain.toFixed(2)}`, 15, 50);
      ctx.fillText(`CONTROL STATE: ${isControlActive ? "ENGAGED" : "BYPASSED"}`, 15, 65);

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      observer.disconnect();
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [frequency, damping, feedbackGain, noiseLevel, isControlActive]);  return (
    <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs relative overflow-hidden text-slate-800" id="audio-simulator-container">
      {/* Background radial soft light */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-50/30 rounded-full filter blur-3xl pointer-events-none" />

      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="p-1.5 rounded-lg bg-blue-50 border border-blue-200 text-blue-600">
              <Activity className="w-5 h-5" />
            </span>
            <h3 className="font-sans font-extrabold text-lg text-slate-900">
              제어계측 & 음향 제어 루프 시뮬레이션
            </h3>
          </div>
          <p className="text-xs text-slate-500 font-sans mt-0.5 leading-relaxed">
            박종욱 박사의 전문 도메인인 서울대 <span className="text-blue-600 font-bold">제어계측공학(Control Systems)</span> 교차 설계 기법과 삼성·범진 <span className="text-blue-600 font-bold">오디오 디지털 신호 처리(DSP)</span> 능동 제어 루프를 시뮬레이션합니다.
          </p>
        </div>

        {/* Technical Badges / Preset Selector */}
        <div className="flex flex-wrap gap-1.5 self-start md:self-center">
          <button
            id="preset-default"
            onClick={() => applyPreset("default")}
            className={`px-3 py-1 rounded-full text-xs font-sans tracking-wide transition border ${
              selectedPreset === "default"
                ? "bg-slate-900 text-white border-slate-900 font-semibold"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            기본 벨런스
          </button>
          <button
            id="preset-anc"
            onClick={() => applyPreset("anc")}
            className={`px-3 py-1 rounded-full text-xs font-sans tracking-wide transition border ${
              selectedPreset === "anc"
                ? "bg-blue-50 text-blue-700 border-blue-300 font-semibold"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            노이즈 액티브 캔슬링
          </button>
          <button
            id="preset-soundbar"
            onClick={() => applyPreset("soundbar")}
            className={`px-3 py-1 rounded-full text-xs font-sans tracking-wide transition border ${
              selectedPreset === "soundbar"
                ? "bg-blue-50 text-blue-700 border-blue-300 font-semibold"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            사운드바 자동보정
          </button>
          <button
            id="preset-unstable"
            onClick={() => applyPreset("unstable")}
            className={`px-3 py-1 rounded-full text-xs font-sans tracking-wide transition border ${
              selectedPreset === "unstable"
                ? "bg-red-50 text-red-700 border-red-300 font-semibold"
                : "bg-slate-50 text-slate-600 border-slate-200 hover:bg-slate-100"
            }`}
          >
            불안정 공진 테스트
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mt-6">
        {/* Canvas Display View */}
        <div className="lg:col-span-7 flex flex-col gap-2">
          <div className="relative border border-slate-850 rounded-xl bg-[#090d16] h-60 min-h-[240px] overflow-hidden shadow-inner flex flex-col justify-end">
            <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />
            
            {/* Real-time status tags layered over canvas and safe for mouse actions */}
            <div className="absolute top-3 right-3 flex flex-col gap-1.5 pointer-events-none items-end">
              <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-rose-950/80 text-rose-400 border border-rose-800/30 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-pulse" />
                Raw Input Oscillation
              </span>
              {isControlActive && (
                <span className="px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase bg-blue-950/80 text-blue-450 border border-blue-800/30 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                  Optimal Anti-Phase DSP
                </span>
              )}
              <span className={`px-2 py-0.5 rounded text-[10px] font-mono tracking-widest uppercase flex items-center gap-1 border ${
                isControlActive 
                  ? "bg-cyan-955/80 text-cyan-400 border-cyan-800/30" 
                  : "bg-[#090d16] text-slate-400 border-slate-800/50"
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full ${isControlActive ? "bg-cyan-400" : "bg-slate-500"}`} />
                {isControlActive ? "Corrected Output System" : "Noisy Bypass Wave"}
              </span>
            </div>
          </div>

          {/* Quick Technical interpretation explanation */}
          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 flex items-start gap-2.5">
            <ShieldAlert className={`w-4 h-4 mt-0.5 flex-shrink-0 ${isControlActive ? "text-blue-600" : "text-red-500 animate-bounce"}`} />
            <p className="text-[11px] font-sans text-slate-650 leading-normal">
              {isControlActive ? (
                <span>
                  <strong>현재 제어 상태:</strong> 최적 제어기(PID/LQR 결합형 피드백)가 가동되어 적색 원본 신호의 외란 및 고조파를 감지하고 역위상 신호(자색 점선)를 산출해 내어 왜곡이 제로화된 부드러운 사인파 <strong>초색/청색 파형</strong>을 유지 중입니다.
                </span>
              ) : (
                <span>
                  <strong>경고:</strong> 능동 감쇠 제어기가 우회(Bypass)되었습니다. 외부 오차와 물리적 설계 공진의 불일치로 오디오 스피커 유닛이 과도하게 떨려 적색 유해 왜곡 노이즈가 그대로 출력되고 있습니다.
                </span>
              )}
            </p>
          </div>
        </div>

        {/* Precision Controllers Controls Box */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-5 bg-slate-50 p-5 rounded-xl border border-slate-200">
          <div className="space-y-4">
            <h4 className="font-sans font-bold text-xs uppercase tracking-widest text-slate-700 flex items-center gap-1.5">
              <Sliders className="w-4 h-4 text-blue-600" />
              DSP & 시스템 제어 정밀 파라미터
            </h4>

            {/* Slider 1: Frequency */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-slate-500 font-medium">발진 기본 주파수 (F0)</span>
                <span className="font-mono text-blue-600 font-bold">{frequency} Hz</span>
              </div>
              <input
                id="slider-frequency"
                type="range"
                min="100"
                max="1000"
                step="10"
                value={frequency}
                onChange={(e) => {
                  setFrequency(Number(e.target.value));
                  setSelectedPreset("custom");
                }}
                className="w-full accent-blue-600 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Slider 2: Damping Factor */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-slate-500 font-medium">계측 댐핑 계수 (ζ - Damping)</span>
                <span className="font-mono text-slate-700 font-bold">{damping.toFixed(2)}</span>
              </div>
              <input
                id="slider-damping"
                type="range"
                min="0.01"
                max="1.00"
                step="0.05"
                value={damping}
                onChange={(e) => {
                  setDamping(Number(e.target.value));
                  setSelectedPreset("custom");
                }}
                className="w-full accent-slate-700 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Slider 3: Feedback Gain */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-slate-500 font-medium">피드백 제어 루프 이득 (K - Feedback Gain)</span>
                <span className="font-mono text-blue-500 font-bold">{feedbackGain.toFixed(2)}</span>
              </div>
              <input
                id="slider-gain"
                type="range"
                min="0.1"
                max="4.0"
                step="0.1"
                value={feedbackGain}
                onChange={(e) => {
                  setFeedbackGain(Number(e.target.value));
                  setSelectedPreset("custom");
                }}
                className="w-full accent-blue-500 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>

            {/* Slider 4: Noise Level */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-sans">
                <span className="text-slate-500 font-medium">주변 물리적 노이즈 왜란 (Noise)</span>
                <span className="font-mono text-red-500 font-bold">{(noiseLevel * 100).toFixed(0)}%</span>
              </div>
              <input
                id="slider-noise"
                type="range"
                min="0.0"
                max="1.0"
                step="0.05"
                value={noiseLevel}
                onChange={(e) => {
                  setNoiseLevel(Number(e.target.value));
                  setSelectedPreset("custom");
                }}
                className="w-full accent-red-500 h-1 bg-slate-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
          </div>

          {/* Core active control toggler */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Volume2 className={`w-5 h-5 ${isControlActive ? "text-blue-600" : "text-slate-400"}`} />
              <div className="flex flex-col">
                <span className="text-xs font-sans font-bold text-slate-700">능동 소음 제어기 (Active Filter)</span>
                <span className="text-[10px] text-slate-400 font-mono">Feedback Noise Control Engine</span>
              </div>
            </div>
            
            <button
              id="control-activate-toggle"
              onClick={() => {
                setIsControlActive(!isControlActive);
                setSelectedPreset("custom");
              }}
              className={`p-[3px] w-12 h-6 flex items-center rounded-full transition-colors duration-300 focus:outline-none border border-slate-300 ${
                isControlActive ? "bg-blue-600 justify-end" : "bg-slate-300 justify-start"
              }`}
            >
              <div className="w-4.5 h-4.5 rounded-full bg-white shadow-xs transform transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
