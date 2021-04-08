## 설치부터 환경 설정

### NodeJS_설치

1. [Node.js 설치](https://nodejs.org/, "node.js install link") 에 접속하여 Recommended For Most Users (강의로 사용한 버전 : 14.16.0 LTS 버전) 설치 

2. 설치 중 체크 사항 확인.<br><br>
<img src="mdImg/InstallCheck.png"  title="설치 체크" alt="InstallCheck"></img><br/>

### 작업 환경 만들기 (Visual Studio Code 사용)

1. [Visual Studio Code 설치](https://code.visualstudio.com/, "vscode install link") 에 접속하여 Visual Studio Code 다운로드 및 설치.

2. express 설치
2.1 cmd 창에서 프로젝트 폴더로 접근 (cd 이동경로)
2.2 express 설치를 위한 명령어 입력
(🛑 이때 동기화되는 DropBox 나 클라우드 등 프로그램 사용할시 경로 오류가 날 수 있다.)
    - npm init
    - npm i express
        - express 설치
    - npm i -D nodemon
        - 파일이 변경되었을 때 자동 서버 갱신을 위해 추가 설치
    - pakage.json 파일에서 test 라인을 모두 삭제 후 nodemon 사용을 위해 "start": "nodemon app" 로 변경함.

