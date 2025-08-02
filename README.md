# 달레 스터디 AI 챗봇

달레 스터디 커뮤니티를 위한 AI 챗봇 서비스입니다.

## 🏗️ 프로젝트 구조

```
dalestudy-chatbot/
├── frontend/          # React + TypeScript + Vite
├── backend/           # Node.js + Express + TypeScript  
├── data/             # JSON 데이터 파일
├── PLAN.md           # 프로젝트 계획서
└── README.md         # 이 파일
```

## 🚀 빠른 시작

### Prerequisites
- Node.js 18+ 
- npm 또는 yarn

### 1. 저장소 클론
```bash
git clone <repository-url>
cd dalestudy-chatbot
```

### 2. 백엔드 실행
```bash
cd backend
cp .env.example .env
npm install
npm run dev
```

백엔드 서버가 http://localhost:8080 에서 실행됩니다.

### 3. 프론트엔드 실행  
```bash
cd frontend
cp .env.example .env
npm install  
npm run dev
```

프론트엔드가 http://localhost:3000 에서 실행됩니다.

## 📁 주요 파일

### Frontend
- `src/components/ChatInterface.tsx` - 메인 채팅 인터페이스
- `src/components/MessageList.tsx` - 메시지 리스트 컴포넌트
- `src/components/ChatInput.tsx` - 메시지 입력 컴포넌트
- `src/api/index.ts` - API 호출 함수들
- `src/types/index.ts` - TypeScript 타입 정의

### Backend
- `src/index.ts` - Express 서버 메인 파일
- `src/routes/chat.ts` - 채팅 API 라우터
- `src/routes/search.ts` - 검색 API 라우터
- `src/services/searchService.ts` - Fuse.js 검색 서비스
- `src/utils/dataLoader.ts` - JSON 데이터 로더
- `src/types/index.ts` - TypeScript 타입 정의

### Data
- `data/study-projects.json` - 스터디 프로젝트 및 FAQ 데이터

## 🔧 개발 명령어

### Backend
```bash
npm run dev      # 개발 서버 실행 (watch mode)
npm run build    # TypeScript 빌드
npm run start    # 프로덕션 서버 실행
npm run lint     # ESLint 실행
```

### Frontend  
```bash
npm run dev      # 개발 서버 실행
npm run build    # 프로덕션 빌드
npm run preview  # 빌드된 파일 미리보기
npm run lint     # ESLint 실행
```

## 🌐 API 엔드포인트

### POST /api/chat
사용자 메시지를 처리하고 AI 응답을 반환합니다.

**Request:**
```json
{
  "message": "달레 스터디에 어떻게 참여하나요?"
}
```

**Response:**
```json
{
  "message": "웹사이트에서 관심 있는 스터디를 선택하고...",
  "sources": [...]
}
```

### GET /api/search
키워드로 스터디 정보를 검색합니다.

**Request:**
```
GET /api/search?q=React 스터디
```

**Response:**
```json
{
  "query": "React 스터디",
  "category": "study", 
  "results": [...]
}
```

## 🛠️ 다음 단계

1. **LLM API 연동** - OpenAI 또는 Anthropic API 연결
2. **프롬프트 엔지니어링** - 더 나은 답변을 위한 프롬프트 최적화
3. **UI/UX 개선** - 더 나은 사용자 경험을 위한 디자인 개선
4. **배포 설정** - Vercel + Railway/Render 배포 구성

## 📝 라이센스

MIT License
