import ReviewList from "./ReviewList";
import { useEffect, useState } from "react";
import { getReviews } from "../api";
import ReviewForm from "./ReviewForm";

function App() {
  const [items, setItems] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setHasNext] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingError, setLoadingError] = useState(null);

  const sortedItems = items.sort((a, b) => b[order] - a[order]);
  const LIMIT = 6;

  function handleNewestClick() {
    setOrder("createdAt");
  }
  function handleBestClick() {
    setOrder("rating");
  }
  function handleDelete(id) {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
  }

  async function handleLoad(options) {
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
    if (offset === 0) {
      setItems(reviews);
    } else {
      setItems((prevItems) => [...prevItems, ...reviews]);
    }
    setOffset(options.offset + reviews.length);
    setHasNext(paging.hasNext);
  }

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order]);

  return (
    <div>
      <div>
        <button onClick={handleBestClick}>평점순</button>
        <button onClick={handleNewestClick}>최신순</button>
      </div>
      <ReviewForm />
      <ReviewList onDelete={handleDelete} items={sortedItems} />
      {hasNext && (
        <button disabled={isLoading} onClick={handleLoadMore}>
          더 보기
        </button>
      )}
      {loadingError?.message && <span>{loadingError.message}</span>}
    </div>
  );
}
export default App;
