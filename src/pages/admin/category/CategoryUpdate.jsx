import { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategory, updateCategory } from "../../../functions/category";
import { useNavigate, useParams } from 'react-router-dom';

const CategoryUpdate = () => {
  const { user } = useSelector((state) => ({ ...state }));

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    loadCategory();
  }, []);

  const loadCategory = async () => {
    try {
      const category = await getCategory(slug);
      console.log({category});
      setName(category.name);
    } catch (error) {
      console.error("Failed to load category", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateCategory(slug, { name }, user.token);
      setLoading(false);
      setName("");
      toast.success(`"${res.name}" is updated`);
      navigate('/admin/category');
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (err.response.status === 400) toast.error(err.response.data);
    }
  };

  const categoryForm = () => (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Name</label>
        <input
          type="text"
          className="form-control"
          onChange={(e) => setName(e.target.value)}
          value={name}
          autoFocus
          required
        />
        <br />
        <button className="btn btn-outline-primary">Save</button>
      </div>
    </form>
  );

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-2">
          <AdminNav />
        </div>
        <div className="col">
          {loading ? (
            <h4 className="text-danger">Loading..</h4>
          ) : (
            <h4>Update category</h4>
          )}
          {categoryForm()}
          <hr />
        </div>
      </div>
    </div>
  );
};

export default CategoryUpdate;
