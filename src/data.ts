/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Experience, Education } from "./types";

export const experiences: Experience[] = [
  {
    id: "bumjin",
    company: "범진전자 (BUMJIN Electronics)",
    period: "2020 - Present",
    role: "부사장 / 연구소장 (VP, Head of R&D Institute)",
    description: "범진전자의 기술 혁신을 주도하며 글로벌 프리미엄 오디오 제품과 음향 소프트웨어 솔루션 개발 전반을 총괄하고 있습니다.",
    achievements: [
      "차세대 프리미엄 무선 오디오 및 고성능 디지털 사운드바 스마트 제품 기술 라인업 구축",
      "임베디드 오디오 디지털 신호 처리(DSP) 기술 고도화 및 고해상도 코덱 최적화 상용화",
      "음향 핵심 원천 기술 연구소 조직 경쟁력 강화 및 핵심 특허 포트폴리오 다각화",
      "글로벌 탑티어 고객사 공동 R&D 프로젝트 다수 성공 및 차세대 오디오 프로덕트 양산화 주도"
    ],
    techKeywords: ["Audio DSP", "Wireless Audio", "Acoustic Engineering", "IoT Convergence", "Project Leadership"],
    logoType: "bumjin"
  },
  {
    id: "samsung",
    company: "삼성전자 (Samsung Electronics)",
    period: "1994 - 2020",
    role: "수석연구원 / 오디오 제품 개발 총괄 & 연구 리더 (SRA / 중앙연구소)",
    description: "삼성전자 연구개발 본진인 중앙연구소와 실리콘밸리 Samsung Research America(SRA)를 거치며 최고 수준의 차세대 네트워크, AI 기술 및 소비재 기기 신뢰성을 이끌어 냈습니다.",
    achievements: [
      "중앙연구소 및 SRA에서 차세대 통신 네트워크 솔루션 및 가전 내재용 인공지능(AI) 관련 특허 및 상용화 기술 개발 주도",
      "삼성 크리에이티브 홈 오디오 및 플래그십 무선 스피커, 프리미엄 사운드바 제품 개발 총괄 연구 주도",
      "삼성전자 본사 차원의 전체 생산 가전 라인업 및 IT 기기의 물리적 신뢰성(Reliability)과 가동 수명 예측/품질 공학 연구 수행",
      "오디오/네트워크 알고리즘 설계 및 대규모 하드웨어-소프트웨어 시스템 결함률 제로화 품질 표준 수립"
    ],
    techKeywords: ["Next-Gen Networks", "On-Device AI", "Audio Engineering", "Reliability Engineering", "System Calibration", "SRA Collaboration"],
    logoType: "samsung"
  }
];

export const educations: Education[] = [
  {
    id: "phd",
    degree: "공학박사 (Ph.D.)",
    field: "제어계측공학과 (Control and Instrumentation Engineering)",
    school: "서울대학교 대학원 (Seoul National University Graduate School)",
    period: "1991 - 1995",
    details: [
      "신호처리(Signal Processing), 피드백 제어 시스템(Feedback Control System), 최적 제어 및 상태 추정 알고리즘 연구",
      "오디오 및 디지털 신호 복원, 액티브 노이즈 캔슬레이션(ANC) 제어 기반이 되는 다변수 시스템 제어 논문 완성"
    ]
  },
  {
    id: "ms",
    degree: "공학석사 (M.S.)",
    field: "제어계측공학과 (Control and Instrumentation Engineering)",
    school: "서울대학교 대학원 (Seoul National University Graduate School)",
    period: "1989 - 1991",
    details: [
      "실시간 디지털 컨트롤러 및 센서 융합 시스템 설계 연구",
      "마이크로프로세서 기반 적응형 신호 필터링 최적화 연구"
    ]
  },
  {
    id: "bs",
    degree: "공학학사 (B.S.)",
    field: "제어계측공학과 (Control and Instrumentation Engineering)",
    school: "서울대학교 공과대학 (Seoul National University College of Engineering)",
    period: "1985 - 1989",
    details: [
      "서울대학교 제어계측공학과 우수 졸업",
      "기초 전기전자 회로 설계, 자동제어 이론, 임베디드 오토메이션 학업 수행"
    ]
  }
];
