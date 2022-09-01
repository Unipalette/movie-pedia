export async function getReviews(order = "createdAt") {
  const query = `order=${order}`;
  const response = await fetch(
    `https://learn.codeit.kr/4603/film-reviews?${query}`
  );
  // 배열 형태를 가진 json 데이터가 프로미스 객체에 성공결과로 담긴다.
  const body = await response.json();
  //자바스크립트에서도 사용가능한 배열과 객체 형태로 변환해주는 매소드
  return body;
  // 결국에는 데이터가 담긴 배열로 리턴이 된다.
}
