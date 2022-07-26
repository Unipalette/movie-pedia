import { useState } from "react";
import "./ReviewForm.css";

function ReviewForm() {
  const [title, setTitle] = useState("");
  const [rating, setRating] = useState(0);
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };
  const handleRatingChange = (e) => {
    const nextRating = Number(e.target.value) || 0;
    setRating(nextRating);
  };
  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  return (
    <form className="ReviewForm">
      <input
        placeholder="제목을 입력하세요."
        value={title}
        onChange={handleTitleChange}
      />
      <input type="number" value={rating} onChange={handleRatingChange} />
      <textarea
        placeholder="내용을 입력하세요."
        value={content}
        onChange={handleContentChange}
      />
    </form>
  );
}
export default ReviewForm;
