import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { getReviews } from "../api";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);

  const sortedItems = items.sort((a, b) => b[order] - a[order]); // 평점이 높은 순 부터니까 (숫자가 높은 숫자부터 내림차순)

  // 영화 종류 별 정리 함수
  const handleNewestClcick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");

  // 삭제 기능 함수
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => item.id !== id);
    // 지정(클릭 된) 요소의 아이디를 제외한 새로운 배열을 생성하면 삭제되는 것과 동일한 효과 :) ㅋㅋ
    setItems(nextItems);
  };

  // 데이터 api를 불러오는 함수

  const handleLoad = async (options) => {
    const { reviews, paging } = await getReviews(options);
    if (options.offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  };

  // 다음페이지를 불러올 함수

  // handleLoad();
  // 무한 루프가 되는 이유 : 비동기 함수 여서 현재 실행중인 컴포넌트 함수랑은 별도로 시작되었음
  // useEffect 로 방지 가능!

  const LIMIT = 6;

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  // [] : 디펜던시 리스트? -> 리랜더링 될때마다 차이점을 살피고 차이점이 있으면 콜백함수 실행

  return (
    <div>
      <div>
        <button onClick={handleNewestClcick}>최신순</button>
        <button onClick={handleBestClick}>평점순</button>
      </div>
      <ReviewList items={sortedItems} onDelete={handleDelete}></ReviewList>
      {hasNext && <button onClick={handleLoadMore}>더 보기</button>}
    </div>
  );
}
// https://learn.codeit.kr/api/film-reviews
export default App;

//페이지 네이션 : 책의 페이지처럼 데이터를 나눠서 제공하는 것!(많은 양의 데이터 제공할 때)
/* 
- 오프셋 기반 :
(상쇄하다./ 지금까지 받아온 데이터의 갯수)
받아온 개수 기준으로 데이터르 받아옴

- 커서 기반 : 커서(특정 데이터를 가리키는 값) / 지금까지 받은 데이터를 표시한 책갈피
(데이터의 중복이나 빠지는 게 없음)/ 오프셋 기반의 단점 보완
데이터를 가리키는 커서 기준으로 데이터를 받아옴
 */
