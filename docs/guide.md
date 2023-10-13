# 🧑‍💻 Guide for Developers
## Index
- [개발 가이드](#개발-가이드)
  1. [네이밍 규칙](#1-네이밍-규칙)
  2. [vuex의 사용](#2-vuex의-사용)
  3. [팝업을 오픈 할 때 유의할 점](#3-팝업을-오픈-할-때-유의할-점)
  4. [접근 가능한 파일](#4-접근-가능한-파일)
  5. [존재하는 컴포넌트의 활용](#5-존재하는-컴포넌트의-활용)
  6. [개발 시 지켜야 하는 규칙](#6-개발-시-지켜야-하는-규칙)
- [github 가이드](#github-가이드)
  1. [커밋 기준](#1-커밋-기준)
  2. [커밋 메시지](#2-커밋-메시지)
  3. [Pull request](#3-pull-request)
---

# 개발 가이드
## 1. 네이밍 규칙

### 1-1. 소스파일 네이밍 규칙

- 합성 규칙 : 기본은 명사로만 이루어짐
- 소스파일 맨 첫 글자는 대문자로 시작
- 이후는 카멜 케이스 사용

```jsx
 ex) ChanMain.vue
```

### 1-2. 함수 네이밍 규칙

- 합성 규칙 : 동사 + 명사
- 접두어 제외, 소스파일과 동일하게 카멜 케이스 사용

```jsx
ex) sendBoard ()
```

### 1-3. 변수 네이밍 규칙

- 합성 규칙 : 기본은 명사로만 이루어짐
- 그 외는 함수의 네이밍 규칙과 동일
- prop에 정의된 변수는 구분될 수 있도록 이름의 맨 앞에  ‘p’를 붙임

```jsx
ex) pClosePop
```

- data에 정의된 변수는 구분될 수 있도록 이름의 맨 앞에 ‘m’을 붙임

```jsx
ex) mContentsList
```

- boolean 타입 변수는 구분될 수 있도록 이름의 맨 뒤에 ‘Yn’을 붙임

```jsx
ex) mShowYn
```

<br/>

## 2. vuex의 사용

### 2-1. vuex를 사용하는 이유

- 모든 화면에서 하나의 데이터를 바라볼 수 있게 하여 언제나 최신 상태의 데이터 흐름을 유지할 수 있음

### 2-2. vuex 사용 방법

- uniBuzzy에서는 vuex 사용 방법을 다음과 같이 구분하여 정의하고 있음
- **actions** ⇒ vuex에 저장된 데이터를 변경하기 위해 화면에서 호출하는 기능
- **mutations** ⇒ store.js 파일 내에서 실제로 vuex에 저장된 데이터에 접근하여 변경하는 기능
- **getters** ⇒ vuex에 저장된 데이터를 가져와서 사용하도록 하는 기능
- 즉 **화면에서 actions를 호출**하면, actions는 **mutations를 호출하여 데이터를 변경**하고 이렇게 저장된 **데이터를 getters를 통해 가져다 쓰는** 형식
- vuex에 저장된 데이터를 가져다 쓸 때는 computed 내에 정의해서 사용

```jsx
ex)
computed: {
	GE_USER () {
		return this.$store.getters['UB_USER/GE_USER']
	}
}
```

- 위의 예시 코드처럼, 현재 접속한 유저의 정보를 사용할 때는 GE_USER를 통해 데이터를 가져옴

### 2-3. vuex에 데이터를 저장하는 경우

- contents list를 불러올 때, contents 상세를 불러올 때 (UB_channelStore.js > AC_ADD_CONTENTS)
- channel list를 불러올 때, channel 상세를 불러올 때 (UB_channelStore.js > AC_ADD_CHANNEL)
- user 정보를 불러올 때 (UB_userStore.js > AC_USER)
- 팝업을 open할 때 (UB_UB_historyStack.js >updateStack)

<br/>

## 3. 팝업을 오픈 할 때 유의할 점

- uniBuzzy는 하이브리드 앱이므로 모바일 기기에서 뒤로 가기를 했을 때 기능을 따로 고려해주어야 함
- 따라서 팝업을 열 때 무조건 vuex에 현재 열린 팝업에 대한 정보를 저장하고, 뒤로 가기 버튼으로 팝업을 닫고자 했을 때 현재 열린 팝업과 vuex에 저장된 가장 최신의 팝업 정보를 비교함
- 이때 비교한 정보가 일치하면 팝업을 닫도록 해주어야 함

```jsx
computed: {
// history가 업데이트 되었는지 확인
    pageUpdate () {
      return this.$store.getters['UB_HISTORY/hUpdate']
    },
    history () {
      return this.$store.getters['UB_HISTORY/hStack']
    }
  },
watch: {
  pageUpdate () {
// 가장 최근의 팝업이 현재 팝업과 일치하면 닫아줌
    if (this.history[this.history.length - 1] === 'favListPop') {
      this.closeXPop()
    }
  }
},
mounted () {
// 팝업이 열릴 때 history를 추가해줌
  this.$addHistoryStack('favListPop')
},
methods: {
// 팝업을 닫을 때 현재 팝업에 대한 정보를 삭제
	closeXPop () {
    var history = this.$store.getters['UB_HISTORY/hStack']
    var removePage = history[history.length - 1]
    history = history.filter((element, index) => index < history.length - 1)
    this.$store.commit('UB_HISTORY/setRemovePage', removePage)
    this.$store.commit('UB_HISTORY/updateStack', history)
    this.$checkDeleteHistory('favListPop')
    this.$emit('closeXPop')
  }
}
```

<br/>

## 4. 접근 가능한 파일

- **public 폴더 내 파일은 접근하지 않도록 주의**
- 오류 수정은 최대한 한국팀에서 진행할 예정이니 파일 내에서 기존에 script 부분은 최대한 보존
- **assets > js 내에 있는 js파일도 기존에 작성한 부분은 최대한 보존해야 하며, 불가피한 이유 없이 삭제는 절대 금지**
- 새로운 기능을 더하기 위하여 추가적으로 작성하는 것은 가능
- router > index.js 파일도 최대한 수정하지 말 것
- 메인 화면을 변경하고 싶다면 ⇒ UB_main.vue
- 채널 메인 화면을 변경하고 싶다면 ⇒ UB_chanMain.vue
- 게시판 메인 화면을 변경하고 싶다면 ⇒ UB_boardMain.vue

<br/>

## 5. 존재하는 컴포넌트의 활용

- vue/react는 하나의 컴포넌트를 만들어 반복 활용하는 효율성이 높음
- 화면에서 자주 사용되는 요소의 경우 이미 컴포넌트가 생성되어 있을 가능성이 높으므로 파일을 새로 생성하기 보다는 기존의 컴포넌트를 활용

<br/>

## 6. 개발 시 지켜야 하는 규칙

- created () 안에서 await과 async를 사용해서는 안 됨 ⇒ 서버에서 return이 돌아올 때까지 기다려야 한다면 then 문을 활용
- 사용해야 하는 데이터가 없을 것을 대비하여 반드시 if문을 통한 방어 루틴을 작성해야 함
- 태그에 대한 스타일은 되도록 inline이 아니라 class를 부여하여 작성
- 이미 UB_common.css에 정의된 공통 속성이 존재하므로 개발을 진행하기 전에 확인 필요
- document.querySelector 등 dom에 직접 접근하는 것은 지양하고 ref로 접근해야 함

<br/>

---

<br/>

# github 가이드
## 1. 커밋 기준
- 의미: 항상 의미가 있는 커밋을 진행한다
- 작업당 하나: 다양한 작업이 혼합되어 있으면 구별하기 어려움
  - 작업당 하나씩하게 되면 [되돌리기(revert)](https://git-scm.com/docs/git-revert)가 가능해진다
- 자주: 대규모 변경은 코드에 문제가 생길 여지가 많아지며, 리뷰 또한 어려워짐

<br/>

## 2. 커밋 메시지
[앵귤러 컨벤션](https://ec.europa.eu/component-library/v1.15.0/eu/docs/conventions/git/)이 대표적인 커밋메세지 규약이다.
- `Fix`: 버그 수정
- `Feat`: 기능 추가
- `Docs`: 문서
- `Style`: 코딩 스타일
- `Refactor`: 리팩토링
- `Perf`: 성능 향상
- `Test`: 테스트코드
- `Chore`: 빌드 프로세스, 라이브러리, 툴링  

첫 로딩 시 폰트 프리로드를 통해 성능을 개선했다면 다음과 같이 커밋 로그를 남길 수 있다.
```
Perf: Font preload for first load
```

<br/>

## 3. Pull request
Pull requests should be opened according to the template.
- Description(*): Write about the purpose of opening the PR, guidance, and related explanations.
- Changes(*): Write down the changes in the commit.
- Check List(*): List to focus on when reviewing.
- Related Issue: Connect if issues related to the PR are open.
- Screenshot: Related screenshots or videos.
<img src="https://unibuzzy.com/resource/gitImg/pr_example.png">
