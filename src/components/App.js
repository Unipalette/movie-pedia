import ReveiwList from "./ReviewList";
import { useEffect, useState } from "react";
import { getReviews } from "../api";

function App() {
  const [items, setItmes] = useState([]);
  const [order, setOrder] = useState("createdAt");
  const sortedItems = items.sort((a, b) => b[order] - a[order]);

  const handleNewestClick = () => setOrder("createdAt");
  const handleBestClick = () => setOrder("rating");
  const handleDelete = (id) => {
    const nextItems = items.filter((item) => id !== item.id);
    setItmes(nextItems);
  };

  const handleLoad = async (orderQuery) => {
    const { reviews } = await getReviews(orderQuery);
    setItmes(reviews);
  };

  /*   async function handleLoad(orderQuery) {
    const { reviews } = await getReviews(orderQuery);
    setItmes(reviews);
  }
 */
  useEffect(() => {
    handleLoad(order);
    console.log("load");
  }, [order]);

  return (
    <>
      <button onClick={handleNewestClick}>최신순</button>
      <button onClick={handleBestClick}>베스트순</button>
      <ReveiwList items={sortedItems} onDelete={handleDelete} />
    </>
  );
}
export default App;
