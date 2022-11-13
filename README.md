# memo app
드라마앤컴퍼니 면접 사전과제

## 실행방법
1. yarn (라이브러리 설치)
2. yarn dev (localhost 서버 실행)
3. https://github.com/dramancompany/memoapp-api-v2 (해당 파일 clone 후 실행)
4. 테스트!
---
## 프로젝트 구조
```
├── src
├── App.tsx
├── components
├── UI
│   ├── atoms
│   │   ├── Button.tsx
│   │   ├── CheckBox.tsx
│   │   ├── Form.tsx
│   │   ├── Input.tsx
│   │   └── Tag.tsx
│   ├── molecules
│   │   ├── ButtonTag.tsx
│   │   ├── List.tsx
│   │   ├── ListItem.tsx
│   │   ├── MemoItem.tsx
│   │   └── Notepad.tsx
│   └── organisms
│       ├── LabelList.tsx
│       ├── MemoList.tsx
│       └── OpenedMemo.tsx
├── pages
└── templates
│   
├── .estlintrc.                    # lint에 필요한 파일
├── .babel.config.json             # babel 설정파일
├── .prettierrc                    # Pritter 설정 파일
├── package.json                   # npm setting 파일
├── tsconfig.json                  # ts compile 설정 파일
└── webpack.config.js              # env에 따라 webpack을 실행시키는 default 설정 파일
```
---
## 사용한 라이브러리
### 환경설정 - webpack, babel, typescript, lint, prettier
### 구현에 사용한 라이브러리 - react, axios(API 통신), recoil(상태관리), styled-component(디자인)
```
"dependencies": {
        "@types/styled-components": "^5.1.26",
        "axios": "^1.1.3",
        "qs": "^6.11.0",
        "react": "^18.2.0",
        "react-dom": "^18.2.0",
        "react-router-dom": "^6.4.1",
        "recoil": "^0.7.6",
        "styled-components": "^5.3.6"
    },
    "devDependencies": {
        "@babel/core": "^7.19.0",
        "@babel/preset-env": "^7.19.0",
        "@babel/preset-react": "^7.18.6",
        "@babel/preset-typescript": "^7.18.6",
        "@types/react": "^18.0.18",
        "@types/react-dom": "^18.0.6",
        "@types/react-router-dom": "^5.3.3",
        "babel-loader": "^8.2.5",
        "clean-webpack-plugin": "^4.0.0",
        "crypto-browserify": "^3.12.0",
        "eslint": "^8.23.0",
        "eslint-config-prettier": "^8.5.0",
        "eslint-plugin-prettier": "^4.2.1",
        "eslint-plugin-react-hooks": "^4.6.0",
        "html-webpack-plugin": "^5.5.0",
        "https-browserify": "^1.0.0",
        "os-browserify": "^0.3.0",
        "prettier": "^2.7.1",
        "stream-browserify": "^3.0.0",
        "stream-http": "^3.2.0",
        "ts-loader": "^9.3.1",
        "typescript": "^4.8.2",
        "url": "^0.11.0",
        "webpack": "^5.74.0",
        "webpack-cli": "^4.10.0",
        "webpack-dev-server": "^4.10.1"
    }
```

---
## 아토믹 디자인
Atoms

![CleanShot 2022-11-12 at 13 00 37](https://user-images.githubusercontent.com/103884763/201456144-ec821a61-3ec3-499d-896f-221583a1cb22.png)

Molecules

![CleanShot 2022-11-12 at 13 01 49](https://user-images.githubusercontent.com/103884763/201456185-569726d2-2a3b-43ee-ae57-f24bae68b9b0.png)

Organisms

![CleanShot 2022-11-12 at 13 02 16](https://user-images.githubusercontent.com/103884763/201456196-6f4a8ea3-8181-4e7d-8c1a-e547780dd9d4.png)


Template & Page

![CleanShot 2022-11-12 at 13 02 49](https://user-images.githubusercontent.com/103884763/201456214-ff5644f4-e291-4259-8aee-0cda44d6de31.png)

---
## 실제 전체 화면구성

![CleanShot 2022-11-14 at 03 17 13](https://user-images.githubusercontent.com/103884763/201537631-abd6d816-f523-401e-a260-e7d15f67f2c1.png)

---
## 개선 가능한 사항

1. 미구현된 api 동작 (relation api) 처리
2. 체크박스 기능
3. lebel, memo 등 이동시 history 저장
4. 마무리가 부족한 UI
