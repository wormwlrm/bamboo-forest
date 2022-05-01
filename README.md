# Bamboo Forest 🎋

<center>
  <img src="./assets/logo.png" width="250"/>
</center>

> 여러분의 슬랙 워크스페이스에 구성원들의 메시지를 익명으로 전송할 수 있는 공간을 만들어보세요.

## 이럴 때 사용해보세요

- 구성원의 솔직한 피드백이 필요할 때
- 민감한 이슈에 대해 토론이 필요할 때
- 구성원을 칭찬하고 싶을 때
- 고민거리를 털어놓을 장소가 필요할 때
- 조직에 대한 공익적 제보가 필요할 때

## 지원 기능

- [x] 앱을 멘션하면 웰컴 메시지를 받을 수 있어요.
- [x] 웰컴 메시지에서는 데스크탑/모바일에서의 메시지/스레드 사용법을 알려드려요.
- [x] 특정 채널에 익명으로 메시지를 남길 수 있어요.
- [x] 특정 메시지에 익명으로 스레드를 남길 수 있어요.
- [x] 익명 메시지에 닉네임을 설정할 수 있어요. 익명으로 생성되는 닉네임을 구경해보세요.

## 데모

<https://user-images.githubusercontent.com/26682772/165727010-b4c03977-8138-4108-bd60-f86841149526.mov>

## 설치 방법

> 본 앱은 슬랙의 인증을 받은 배포 버전 앱이 아닙니다. 워크스페이스에서 사용하기 위해서는 본 소스코드를 이용해 별도 서버를 구축해야 합니다. 개인 서버 구축이 어렵다면 [Heroku](https://www.heroku.com/)를 이용하세요.

1. 본 리포지터리를 클론하고 디펜던시를 설치합니다.

    ```sh
    $ npm install

    # or

    $ yarn
    ```

1. [앱 매니페스트](./manifest.json)를 참고해 워크스페이스에 신규 앱을 생성하세요.

1. 환경 변수 파일(`.env`)을 생성합니다. 현재 코드에서 사용하는 환경 변수 종류는 다음과 같습니다.

    ```bash
    # 앱 토큰
    # Basic Information > App Credential 에서 확인 가능
    SLACK_SIGNING_SECRET=

    # 슬랙 봇 토큰
    # Basic Information > Features > Bots 활성화 후
    # OAuth & Permission > OAuth Tokens for Your Workspace 에서 확인 가능
    SLACK_BOT_TOKEN=

    # 대나무숲 채널 코드
    # 웹에서 슬랙 워크스페이스 접속 시 URL에서 확인 가능
    SLACK_BAMBOO_CHANNEL=
    ```

1. 터미널 두 개를 이용해 앱을 실행합니다.

    ```sh
    # 타입스크립트 컴파일
    $ yarn build:watch

    # 빌드된 앱 실행
    $ yarn start
    ```

1. `Event Subscription`과 `Interactivity & Shortcuts` 의 Request URL을 로컬 개발 환경으로 터널링하는 과정이 필요합니다. 이를 위해 별도의 터미널에서 [ngrok](https://ngrok.com/)를 이용합니다. ngrok에서 출력하는 URL에 `/slack/events`를 덧붙여 Request URL에 입력합니다.

    ```sh
    ngrok http 3000
    
    # 만약 ngrok 주소가 아래와 같다면
    # Connections: https://f111-222-333-444-55.jp.ngrok.io

    # Request URL에는 다음과 같이 입력
    # https://f111-222-333-444-55.jp.ngrok.io/slack/events
    ```

1. Slack에서 설정한 Request URL로 POST 이벤트를 전송합니다. 터널링이 됐다면 체크 표시가 뜹니다. 체크 표시가 뜬 이후부터 본 앱을 슬랙 워크스페이스에서 이용할 수 있습니다.

## 계획 중인 기능

- [ ] 슬랙 채널을 별도로 선택 가능하게 하기
- [ ] 익명 이모지 남기기

## 라이선스

- [MIT](./LICENSE)
