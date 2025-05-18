# ♻️ PI-BE: 업사이클링/리사이클링 제품 검색 백엔드

안녕하세요! 👋  
**PI-BE**는 업사이클링·리사이클링 제품을 손쉽게 검색할 수 있도록 도와주는 플랫폼의 **백엔드 레포지토리**입니다.  
AI 이미지 분석을 통해 **재료를 인식하고**, 해당 재료로 만들어진 제품과 제작 업체를 손쉽게 검색할 수 있어요! 🔍

---

## 🔧 기술 스택

| 분야 | 기술 |
|------|------|
| 언어 | TypeScript |
| 서버 | Node.js + Express |
| ORM | Prisma |
| DB | MySQL |
| 배포 | AWS EC2 + S3 |
| AI 연동 | OpenAI API |
| 문서화 | Swagger (API Docs) |

---

## 🧠 주요 기능

- 📸 **AI 이미지 검색 기능**  
  사용자가 업로드한 이미지를 분석해 해당 재료(material)를 추출하고, 관련 제품(product)을 조회합니다.

- 🔍 **텍스트 기반 검색**  
  제품명 또는 재료명으로도 간편하게 검색 가능!

- 🏷️ **카테고리 기반 필터링**  
  `plastic`, `fabric`, `glass`, `wood`, `can` 등 5가지 카테고리 기반 필터링 제공

- 🏭 **제조사(Company) 정보 제공**  
  제품 상세 페이지에서 제작 업체의 정보도 함께 제공

---

## 🗂️ API 문서

> 🔗 [Swagger API 문서 보기](http://43.203.85.72:3000/api-docs)

- Swagger 기반의 자동 API 문서화
- 실제 요청 테스트도 가능!

---

## 🛠️ 프로젝트 구조

```bash
pi-BE/
├── src/
│   ├── controllers/       # API 라우트 핸들러
│   ├── services/          # 비즈니스 로직
│   ├── repositories/      # DB 쿼리 모듈
│   └── dtos/              # 응답 형식 정의
├── prisma/                # Prisma schema 및 마이그레이션
├── public/                # 정적 파일
└── ...
```

## 🚀 로컬 실행 방법

```bash
# 1. 레포지토리 클론
git clone https://github.com/pi-8th-NerdinaryHackathon/pi-BE.git

# 2. 패키지 설치
pnpm install

# 3. Prisma 설정 및 DB 초기화
pnpm prisma generate
pnpm prisma db push

# 4. 서버 실행
pnpm dev
```

## 📌 향후 계획

* ✅ 실시간 모델 예측 결과 연동

* ⏳ 제품 즐겨찾기 기능

* ⏳ 사용자 피드백 기반 추천 기능

* ⏳ 관리자 전용 제품 등록 페이지

## 📄 라이선스

MIT © 2025 PI Team
Feel free to use, fork and improve! 🌱

