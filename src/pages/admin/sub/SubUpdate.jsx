import { useState, useEffect } from "react";
import AdminNav from "../../../components/nav/AdminNav";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { getCategories } from "../../../functions/category";
import { updateSub, getSub } from "../../../functions/sub";
import { useNavigate, useParams } from 'react-router-dom';
import CategoryForm from "../../../components/forms/CategoryForm";

const SubUpdate = () => {
  const user = useSelector((state) => state.user);

  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [parent, setParent] = useState("");

  const navigate = useNavigate();
  const { slug } = useParams();

  useEffect(() => {
    loadCategories();
    loadSub();
  }, []);

    const loadCategories = async () => {
        try {
            const response = await getCategories();
            setCategories(response);
        } catch (error) {
            console.error("Failed to load categories", error);
        }
    };

    const loadSub = async () => {
        try {
            const sub = await getSub(slug);
            setName(sub.name);
            setParent(sub.parent);
        } catch (error) {
            console.error("Failed to load sub", error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await updateSub(slug, { name, parent }, user.token);
            setLoading(false);
            setName("");
            toast.success(`"${res.name}" is updated`);
            navigate('/admin/sub');
        } catch (err) {
            console.log(err);
            setLoading(false);
            if (err.response.status === 400) toast.error(err.response.data);
        }
    };

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
            <h4>Update sub category</h4>
          )}

          <div className="form-group">
            <label>Parent category</label>
            <select
              name="category"
              className="form-control"
              onChange={(e) => setParent(e.target.value)}
            >
              <option>Please select</option>
              {categories.length > 0 &&
                categories.map((c) => (
                  <option key={c._id} value={c._id} selected={c._id === parent}>
                    {c.name}
                  </option>
                ))}
            </select>
          </div>

          <CategoryForm
            handleSubmit={handleSubmit}
            name={name}
            setName={setName}
          />
        </div>
      </div>
    </div>
  );
};

export default SubUpdate;
