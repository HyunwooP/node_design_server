# Node Style Server

## React + Node API Server + Style Server

### Client에 참조되는 Style객체를 관리하는 서버를 목적으로 둠.

#### Style 객체를 관리하기 위해 MongoDB를 사용

## 아이디어

#### Theme = 여러개의 Style을 가질 수 있고, Style.isActive 관리를 통하여 Client에 주어진다.

#### Style = 여러개의 레이아웃과 컴포넌트들을 조합한 객체

#### Layout = Client의 최상단 Wrapper 역할을 하는 CSS를 가지고 있다.

#### Component = 각 테마별로 가져야 할 컴포넌트 CSS 객체들이다.

## Client Repository

https://github.com/HyunwooP/react_template

## Gateway Server Repository

https://github.com/HyunwooP/spring_boot_api_gateway_server

## API Server Repository

https://github.com/HyunwooP/node_api_template

## Framework & Library

```
Express
TypeORM
Mongodb
```

## 작성자

```
2021.07.01
Author: 박현우
```

## [노트]

## 설명

```
[환경설정]
.env를 사용한다.

1. generate ./env file (dotenv)
2. DB Table (Model) 추가 시
    2-1. go .src/lib/database.ts
    2-2. connectRepository function에 참조되는 AppRepository 객체에 선언
```

## 실행

```
1. npm i
2. npm start
  2-1. 현재 개발중으로 인해 nodemon을 붙인 상태이므로, package.json 수정해서 사용하길 요망
3. 설명란 참고
```
