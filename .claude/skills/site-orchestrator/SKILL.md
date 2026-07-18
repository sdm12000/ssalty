---
name: site-orchestrator
description: "웹사이트 자동 생성 오케스트레이터. 사용자가 사이트 컨셉을 프롬프트로 제공하면, 컨셉 분석 → 디자인 시스템 설계 → 코드 구현 → 품질 검증의 파이프라인으로 고퀄리티 웹사이트를 자동 생성한다. '사이트 만들어줘', '웹사이트 제작', '홈페이지 만들어줘', '랜딩페이지', '포트폴리오 사이트', '쇼핑몰 만들어줘' 등 웹사이트 생성 요청 시 반드시 이 스킬을 사용하라. 사이트 수정, 디자인 변경, 기능 추가, 다시 만들어줘, 개선해줘 등 후속 작업에도 이 스킬을 사용하라."
---

# 웹사이트 자동 생성 오케스트레이터

## 실행 모드: 에이전트 팀 (파이프라인)

4명의 전문가 에이전트가 순차적으로 협업하여 고퀄리티 웹사이트를 생성한다. 디자인 품질이 최우선 가치다.

## 에이전트 구성

| 멤버 | 에이전트 타입 | 역할 | 스킬 | 산출물 |
|------|-------------|------|------|--------|
| concept-analyst | general-purpose | 컨셉 분석 & 트렌드 리서치 | concept-analysis | `_workspace/01_concept_brief.md` |
| design-architect | general-purpose | 디자인 시스템 설계 | design-system | `_workspace/02_design_system.md` |
| frontend-engineer | general-purpose | Next.js 코드 구현 | site-builder | 프로젝트 코드 + `_workspace/03_implementation_manifest.md` |
| design-qa | general-purpose | 디자인 & 코드 품질 검증 | design-qa | `_workspace/04_qa_report.md` |

## 워크플로우

### Phase 0: 컨텍스트 확인

1. `_workspace/` 디렉토리 존재 여부를 확인한다
2. 실행 모드를 결정한다:

| 상태 | 모드 | 동작 |
|------|------|------|
| `_workspace/` 없음 | **초기 실행** | Phase 1부터 전체 실행 |
| `_workspace/` 있음 + 사용자가 부분 수정 요청 | **부분 재실행** | 해당 에이전트만 재호출 |
| `_workspace/` 있음 + 새 컨셉 | **새 실행** | `_workspace/`를 `_workspace_{timestamp}/`로 이동, Phase 1부터 |

3. 부분 재실행 판단 기준:
   - "디자인 수정해줘" → design-architect + frontend-engineer + design-qa
   - "코드 수정해줘" → frontend-engineer + design-qa
   - "컬러 바꿔줘" → design-architect + frontend-engineer + design-qa
   - "애니메이션 추가해줘" → frontend-engineer + design-qa
   - "전체적으로 다시" → 새 실행

### Phase 1: 준비

1. 사용자 프롬프트를 분석한다
2. `_workspace/` 디렉토리를 생성한다
3. 사용자 요청을 `_workspace/00_user_request.md`에 저장한다

### Phase 2: 팀 구성

에이전트 팀을 생성한다. 모든 멤버에게 사용자의 원본 요청과 작업 컨텍스트를 전달한다.

```
TeamCreate(
  team_name: "site-builder-team",
  members: [
    {
      name: "concept-analyst",
      agent_type: "concept-analyst",
      model: "opus",
      prompt: "당신은 컨셉 분석 전문가입니다.

[사용자 요청]
{user_request}

[작업 지시]
1. .claude/skills/concept-analysis/SKILL.md를 읽고 워크플로우를 따르라
2. 사용자의 컨셉을 분석하고 최신 트렌드를 리서치하라
3. 상세 디자인 브리프를 _workspace/01_concept_brief.md에 작성하라
4. 완료 후 design-architect에게 SendMessage로 핵심 방향을 요약 전달하라
5. TaskUpdate로 태스크를 완료 처리하라

[핵심 원칙]
AI가 만든 것 같은 뻔한 구성을 피하는 차별화된 컨셉을 잡아라. 디자인이 가장 중요하다."
    },
    {
      name: "design-architect",
      agent_type: "design-architect",
      model: "opus",
      prompt: "당신은 디자인 시스템 설계 전문가입니다.

[사용자 요청]
{user_request}

[작업 지시]
1. concept-analyst의 브리프 완성을 기다려라 (태스크 의존성)
2. _workspace/01_concept_brief.md를 읽어라
3. .claude/skills/design-system/SKILL.md를 읽고 디자인 시스템을 설계하라
4. 필요시 .claude/skills/design-system/references/design-trends.md를 참조하라
5. _workspace/02_design_system.md에 완전한 디자인 시스템을 작성하라
6. 완료 후 frontend-engineer에게 SendMessage로 핵심 기술 결정사항을 전달하라
7. TaskUpdate로 태스크를 완료 처리하라

[핵심 원칙]
Awwwards 수상작 수준의 디자인을 목표로 하라. 비대칭, 여백, 깊이감, 디테일에 집착하라."
    },
    {
      name: "frontend-engineer",
      agent_type: "frontend-engineer",
      model: "opus",
      prompt: "당신은 프론트엔드 엔지니어입니다.

[사용자 요청]
{user_request}

[작업 지시]
1. design-architect의 디자인 시스템 완성을 기다려라 (태스크 의존성)
2. _workspace/01_concept_brief.md와 _workspace/02_design_system.md를 읽어라
3. .claude/skills/site-builder/SKILL.md를 읽고 프로젝트를 구현하라
4. 필요시 references/animation-patterns.md, references/nextjs-patterns.md를 참조하라
5. Next.js 15 프로젝트를 생성하고 전체 코드를 구현하라
6. npm run build로 빌드 성공을 확인하라
7. _workspace/03_implementation_manifest.md에 구현 매니페스트를 작성하라
8. 완료 후 design-qa에게 SendMessage로 빌드 상태와 확인 포인트를 전달하라
9. TaskUpdate로 태스크를 완료 처리하라

[핵심 원칙]
디자인 시스템의 값을 100% 존중하라. 디자인 품질 > 코드 편의성이다. 애니메이션에 특히 공을 들여라."
    },
    {
      name: "design-qa",
      agent_type: "design-qa",
      model: "opus",
      prompt: "당신은 디자인 QA 전문가입니다.

[사용자 요청]
{user_request}

[작업 지시]
1. frontend-engineer의 구현 완료를 기다려라 (태스크 의존성)
2. _workspace/01_concept_brief.md, _workspace/02_design_system.md, _workspace/03_implementation_manifest.md를 읽어라
3. .claude/skills/design-qa/SKILL.md를 읽고 전체 검증을 수행하라
4. _workspace/04_qa_report.md에 QA 리포트를 작성하라
5. FIX/CRITICAL 항목이 있으면 frontend-engineer에게 SendMessage로 수정 요청하라
6. frontend-engineer 수정 후 해당 항목을 재검증하라 (최대 2라운드)
7. 최종 QA 리포트를 업데이트하고 리더에게 종합 결과를 보고하라
8. TaskUpdate로 태스크를 완료 처리하라

[핵심 원칙]
'AI가 만든 것 같은가?'가 가장 중요한 검증 기준이다. AI 탈취 점수 7점 이상을 목표로 하라."
    }
  ]
)
```

태스크를 등록한다:

```
TaskCreate(tasks: [
  {
    title: "컨셉 분석 & 트렌드 리서치",
    description: "사용자 컨셉을 분석하고 최신 디자인 트렌드를 리서치하여 디자인 브리프를 작성한다",
    assignee: "concept-analyst"
  },
  {
    title: "디자인 시스템 설계",
    description: "컨셉 브리프를 기반으로 컬러, 타이포그래피, 레이아웃, 모션을 포함한 완전한 디자인 시스템을 설계한다",
    assignee: "design-architect",
    depends_on: ["컨셉 분석 & 트렌드 리서치"]
  },
  {
    title: "Next.js 프로젝트 구현",
    description: "디자인 시스템을 기반으로 Next.js 15 + Tailwind CSS v4 + Framer Motion + GSAP으로 전체 사이트를 구현한다",
    assignee: "frontend-engineer",
    depends_on: ["디자인 시스템 설계"]
  },
  {
    title: "디자인 & 코드 품질 검증",
    description: "구현 결과를 디자인 충실도, AI 탈취, 코드 품질, 반응형 관점에서 검증하고 수정을 요청한다",
    assignee: "design-qa",
    depends_on: ["Next.js 프로젝트 구현"]
  }
])
```

### Phase 3: 파이프라인 실행

팀원들이 태스크 의존성에 따라 순차 실행한다. 리더는 모니터링한다.

**실행 흐름:**
```
concept-analyst (작업중)
    ↓ 완료 → SendMessage → design-architect (작업 시작)
    ↓ 완료 → SendMessage → frontend-engineer (작업 시작)
    ↓ 완료 → SendMessage → design-qa (검증 시작)
    ↓ FIX 발견 → SendMessage → frontend-engineer (수정)
    ↓ 수정 완료 → SendMessage → design-qa (재검증)
    ↓ 최종 리포트 → 리더에게 보고
```

**리더 모니터링:**
- TaskGet으로 진행 상황 확인
- 멤버가 idle 상태가 되면 자동 알림 수신
- 블로킹 이슈 발생 시 개입

**QA 피드백 루프:**
- design-qa가 FIX/CRITICAL 항목을 frontend-engineer에게 전달
- frontend-engineer가 수정 후 design-qa에게 재검증 요청
- 최대 2라운드 반복
- 2라운드 후에도 C등급 이하면 리더에게 보고, 사용자 확인 요청

### Phase 4: 결과 수집 & 보고

1. 모든 멤버의 태스크 완료를 확인한다 (TaskGet)
2. 최종 산출물을 수집한다:
   - `_workspace/01_concept_brief.md` — 컨셉 브리프
   - `_workspace/02_design_system.md` — 디자인 시스템
   - `_workspace/03_implementation_manifest.md` — 구현 매니페스트
   - `_workspace/04_qa_report.md` — QA 리포트
   - 프로젝트 소스 코드 전체
3. QA 리포트의 종합 등급을 확인한다
4. 사용자에게 결과를 보고한다:

```markdown
## 사이트 생성 완료

**QA 등급: [등급]**

### 생성된 사이트
- 기술 스택: Next.js 15 + Tailwind CSS v4 + Framer Motion + GSAP
- 페이지: [목록]
- 주요 특징: [디자인 하이라이트]

### 실행 방법
npm run dev → http://localhost:3000

### QA 요약
- 디자인 충실도: [점수]/10
- AI 탈취 점수: [점수]/10
- [CRITICAL/FIX 항목 있으면 요약]

### 개선 가능 사항
[QA 리포트의 개선 제안 요약]
```

### Phase 5: 정리

1. 팀원 종료 요청 (SendMessage)
2. 팀 정리 (TeamDelete)
3. `_workspace/` 보존 (사후 검증, 후속 작업용)
4. 사용자에게 피드백 요청:
   - "결과에서 개선할 부분이 있나요?"
   - "디자인이나 기능에서 바꾸고 싶은 점이 있으면 말씀해주세요."

## 데이터 흐름

```
[리더/오케스트레이터]
    │
    ├── TeamCreate(site-builder-team)
    │
    ├── [concept-analyst]
    │      ├─ WebSearch (트렌드 리서치)
    │      ├─ Write: _workspace/01_concept_brief.md
    │      └─ SendMessage → design-architect
    │
    ├── [design-architect]
    │      ├─ Read: 01_concept_brief.md
    │      ├─ Read: design-system/SKILL.md + references/
    │      ├─ Write: _workspace/02_design_system.md
    │      └─ SendMessage → frontend-engineer
    │
    ├── [frontend-engineer]
    │      ├─ Read: 01_concept_brief.md + 02_design_system.md
    │      ├─ Read: site-builder/SKILL.md + references/
    │      ├─ 프로젝트 생성 + 코드 구현
    │      ├─ npm run build (검증)
    │      ├─ Write: _workspace/03_implementation_manifest.md
    │      └─ SendMessage → design-qa
    │
    ├── [design-qa]
    │      ├─ Read: 01 + 02 + 03 + 소스 코드
    │      ├─ npm run build (재검증)
    │      ├─ Write: _workspace/04_qa_report.md
    │      ├─ SendMessage → frontend-engineer (FIX 항목)
    │      │      └─ frontend-engineer 수정 → SendMessage → design-qa 재검증
    │      └─ 최종 리포트 → 리더
    │
    └── [리더: 결과 수집 & 사용자 보고]
```

## 에러 핸들링

| 상황 | 전략 |
|------|------|
| concept-analyst WebSearch 실패 | 기존 디자인 지식으로 브리프 작성, 검색 실패 명시 |
| design-architect 디자인 결정 모호 | concept-analyst에게 SendMessage로 확인, 응답 없으면 최선의 판단으로 진행 |
| frontend-engineer 빌드 실패 | 에러 분석 → 수정 → 재빌드 (최대 3회), 실패 시 리더 보고 |
| design-qa C등급 이하 | 2라운드 수정 시도, 여전히 C 이하면 리더가 사용자에게 보고 후 방향 결정 |
| 1명 에러로 중단 | 리더가 감지 → 재시작 시도 → 실패 시 해당 멤버 없이 진행 가능한 범위까지 실행 |
| 50% 이상 실패 | 사용자에게 보고, 계속 진행 여부 확인 |
| 타임아웃 | 현재까지의 산출물로 결과 보고, 미완성 부분 명시 |

## 테스트 시나리오

### 정상 흐름
1. 사용자: "미니멀한 디자인 에이전시 포트폴리오 사이트 만들어줘"
2. Phase 1: 요청 파싱 → _workspace/ 생성
3. Phase 2: 4명 팀 생성 + 4개 태스크 등록
4. Phase 3:
   - concept-analyst: 디자인 에이전시 트렌드 리서치 → 미니멀 포트폴리오 브리프
   - design-architect: 모노톤 + 서체 대비 디자인 시스템
   - frontend-engineer: Next.js 프로젝트 구현 + 빌드 성공
   - design-qa: B등급 → FIX 3개 → frontend-engineer 수정 → A등급
5. Phase 4: 사용자에게 A등급 결과 보고
6. Phase 5: 팀 정리, 피드백 요청

### 에러 흐름
1. 사용자: "3D 인터랙티브 제품 쇼케이스 사이트 만들어줘"
2. Phase 3: frontend-engineer가 Three.js 통합에서 빌드 에러 발생
3. frontend-engineer: 3회 수정 시도 → 여전히 실패 → 리더에게 보고
4. 리더: 사용자에게 "3D 요소에서 기술적 제약이 있습니다. 2D 애니메이션으로 대체하거나, 단순화된 3D를 시도할 수 있습니다. 어떻게 할까요?" 확인
5. 사용자 결정에 따라 design-architect → frontend-engineer → design-qa 재실행
