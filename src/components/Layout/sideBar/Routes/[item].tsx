import { Link } from "react-router-dom";


interface ItemProps {
  page: string;
}

const Item: React.FC<ItemProps> = ({ page }) => {
  if (page === "homepage") {
    return <div id="page">{page}</div>;
  } else {
    return (
      <div id="page">
        <Link to="/">
        <button className="btn btn-large">
  Back to Home
</button>

        </Link>
        {page}
      </div>
    );
  }
};

export default Item;
