# Node Style Server

## React Client + React Admin + Gateway Server + API Server + Style Server

![구조](https://user-images.githubusercontent.com/20429356/158008003-23315066-bca4-402c-af4e-10d81a886ec7.png)

### Client에 참조되는 Style객체를 관리하는 서버를 목적으로 둠.

#### Style 객체를 관리하기 위해 MongoDB를 사용

## 아이디어

#### Theme = 여러개의 Style을 가질 수 있고, Style.isActive 관리를 통하여 Client에 주어진다.

#### Style = 여러개의 레이아웃과 컴포넌트들을 조합한 객체

#### Layout = Client의 최상단 Wrapper 역할을 하는 CSS를 가지고 있다.

#### Component = 각 테마별로 가져야 할 컴포넌트 CSS 객체들이다.

## Client Repository

https://github.com/awakelife93/react-template

## Admin Repository

https://github.com/awakelife93/react-admin-template

## Gateway Server Repository

https://github.com/awakelife93/study-spring-boot

## API Server Repository

https://github.com/awakelife93/node-api-template

## [노트]

### 설명

```
1. [환경설정]
   .env를 사용한다.

1-1. generate ./env file (dotenv)
1-2. DB Table (Model) 추가 시
1-2.1. go .src/lib/database.ts
1-2.2. connectRepository function에 참조되는 AppRepository 객체에 선언

2. 디자인 시스템에 포함되는 모든 요소는 테마에 따라 "\_\_"을 구분자로 약속함으로써 어느 테마를 위해 제작되었는지 표시한다.
```

## 작성자

```
2021.07.01
Author: 박현우
```

## Framework & Library

```
Express
TypeORM
Mongoose
Mongodb
Module Alias
```

## 실행

```
1. npm i
2. npm start
  2-1. 현재 개발중으로 인해 nodemon을 붙인 상태이므로, package.json 수정해서 사용하길 요망
3. 설명란 참고
```

#
### Thanks To JetBrains
![Thanks To JetBrains](https://user-images.githubusercontent.com/20429356/156112274-1e0d4de3-b62d-4a67-989b-dadb52a2ff3f.png)
![JetBrains Logo (Main) logo](https://resources.jetbrains.com/storage/products/company/brand/logos/jb_beam.png)
