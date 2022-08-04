# dogWalk
🐶Dog owner &amp; Dog walker matching service🐶
#### 사용 스택
#### Backend
> 서버 : Node.js, Express.  
> DB : Mongo DB
#### Frontend
> HTML Template : PUG  
> Style : SCSS
> React 등의 Frontend 라이브러리를 사용하지 않아서 webpack을 따로 설치/설정해서 사용 (추후 React 적용 에정)
##### 기타 사용한 node package들
> 1. bcypt : 사용자의 pw를 DB에 저장할 때 hashing할 때 사용하기 위함   
> 2. dotenv : DB URL, Session Secret등의 값을 환경변수에 넣어 사용하기 위함  
> 3. multer : 보호자로부터 반려견 사진을 받아 처리하기 위함   
> 4. babel : js 버전 차이로 인한 호환성 이슈 없애기 위함   
> 5. nodemon : 개발 과정에서 자동 새로고침 기능 위함   



### 서비스 개요
> ##### 최근 반려견을 기르는 사람들이 증가하고 있지만, 너무 바빠 매일 산책을 시키기 어려운 경우가 많음   
> ##### 반면, 다른 보호자의 반려견을 산책시키고 용돈벌이를 하려는 공급 또한 존재함   
> ##### 그래서 바쁜 보호자와 산책 훈련사의 매칭 서비스를 구현해봄
> 1. 서비스 사용을 원하는 보호자는 반려견에 대한 정보와 함께 산책 서비스를 신청함.   
> 2. 해당 지역의 신청 정보들을 산책 훈련사 계정에게 제공함.   
> 3. 산책 훈련사는 이 신청 정보들 중 자신에게 맞는 신청을 선택하여 매칭되는 구조.   


