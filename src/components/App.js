import ReviewList from "./ReviewList";
import { useCallback, useEffect, useState } from "react";
import { createReviews, deleteReview, getReviews, updateReview } from "../api";
import ReviewForm from "./ReviewForm";
import useAsync from "../hooks/useAsync";
import LocaleContext, { LocaleProvider } from "../contexts/LocaleContext";
import LocaleSelect from "./LocaleSelect";

const LIMIT = 6;

function App() {
  const [locale, setLocale] = useState("ko");
  const [items, setItmes] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const [offset, setOffset] = useState(0);
  const [hasNext, setSHasNext] = useState(false);
  const [isLoading, loadingError, getReviewsAsync] = useAsync(getReviews);
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleDelete = async (id) => {
    const result = await deleteReview(id);
    if (!result) return;
    setItmes((prevItems) => items.filter((item) => id !== item.id));
  };

  const handleLoad = useCallback(
    async (options) => {
      const result = await getReviewsAsync(options);
      if (!result) return;

      const { reviews, paging } = result;

      if (options.offset === 0) {
        setItmes(reviews);
      } else {
        setItmes((prevItems) => [...prevItems, ...reviews]);
        //setItmes([...items, ...reviews]);
      }
      setOffset(options.offset + reviews.length);
      setSHasNext(paging.hasNext);
    },
    [getReviewsAsync]
  );

  const handleLoadMore = () => {
    handleLoad({ order, offset, limit: LIMIT });
  };

  const handleCreateSuccess = (review) => {
    setItmes((prevItems) => [review, ...prevItems]);
  };

  const handleUpdateSuccess = (review) => {
    setItmes((prevItems) => {
      const splitIdx = prevItems.findIndex((item) => item.id === review.id);
      return [
        ...prevItems.slice(0, splitIdx),
        review,
        ...prevItems.slice(splitIdx + 1),
      ];
    });
  };

  useEffect(() => {
    handleLoad({ order, offset: 0, limit: LIMIT });
  }, [order, handleLoad]);

  return (
    <LocaleContext.Provider value={locale}>
      <LocaleSelect value={locale} onChange={setLocale} />
      <div>
        <div>
          <button onClick={handleNewestClick}>최신순</button>
          <button onClick={handleBestClick}>베스트순</button>
        </div>

        <ReviewForm
          onSubmit={createReviews} // 새로운 리뷰글 생성
          onSubmitSuccess={handleCreateSuccess}
        />

        <ReviewList
          items={sortedItems}
          onDelete={handleDelete}
          onUpdate={updateReview}
          onUpdateSuccess={handleUpdateSuccess}
        />
        {hasNext && (
          <button disabled={isLoading} onClick={handleLoadMore}>
            더 보기
          </button>
        )}
        {loadingError?.message && ( //null or 값이 있음
          <span>{loadingError.message}</span>
        )}
      </div>
    </LocaleContext.Provider>
  );
}
export default App;
