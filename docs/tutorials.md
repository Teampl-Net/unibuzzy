# 📖 Tutorials for uniBuzzy
uniBuzzy를 처음으로 접해보는 분들이 **uniBuzzy를 다루는 데에 익숙해질 수 있도록** 구성한 일종의 튜토리얼입니다.
반드시 진행해야 하는 to-do의 개념은 아니고 아래와 같은 작업을 진행해보며 'uniBuzzy가 어떤 식으로 구성되어 있고 어떻게 변화시킬 수 있겠구나'를 이해하는 과정이라고 보시면 될 것 같습니다.

---

### 🏫 대학 main 타운의 배경 이미지 변경해보기
	1. src > pages > routerPages > Main.vue 파일 열기  
	2. css에 있는 mainTownArea 클래스의 background-image 속성을 원하는 이미지로 변경하기 

<br/>

### 📷 채널의 배경 사진을 변경해보기
	1. src > pages > routerPages > ChanMain.vue 파일 열기  
	2. id가 chanMainRef인 div 요소에 바인딩되어 있는 background-image 속성을 원하는 이미지로 변경하기
 
<br/>

### 🎨 채널 콘텐츠 리스트 배경색이나, 강조되는 색상을 원하는 대로 변경해보기
	- 배경색 바꿔보기  
		1. src > pages > routerPages > PushList.vue 파일 열기  
		2. css에 있는 pushListArea 클래스에 background-color 속성 추가하기
	- 강조되는 색상 변경해보기  
		1. src > pages > routerPages > PushList.vue 혹은 ChanMain.vue 파일 열기  
		2. 브라우저의 inspector 기능을 활용하여 클래스 이름을 파악하고, 원하는 부분의 css를 변경하기

<br/>

### 🧾 채널 메뉴의 구성이나 순서를 원하는 대로 변경해보기
	1. src > components > pageComponents > channel > popup > ChannelMenu.vue 파일 열기  
	2. menuContWrap 클래스를 가진 div 요소 내에 있는 태그의 위치를 바꾸거나 텍스트를 변경해보기

<br/>

### 📱 채널 메인의 info 영역을 원하는 형태의 디자인으로 바꿔보기
	1. src > page > routerPages > ChanMain.vue 파일 열기  
	2. chanDescriptionBox 클래스를 가진 div 요소 내에 있는 태그 위치를 바꾸거나 텍스트를 변경하고, css 속성을 적용시켜보기

<br/>

### 👥 유저 이름을 클릭하면 나타나는 프로필 팝업을 원하는 디자인으로 변경해보기
	1. src > components > popup > UserDetailPop.vue 파일 열기  
	2. 현재 있는 기능은 삭제하지 않고 전부 살리면서, css나 HTML 요소의 위치를 바꿔가며 디자인을 변경해보기
