import ReveiwList from "./ReviewList";
import { useEffect, useState } from "react";
import { getReviews } from "../api";
import ReviewForm from "./ReviewForm";

const LIMIT = 6;

function App() {
  const [items, setItmes] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setSHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => id !== item.id);
    setItmes(nextItems);
  };

  const handleLoad = async (options) => {
    let result;
    try {
      setIsLoading(true);
      setLoadingError(null);
      result = await getReviews(options);
    } catch (error) {
      setLoadingError(error);
      return;
    } finally {
      setIsLoading(false);
    }

    const { reviews, paging } = result;

    if (options.offset === 0) {
      setItmes(reviews);
    } else {
      setItmes((prevItems) => [...prevItems, ...reviews]);
      //setItmes([...items, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setSHasNext(paging.hasNext);
  };

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  /*   async function handleLoad(orderQuery) {
    const { reviews } = await getReviews(orderQuery);
    setItmes(reviews);
  }
 */

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <>
      <ReviewForm />
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleBestClick}>베스트순</button>
      <ReveiwList items={sortedItems} onDelete={handleDelete} />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && ( //null or 값이 있음
        <span>{loadingError.message}</span>
      )}
    </>
  );
}
export default App;
