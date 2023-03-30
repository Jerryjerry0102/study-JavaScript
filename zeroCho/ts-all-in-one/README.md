## 타입스크립트 올인원

### Part1. 기본 문법편

강의: 39강
시간: 6시간 42분

### 목표 일정

2023.2.13 ~ 2.28

### 목차

- [x] 0. 기본 세팅하기
- [x] 1. 기본 문법 배우기
  - [x] 타입스크립트는 변수, 매개변수, 리턴값에 타입 붙이는 것!
  - [x] 타입 추론을 적극 활용하자
  - [x] js 변환 시 사라지는 부분을 파악하자
  - [x] never 타입과 느낌표(non-null assertion)
  - [x] 원시 래퍼 타입, 템플릿 리터럴 타입, reset, 튜플
  - [x] enum, keyof, typeof
  - [x] union(|)과 intersection(&)
  - [x] 타입 애일리어스와 인터페이스의 상속(extends)
  - [x] 타입을 집합으로 생각하자(좁은 타입과 넓은 타입)
  - [x] void의 두 가지 사용법
  - [x] unknown과 any(그리고 타입 대입가능표)
  - [x] 타입 좁히기(타입 가드)
  - [x] 커스텀 타입 가드(js, 형식 조건자)
  - [x] {}와 Object
  - [x] readonly, 인덱스드 시그니처, 맵드 타입스
  - [x] 클래스의 새로운 기능들
  - [x] 옵셔널, 제네릭 기본
  - [x] 기본값 타이핑
- [x] 2. lib.es5.d.ts 분석
  - [x] forEach, map 제네릭 분석
  - [x] filter 제네릭 분석
  - [x] forEach 타입 직접 만들기
  - [x] map 타입 직접 만들기
  - [x] filter 타입 직접 만들기
  - [x] 공변성과 반공변성
  - [x] 하나에는 걸리겠지(오버로딩)
  - [x] 타입스크립트는 건망증이 심하다(+에러 처리법)
- [x] 3. Utility Types
  - [x] Partial 타입 분석
  - [x] Pick 타입 분석
  - [x] Omit, Exclude, Extract 타입 분석
  - [x] Required, Record, NonNullable 타입 분석
  - [x] infer 타입 분석
  - [x] 완전 복잡한 타입 분석하기(Promise와 Awaited 편)
  - [x] 완전 복잡한 타입 분석하기(bind 편)
  - [x] 완전 복잡한 타입 분석하기(flat 편)

### Part2. 실전 분석편

강의: 33강
시간: 5시간 51분

### 목표 일정

2023.3.01 ~ 3.18

### 목차

- [x] 1. 제이쿼리 타입 분석
  - [x] @types/jquery 설치하기
  - [x] commonjs 모듈 타이핑하는 방법과 esMoudleInterop
  - [x] 네임스페이스(namespace)
  - [x] 메서드와 this 타이핑
  - [x] jQuery 타입 직접 만들어보기
  - [x] Q&A
- [x] 2. Axios 타입 분석
  - [x] 다양한 방식으로 사용 가능한 axios
  - [x] ts-node 사용하기
  - [x] 제네릭을 활용한 Response 타이핑
  - [x] AxiosError와 unknown error 대처법
  - [x] Axios 타입 직접 만들기
- [x] 3. React 타입 분석
  - [x] UMD 모듈과 tsconfig.json jsx 설정하기
  - [x] 함수 컴포넌트(FC vs VFC), Props 타이핑
  - [x] useState, useEffect 타이핑
  - [x] 번외편: 브랜딩 기법
  - [x] useCallback, useRef 타이핑
  - [x] 클래스 컴포넌트 타이핑
  - [x] Q&A
- [x] 4. Redux 타입 분석
  - [x] named exports만 있는 Redux 알아보기
  - [x] action, reducer 타이핑하기
  - [x] thunk 미들웨어 타이핑하기
  - [x] react-redux 타이핑하기
- [ ] 5. Node, Express 타입 분석
  - [x] @types/node
  - [x] http, fs, path 모듈 타입 분석
  - [x] @types/express
  - [x] 익스프레스 미들웨어 타이핑
  - [x] req, res 속성 타이핑(+인터페이스 확장)
  - [x] d.ts에서의 declare global
  - [ ] passport에서 req.user 타이핑하기
  - [ ] passport Strategy 타입 분석
- [ ] 6. 직접 라이브러리 타이핑하기
