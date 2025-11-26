# Cloudflare Pages 프로젝트 테마 토글 문제 해결 가이드

이 문서는 Vite를 사용하여 Cloudflare Pages에 배포되는 정적 프론트엔드 프로젝트에서 다크/라이트 테마 토글 기능 구현 시 발생하는 일반적인 문제와 해결책을 다룹니다.

## 1. 핵심 원인 요약

테마 토글 기능이 작동하지 않는 주된 원인은 CSS, JavaScript, 그리고 Vite 설정 간의 불일치 때문입니다.

1.  **CSS 선택자 불일치**: `style.css`에서는 `[data-theme="dark"]` 속성 선택자를 사용하지만, `script.js`에서는 `.dark-mode` 클래스를 제어하려고 할 때 발생합니다.
2.  **Vite 경로 문제**: `vite.config.js`에서 `root: 'frontend'`로 설정된 경우, `index.html`에서 `/style.css`와 같은 절대 경로를 사용하면 Vite 개발 서버가 파일을 찾지 못합니다. **반드시 상대 경로를 사용해야 합니다.**
3.  **잘못된 모듈 타입**: `script.js`에 최상위 `await` 구문이 없음에도 불구하고 `index.html`에서 `<script type="module">`로 로드하면, Vite의 임포트 분석 과정에서 구문 오류가 발생할 수 있습니다.

---

## 2. 올바른 구현 방법

아래 3단계를 따르면 테마 토글 기능을 안정적으로 구현할 수 있습니다.

### Step 1: HTML 구조 (`index.html`)

-   CSS와 JavaScript 파일은 **상대 경로**로 연결합니다.
-   `script.js`에 최상위 `await`가 없다면 `type="module"` 속성을 **사용하지 않습니다.**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Theme Toggle Example</title>
    
    <!-- ❌ 잘못된 경로: <link rel="stylesheet" href="/style.css"> -->
    <!-- ✅ 올바른 경로 -->
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <!-- 테마 토글 버튼 -->
    <button id="themeToggleBtn">Toggle Theme</button>
    <button id="mobileThemeToggleBtn">Toggle Theme (Mobile)</button>

    <!-- ❌ 잘못된 로드 방식: <script type="module" src="script.js"> -->
    <!-- ✅ 올바른 로드 방식 -->
    <script src="script.js"></script>
</body>
</html>
```

### Step 2: CSS 스타일링 (`style.css`)

-   `:root`에서 기본 (라이트 모드) 색상 변수를 정의합니다.
-   `body[data-theme="dark"]` 선택자를 사용하여 다크 모드 색상 변수를 재정의합니다.

```css
:root {
    --background-color: #ffffff;
    --text-color: #333333;
}

body[data-theme="dark"] {
    --background-color: #121212;
    --text-color: #eeeeee;
}

body {
    background-color: var(--background-color);
    color: var(--text-color);
    transition: background-color 0.3s, color 0.3s;
}
```

### Step 3: JavaScript 로직 (`script.js`)

-   전체 코드를 `DOMContentLoaded` 이벤트 리스너로 감싸 DOM이 준비된 후 실행되도록 합니다.
-   `localStorage`를 사용하여 사용자의 테마 설정을 저장하고 불러옵니다.
-   테마를 변경할 때는 `element.classList` 대신 `element.setAttribute()`와 `element.removeAttribute()`를 사용합니다.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    // 1. 필요한 DOM 요소 가져오기
    const themeToggleBtn = document.getElementById('themeToggleBtn');
    const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');

    // 2. 현재 테마 확인 및 적용
    // 로컬 스토리지에 저장된 테마가 없으면 시스템 설정(prefers-color-scheme)을 따름
    const currentTheme = localStorage.getItem('theme') || 
                         (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // body 요소에 data-theme 속성 설정
    document.body.setAttribute('data-theme', currentTheme);

    // 3. 테마 토글 함수 정의
    const handleThemeToggle = () => {
        const newTheme = document.body.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        document.body.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
    };

    // 4. 이벤트 리스너 연결
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', handleThemeToggle);
    }
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', handleThemeToggle);
    }
});
```

---

## 3. Vite 설정 (`vite.config.js`)

`frontend` 디렉토리를 프로젝트의 루트로 사용하는 경우 아래와 같이 설정합니다. 이 설정 때문에 HTML에서 상대 경로를 사용해야 합니다.

```javascript
import { defineConfig } from 'vite';

export default defineConfig({
  // Vite의 루트 디렉토리를 'frontend'로 설정
  root: 'frontend', 
  server: {
    port: 3000
  },
  build: {
    outDir: '../dist'
  }
});
```

---

## 4. 문제 해결 체크리스트

테마 토글이 여전히 작동하지 않는다면 아래 항목을 순서대로 확인하세요.

-   [ ] **CSS**: `style.css` 파일이 `.dark-mode`가 아닌 `body[data-theme="dark"]` 선택자를 사용하고 있나요?
-   [ ] **JavaScript**: `script.js` 파일이 `classList.add/remove`가 아닌 `setAttribute('data-theme', 'dark')`를 사용하고 있나요?
-   [ ] **HTML 경로**: `index.html`에서 `style.css`와 `script.js`를 `<link href="style.css">` 와 같이 **상대 경로**로 참조하고 있나요?
-   [ ] **HTML 스크립트 태그**: `index.html`의 `<script>` 태그에 불필요한 `type="module"` 속성이 없나요?
-   [ ] **브라우저 캐시**: 브라우저에서 강력 새로고침(`Cmd+Shift+R` 또는 `Ctrl+Shift+R`)을 실행하여 캐시를 완전히 삭제했나요?
