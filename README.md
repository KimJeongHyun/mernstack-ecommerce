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
9. Notice ( Admin Only. Create, View)
---
구현 필요사항
1. SCSS, GSAP
2. 장바구니(비 로그인 유저, 로그인 유저 구별 필요)
 * 로그인 유저 : 
    장바구니 버튼 클릭 
    
    서버에 productIndex 전달
    
    DB의 Cart 모델 데이터 확인
    
    만약 productIndex가 존재한다면 count 필드 증가. 없다면 새로 생성.
    
    장바구니 메뉴를 클릭하면 DB로 부터 Index, count를 얻어와 렌더링. 
    
 * 비로그인 유저 :
    장바구니 버튼 클릭
    
    리듀서에 타입 및 productIndex 전달
    
    같은 Index가 있으면 해당 데이터의 count를 증가. 없다면 신규 데이터로 추가.
    
    장바구니 메뉴를 클릭하면 redux store로부터 데이터를 얻어와 렌더링
    
3. 좋아요 버튼(로그인 유저만 가능.)
4. 관리자 페이지
 * 물품 정리표를 업로드하면 서버에서 자동으로 DB에 넣어주는 로직. 관리자용
5. 결제 모듈 추가(페이팔?)
---
추가해야하는 Model
1. users model modified(좋아요, 장바구니)

