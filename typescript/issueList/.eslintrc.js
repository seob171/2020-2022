module.exports = {
    root: true,
    env: {
        browser: true,
        es6: true,
    },
    extends: [
        "plugin:@typescript-eslint/recommended",
        "plugin:react-hooks/recommended"
        // typescript 표준 규칙 모음
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:import/typescript",
        // import 관련 규칙 모음

        "plugin:prettier/recommended",
        "prettier/@typescript-eslint",
        "prettier/react",

        // prettier 관련 규칙 모음
    ],
    parserOptions: {
        ecmaVersion: 2018,
        project: ["./tsconfig.json"],
        // tsconfig 파일의 경로를 참조 해줍니다.
        // 기준은 root 입니다.
    },
    plugins:['react-hooks']
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": ["warn",{
            "additionalHooks":"useRecoilCallback",
            "enableDangerousAutofixThisMayCauseInfiniteLoops": true
        }]
    }
};