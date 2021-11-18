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
 * User Manage ( Can add accumulate price and coupons )
   *  admin can set coupon's expiration date.
---
구현 필요사항
0. 새 랜딩페이지 decoration with gsap scrollTrigger
1. etc 페이지엔 일괄 이메일 또는 카카오톡.
2. 결제 모듈 추가
 * 결제시 해당 유저의 적립금, 주문내역 필드 업데이트.
---
진행사항
1. 결제 모듈 추가
  * KG Inicis 모듈 붙이기 완료.
  * 사용자 주문 페이지 구현 완료.
  * 모듈에 값 넘기기 확인 완료
  * DB 조회로 모듈에 값 전달 적용
  * 결과 코드 0000이 나오면, orderID를 통해 해당 주문 내역의 TTL Expired를 바꿔주고, Confirm을 true로 돌림 적용
  * 결제 인증 여부 방법 확일할 것. true로 돌리는 것 또한 여기서 확인되어야함. ( paymethod에 따라서 TTL을 다르게 주자. 카드 결제면 상관없고, 무통입금이면 1시간?)
2. 반품 및 환불
  * 만약 사용자가 반품 또는 환불을 원하는 경우, 관리자에게 선 Alert 후 처리가 되면 그 때 주문내역 삭제, 적립금 및 쿠폰 등 롤백이 되어야한다.
  * 따라서 관리자 페이지에 주문내역 관리 페이지, 반품 및 환불 페이지가 추가되어야한다.
  * 사용자 MyPage 주문 내역 추가. 환불/반품 버튼 및 기능 추가
  * 관리자 환불/반품 관리 페이지 추가. 

2. iamport로 결제 모듈 추가하는 방법도 알아둘 것.
---
개선사항
1. ReactDOM.render(function(),ref.current)
 * function() 부분 모듈화해서 따로 폴더로 빼거나, 상태 관리가 필요한 경우 컴포넌트화해서 return 해주기.
2. 1번 수행시 <Provider>로 wrapping되는 것 알아보기
3. 2번 블로그 포스팅
4. Redux 개념 심화 이해
5. 장바구니 비로그인 유저 ( redux store에 상태 저장해서 장바구니 컴포넌트에서 컨트롤하기 )
