# TateScribe

한국어·영어·프랑스어가 한 문장에 섞여도 그대로 받아 적는 AI 전사 웹앱(PWA).
전사 엔진은 ElevenLabs Scribe v2 (파일)와 Scribe v2 Realtime (실시간)이에요.

## 기능

- **파일 전사**: MP3, M4A, WAV, MP4, MOV 등 오디오·영상 (최대 5GB). 여러 파일을 놓으면 차례로 처리
- **링크 전사**: YouTube, TikTok, 오디오 파일 URL
- **실시간 녹음**: 말하는 대로 글자가 나타남. 연결이 끊기면 자동으로 다시 연결
- **언어 섞임 처리**: 언어를 고르지 않아도 자동 감지, 한 문장 안 코드스위칭 지원. 구간마다 `KO+EN`, `FR` 같은 언어 표시, 한국어 문장 속 영어 부분은 색으로 강조
- **화자 구분 + 타임스탬프**: 최대 32명. 실시간 녹음은 끝난 뒤 "화자 구분 정밀 전사"로 나눌 수 있음
- **편집**: 문장 클릭해서 고치기, 화자 이름 바꾸기, 구간별 화자 재지정, 검색
- **재생 동기화**: 시간을 누르면 그 부분부터 재생, 재생 중인 구간 강조 (Space로 재생/정지)
- **내보내기**: Word(.docx), TXT, Markdown, SRT, VTT, JSON, 클립보드 복사
- **용어 목록**: 약어·이름을 등록하면 더 정확하게 인식
- **기록**: 모든 전사와 원본 오디오를 이 기기(IndexedDB)에 저장. 서버 없음

## 시작하기

1. [elevenlabs.io](https://elevenlabs.io) 가입 → **Developers → API Keys**에서 키 만들기
   - 안전하게 쓰려면 키 권한을 **Speech to Text만** 켜고, 사용 한도(credit limit)를 걸어 두세요
   - 처음 쓸 때 대시보드에서 Scribe 이용 약관 동의가 필요할 수 있어요
2. 앱을 열고 **설정**에 키를 넣기
3. 파일을 끌어다 놓거나 녹음 버튼 누르기

## GitHub Pages에 올리기

1. 새 저장소 (예: `tatescribe`) 만들고 이 폴더의 파일을 전부 올리기
   (`index.html`, `manifest.webmanifest`, `sw.js`, `icons/`)
2. **Settings → Pages → Source: Deploy from a branch → main / root** 저장
3. `https://<아이디>.github.io/tatescribe/` 로 접속
4. 폰에서는 브라우저 메뉴의 **홈 화면에 추가**로 앱처럼 설치 (안드로이드는 공유 메뉴에서 링크를 바로 보낼 수도 있음)

> 마이크와 서비스 워커는 **https**에서만 동작해요. 파일을 더블클릭해서(`file://`) 열면 녹음이 안 돼요.
> 로컬 테스트: 이 폴더에서 `python -m http.server` 실행 후 `http://localhost:8000`

## 알아둘 점

- API 키는 브라우저 localStorage에만 저장되고 `api.elevenlabs.io`로만 전송돼요. 공용 PC에서는 쓰고 나서 설정에서 키를 지우세요.
- 요금은 ElevenLabs 계정에서 오디오 길이만큼 차감돼요. 용어 목록을 쓰면 조금 더 붙어요.
- 실시간 녹음은 화자 구분이 없어요. 끝난 뒤 녹음본으로 정밀 전사를 하면 화자가 나뉘어요 (같은 길이만큼 한 번 더 과금).
- 언어 배지는 화면 표시용 추정이에요 (한글/가나/한자 문자 + 영어·프랑스어·스페인어·독일어 기능어 기준). 실제 전사 결과에는 영향이 없어요.
- 앱을 업데이트하면 `sw.js`의 `VERSION` 값을 바꿔 주세요 (예: `tatescribe-v2`). 그래야 설치된 앱이 새 버전을 받아요.

## 파일 구조

```
index.html             앱 전체 (HTML + CSS + JS, 외부 라이브러리 없음)
manifest.webmanifest   PWA 설정
sw.js                  오프라인 캐시
icons/                 앱 아이콘
```
