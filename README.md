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
4. Pagination
 * 별도 Component로 처리.
6. 제품 리스트 
7. 제품별 상세 페이지 (사이즈 조견표, 제품별 내용 넣기 구현 필요)
8. 제품 이미지 커서 zoom in
9. 제품별 Q&A, Review Footer ( Create, View, Pagination )
10. 제품 전체 Q&A, Review ( Create, View, Pagination )
11. 마이페이지
 * Q&A, Review 페이지 ( View, Delete, Pagination )
 * 적립금, 쿠폰 페이지 ( View )
12. Notice ( Admin Only. Create, Delete, View)
13. 장바구니
14. 1:1 문의 메일 전송 (nodeMailer)
15. gsap 활용 LandingPage
 * gsap 적용
 * background video auto play
 * image slider
16. Admin Page
 * GSAP Applied
 * DB Insert ( Product image upload by multer & mongoose save )
 * User Manage ( Can add accumulate price and coupons. )
---
구현 필요사항
1. 관리자 페이지 구현 중
 * MongoDB DOC TTL 적용만 되면 됨.
2. etc 페이지엔 일괄 이메일 또는 카카오톡.
3. 결제 모듈 추가(페이팔?)
 * 결제시 해당 유저의 적립금, 주문내역 필드 업데이트.
---
개선사항
1. ReactDOM.render(function(),ref.current)
 * function() 부분 모듈화해서 따로 폴더로 빼기
2. 1번 수행시 <Provider>로 wrapping되는 것 알아보기
3. 2번 블로그 포스팅
4. Redux 개념 심화 이해
5. 장바구니 비로그인 유저 ( redux store에 상태 저장해서 장바구니 컴포넌트에서 컨트롤하기 )
