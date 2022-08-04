# dogWalk
🐶Dog owner &amp; Dog walker matching service🐶
#### 서비스 개요
> 반려견을 기르는 사람들 중 바빠서 매일 산책을 시키기 어려운 경우 많음   
> 반대로 다른 보호자의 반려견을 산책시키고 용돈벌이를 하려는 공급도 존재함   
> 바쁜 보호자와 산책 훈련사의 매칭 서비스를 구현함   
> 1. 서비스 사용을 원하는 보호자는 반려견에 대한 정보와 함께 산책 서비스를 신청함.   
> 2. 해당 지역의 신청 정보들을 모아서 산책 훈련사 계정에게 제공함.   
> 3. 산책 훈련사가 자신에게 맞는 신청을 선택하여 채팅 기능을 통해 매칭되는 구조.   

### 사용 스택
>#### Backend
>> * 서버 : Node.js, Express.  
>> * DB : Mongo DB
>#### Frontend
>> * HTML Template : PUG  
>> * Style : SCSS   
>> * React 등의 Frontend 라이브러리를 사용하지 않아서 webpack을 따로 설치/설정해서 사용 (추후 React 적용 에정)
>##### 기타 사용한 node package들
>> * bcypt : 사용자의 pw를 DB에 저장할 때 hashing할 때 사용하기 위함   
>> * dotenv : DB URL, Session Secret등의 값을 환경변수에 넣어 사용하기 위함  
>> * multer : 보호자로부터 반려견 사진을 받아 처리하기 위함   
>> * babel : js 버전 차이로 인한 호환성 이슈 없애기 위함     

### 현재 작업중인, 또는 추가 구현 예정인 기능
> #### Backend
> * 반려견 사진 업로드 기능
> * 보호자/훈련사 매칭 기능 (채팅은 SocketIO를 이용해서 구현할 예정)
> * typescript로 대체할 계획 (2022.8.4 기준 공부중임. 더 커지기 전에 얼른 바꿀 계획)
> #### Frontend
> * Front쪽 interaction은 React로 작성할 계획(2022.8.4 기준 공부중임)
> * 백엔드와 프론트엔드 모든 기능 구현 후 맨 마지막에 SCSS 적용할 예정 (현재는 mvp.css 입혀놓음)





