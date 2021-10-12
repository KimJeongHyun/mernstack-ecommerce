사용기술

* JavaScript(ES6+)
* React
* Redux
* MongoDB + Mongoose
* Node.js
* Express (Next.js 학습 예정)
---
구현 사항
1. 회원가입/로그인/로그아웃
2. Navigation Bar (사이드, 위쪽 고정)
3. Auth hoc
4. 제품 리스트 출력
 * 제품 리스트 페이지네이션
5. 제품별 상세 페이지 (사이즈 조견표, 제품별 내용 넣기 구현 필요)
6. 제품 이미지 커서 zoom in
7. 제품별 Q&A, Review Footer ( Create, View, Pagination )
8. 제품 전체 Q&A, Review ( Create, View, Pagination )
9. Notice ( Admin Only. Create, Delete, View)
10. 장바구니 
---
구현 필요사항
1. SCSS, GSAP
2. 장바구니(비 로그인 유저인 경우 허용/비허용?)  
 * 비로그인 유저 :
    장바구니 버튼 클릭
    
    리듀서에 타입 및 productIndex 전달
    
    같은 Index가 있으면 해당 데이터의 count를 증가. 없다면 신규 데이터로 추가.
    
    장바구니 메뉴를 클릭하면 redux store로부터 데이터를 얻어와 렌더링
3. 관리자 페이지
 * 물품 정리표를 업로드하면 서버에서 자동으로 DB에 넣어주는 로직. 관리자용
4. 결제 모듈 추가(페이팔?)
 * 결제시 해당 유저의 적립금, 주문내역 필드 업데이트.
5. 최초 랜딩 페이지 다이나믹하게 꾸미기
6. Q&A,Review delete per user
7. HELP TAB
* Only for logined user
* 즉시 1:1 문의 PostView 렌더링
* 이름, 제목, 내용 작성. 문의 범주 select box.
* title: [범주][이름] 제목
* content: 내용 + userID + userPhone
---
