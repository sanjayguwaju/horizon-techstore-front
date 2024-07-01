import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";
import { searchQuery } from "../../pages/reducers/searchReducer";

const Search = () => {
  const dispatch = useDispatch();
  const search = useSelector((state) => state.search);
  const { text } = search;

  let navigate = useNavigate();

  const handleChange = (e) => {
    dispatch(searchQuery({ text: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/shop?${text}`);
  };

  return (
    <>
      <form className="position-relative mr-3 my-2 my-lg-0" onSubmit={handleSubmit}>
        <input
          type="search"
          placeholder="Search Products ..."
          className="bg-input text-input p-2"
          onChange={handleChange}
          value={text}
        />
      </form>
    </>
  );
};

export default Search;
