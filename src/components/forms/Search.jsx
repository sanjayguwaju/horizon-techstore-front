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
    <form className="form-inline my-2 my-lg-0" onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        type="search"
        value={text}
        className="form-control mr-sm-2"
        placeholder="Search"
      />
      <SearchOutlined onClick={handleSubmit} style={{ cursor: "pointer" }} />
    </form>
  );
};

export default Search;
