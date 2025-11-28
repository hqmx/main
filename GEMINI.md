# HQMX 메인 페이지 (Sitemap) 프로젝트

**최종 업데이트**: 2025-11-25
**작성자**: Gemini Agent

## 1. 프로젝트 개요 (Project Overview)

이 프로젝트는 HQMX 서비스의 **메인 랜딩 페이지** 역할을 합니다. 사용자가 `hqmx.net`에 처음 접속했을 때 보게 되는 화면이며, 모든 하위 서비스(Downloader, Converter, Generator, Calculator)로 안내하는 **비주얼 사이트맵(Visual Sitemap)** 기능을 핵심으로 합니다.

- **Git Repository**: `https://github.com/hqmx/main.git`
- **주요 기술**: Vanilla HTML, CSS, JavaScript (정적 페이지)
- **핵심 파일**: `frontend/index.html`

## 2. 주요 기능 (Key Features)

- **통합 랜딩 페이지**: HQMX 브랜드의 첫인상을 결정하는 메인 게이트웨이입니다.
- **서비스 네비게이션**: 각 하위 서비스로 연결되는 링크를 직관적인 UI로 제공합니다.
- **다국어 및 테마 지원**: `locales.js`와 `style.css`를 통해 다국어와 다크/라이트 모드를 지원합니다.

## 3. 배포 절차 (Unified EC2 Deployment)

**이 프로젝트는 루트 디렉토리의 통합 배포 스크립트를 통해 다른 모든 서비스와 함께 배포됩니다.**

1.  **변경사항 커밋**: 로컬에서 수정한 내용을 Git에 커밋합니다.
    ```bash
    git add .
    git commit -m "메인 페이지 업데이트 내용"
    ```

2.  **통합 배포 스크립트 실행**: 프로젝트 최상위 루트 디렉토리에서 다음 스크립트를 실행합니다.
    ```bash
    ./deploy_all_to_ec2.sh
    ```

3.  **자동 배포**: 스크립트가 `main` 프로젝트의 `frontend` 디렉터리를 EC2 서버의 `/var/www/hqmx/` 경로로 자동으로 동기화합니다.

**⚠️ 중요**: 개별 배포는 더 이상 사용하지 않으며, 항상 통합 배포 스크립트를 사용해야 합니다.

---
(이하 내용은 참고용 레거시 정보)

### 레거시 배포 절차 (Nginx 수동 배포)
이 프로젝트는 정적 파일로 구성되어 있으므로, 웹 서버의 지정된 위치에 파일을 복사하는 것만으로 배포가 완료됩니다.
...
