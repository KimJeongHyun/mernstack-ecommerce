사용기술

* JavaScript(ES6+)
* React
* Redux, Redux-thunk
* MongoDB + Mongoose
* Node.js
* Express (Next.js 학습 예정)

구현 사항
1. 회원가입/로그인/로그아웃
2. Navigation Bar (사이드, 위쪽 고정)
3. Auth hoc
4. 제품 리스트 출력
4-1. 제품 리스트 페이지네이션
5. 제품별 상세 페이지 (사이즈 조견표, 제품별 내용 넣기 구현 필요)
6. 제품별 Q&A, Review Footer (DB 저장까지 완성. FE로 렌더링, 페이징 필요 )

구현 필요사항
1. SCSS, GSAP
2. 제품 이미지 커서 올렸을 때 줌 
3. 제품별 Q&A, Review(페이징)
4. 제품전체 Q&A, Review
  * model.find({})로 전부 불러와서 나열하고 페이징
6. 장바구니(비 로그인 유저, 로그인 유저 구별 필요)
  * 비로그인 유저는 Redux store에 품번을 저장. 로그인하거나 브라우저 벗어나면 휘발되도록 해야함.
  * 로그인 유저는 DB에 저장
8. 좋아요 버튼(로그인 유저만 가능.)
9. Notice (관리자만 CRUD, 페이징)
10. 관리자 페이지
8-1. 물품 정리표를 업로드하면 서버에서 자동으로 DB에 넣어주는 로직. 관리자용

추가해야하는 Model
1. Notice
2. users model modified(좋아요, 장바구니)

