## 4. 트러블슈팅 (Troubleshooting)

### ✅ [RESOLVED] 사이트맵 페이지 스크립트 오류 (2025-12-03)

**증상:**
- `main` 페이지(`hqmx.net`) 로드 시 `TypeError: Cannot read properties of null (reading 'style')` 오류가 발생하며, 스크립트가 제대로 작동하지 않음.

**원인:**
- `main/frontend/script.js` 파일이 `downloader` 프로젝트의 스크립트와 통합되어 있었음.
- `main` 페이지(`index.html`)에는 존재하지 않는 `downloader` 관련 DOM 요소(예: `urlInput`, `analyzeBtn` 등)를 스크립트가 참조하여 `null` 에러가 발생함.
- `dom` 캐싱 객체에 다운로더 전용 요소들이 포함되어 있었고, 이 요소들에 대한 `null` 체크 없이 `style` 속성에 접근하려 시도.

**해결 과정:**
1.  `main/frontend/script.js` 파일을 `main` 페이지의 기능(테마 토글, 언어 선택, 모바일 메뉴, 사이트맵 카드 확장/축소)에만 필요한 최소한의 코드로 재작성.
2.  `downloader` 관련 로직(URL 분석, 다운로드 진행 상태, 고급 사용자 트래킹 등) 및 해당 DOM 요소 참조 모두 제거.
3.  `main/frontend/index.html`에 존재하는 요소들만 `document.getElementById` 또는 `document.querySelector`로 참조하도록 변경하고, 필요한 곳에 `null` 체크 추가.
4.  재작성된 `script.js`를 배포 스크립트를 통해 `main` 서비스에 배포.

**배포 내역:**
```bash
./deploy.sh main
```
**상태**: ✅ 완료 (2025-12-03)

**교훈 및 예방 조치:**
- 각 서비스의 `frontend` 스크립트는 해당 페이지의 DOM 구조와 기능에만 맞도록 분리하여 관리해야 함.
- 여러 페이지에서 공통으로 사용되는 스크립트가 아니라면, 페이지별로 독립적인 스크립트를 유지해야 불필요한 DOM 참조 오류를 방지할 수 있음.