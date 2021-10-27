사용기술

* JavaScript(ES6+)
* React
* Redux
* MongoDB + Mongoose
* Node.js
* Express (Next.js 학습 예정)
---
구현 사항

0. 없는 링크 접근시 404 page route
1. 회원가입/로그인/로그아웃
2. Navigation Bar (사이드, 위쪽 고정)
3. Auth hoc
4. 제품 리스트 출력
 * 제품 리스트 페이지네이션
5. 제품별 상세 페이지 (사이즈 조견표, 제품별 내용 넣기 구현 필요)
6. 제품 이미지 커서 zoom in
7. 제품별 Q&A, Review Footer ( Create, View, Pagination )
8. 제품 전체 Q&A, Review ( Create, View, Pagination )
9. 마이페이지
 * Q&A, Review 페이지 ( View, Delete, Pagination )
11. Notice ( Admin Only. Create, Delete, View)
12. 장바구니
13. 1:1 문의 메일 전송 (nodeMailer)
14. gsap 활용 LandingPage
 * gsap 적용
 * background video auto play
 * image slider
---
구현 필요사항
1. 관리자 페이지 구현 중
 * 물품 정보 입력시 자동으로 DB Insert. Excel 또는 json 넘겼을 때의 경우를 상정해야할 듯.
 * 유저 관리창. 유저를 리스트로 관리하고, 필요한 경우 적립금을 지급할 수 있음.
2. 결제 모듈 추가(페이팔?)
 * 결제시 해당 유저의 적립금, 주문내역 필드 업데이트.
3. 최초 랜딩 페이지 다이나믹하게 꾸미기
---
개선사항
1. ReactDOM.render(function(),ref.current)
 * function() 부분 모듈화해서 따로 폴더로 빼기
2. 1번 수행시 <Provider>로 wrapping되는 것 알아보기
3. 2번 블로그 포스팅
4. Redux 개념 심화 이해
5. 장바구니 비로그인 유저 ( redux store에 상태 저장해서 장바구니 컴포넌트에서 컨트롤하기 )
