# TateScribe

AI transcription that keeps up when you switch languages mid-sentence (Korean + English + French and 90+ more).
Engine: ElevenLabs Scribe v2 (files/links) and Scribe v2 Realtime (live). No server — runs on GitHub Pages.

## 기능 (v2)

- **홈 화면**: 전사한 파일 전체 목록. 검색(제목+본문), 정렬(최신·오래된·이름·길이)
- **리스트(폴더)**: 프로젝트·회의별로 묶기. 사이드바 / 홈의 필터 칩 / 각 행의 ⋯ 메뉴 / 문서 화면의 List 선택으로 이동
- **모바일 앱**: 하단 탭바(Transcripts · Upload · Record · Settings), 폰 화면에 맞춘 레이아웃
- **앱처럼 설치**: Install 버튼 (안드로이드·PC 크롬/엣지는 바로 설치, 아이폰은 설치 방법 안내)
- **기본 내보내기 = TXT**: Export TXT 한 번 클릭. 옆 ▾에서 Word, SRT, VTT, Markdown, JSON, 복사
- **업로드 취소**: 올리는 중/전사 중 옆의 X로 취소, 대기 중인 파일은 X로 빼기
- **메뉴 영어**
- 이전 기능 그대로: 언어 섞임 자동 처리와 강조, 화자 구분, 타임스탬프, 재생 동기화, 편집, 실시간 녹음 + 화자 구분 정밀 전사, 용어 목록

## GitHub Pages에 올리기 / 업데이트

1. 압축을 풀고, 저장소(`tatescribe`)에 **폴더 안의 파일들**을 올려서 덮어쓰기
   (`index.html`, `manifest.webmanifest`, `sw.js`, `README.md`, `icons/`)
2. 처음이면 Settings → Pages → Deploy from a branch → main / (root)
3. `https://betanogo.github.io/tatescribe/`

> 업데이트할 때마다 `sw.js`의 `VERSION`을 올려 주세요 (지금 `tatescribe-v2`). 설치된 앱이 새 버전을 받으려면 앱을 한 번 닫았다 다시 열면 돼요.

## 폰에 설치

- **안드로이드 (크롬)**: 사이트 열기 → 홈 화면의 *Install* 배너 또는 위쪽 ↓ 아이콘 → 설치
- **아이폰 (사파리)**: 공유 버튼 → *홈 화면에 추가* → 추가 (앱 안의 Install을 누르면 이 순서를 보여줘요)
- **PC (크롬/엣지)**: 왼쪽 아래 *Install app* 또는 주소창 오른쪽 설치 아이콘

설치하면 홈 화면 아이콘으로 전체 화면 앱처럼 열려요. 안드로이드는 다른 앱(YouTube 등)에서 *공유 → TateScribe*로 링크를 보내면 바로 링크 칸에 들어가요.

## 알아둘 점

- API 키는 브라우저에만 저장되고 `api.elevenlabs.io`로만 전송돼요. 폰과 PC는 저장 공간이 따로라서 각각 키를 넣어야 하고, 전사 기록도 기기마다 따로예요.
- 전사 중에 취소하면, ElevenLabs가 이미 처리를 시작한 경우 그 분량은 과금될 수 있어요. 올리는 중 취소는 과금되지 않아요.
- 요금: 파일 전사 시간당 약 $0.22, 실시간 시간당 약 $0.39 (ElevenLabs 가격표 기준). 무료 플랜 크레딧으로 매달 몇 시간 쓸 수 있어요.
- 마이크와 설치 기능은 **https**에서만 동작해요. 로컬 테스트는 `python -m http.server` 후 `http://localhost:8000`.
