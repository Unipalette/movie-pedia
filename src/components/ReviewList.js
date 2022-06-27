import "./ReviewList.css";

function formatDate(value) {
  const date = new Date(value);
  return `${date.getFullYear()}. ${date.getMonth() + 1}. ${date.getDate()}`;
}

function ReviewListItem({ item, onDelete }) {
  // 삭제 함수
  const handleDeleteClick = () => onDelete(item.id);

  return (
    <div className="ReviewListItem">
      <img className="ReviewListItem-img" src={item.imgUrl}></img>
      <div>
        <h1>{item.title}</h1>
        <p>{item.rating}</p>
        <p>{formatDate(item.createdAt)}</p>
        <p>{item.content}</p>
        <button onClick={handleDeleteClick}>삭제</button>
      </div>
    </div>
  );
}

function ReviewList({ items, onDelete }) {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id}>
            <ReviewListItem item={item} onDelete={onDelete} />
          </li>
        );
      })}
    </ul>
  );
}

/*  
  
  배열을 랜더링할 때 key를 지정하지 않거나 고유한 값이 아닌
  상대적인 값으로 지정한다면 생기는 문제점들이 있다.(랜더링이 잘못 됨)
  (index처럼 바뀌는 것)

이유 - 배열에 변화를 리액트에 정확하게 전달해주기 위해서! 
(사과망고포도 - > 사과 포도로 배열이 변화했을 때 두가지 경우 
  (1) 망고가 삭제 됐다.
   (2) 포도가 삭제되고 망고가 포도로 변화했다. 
   이 둘 중 뭐가 맞는지 추적할 수 있도록)
  
*/
export default ReviewList;
