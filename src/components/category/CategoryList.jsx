import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../../functions/category";

const CategoryList = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
    const fetchCategories = async () => {
        try {
        setLoading(true);
        const response = await getCategories();
        setCategories(response);
        setLoading(false);
        } catch (error) {
        console.error(error);
        setLoading(false);
        }
    };
    fetchCategories();
    }, []);

    const showCategories = () =>
        categories.map((c) => (
            <div
                key={c._id}
                className="col btn btn-outlined-primary btn-lg btn-block btn-raised m-3"
            >
                <Link to={`/category/${c.slug}`}>{c.name}</Link>
            </div>
        ));

    return (
        <div className="container">
            <div className="row">
                {loading ? (
                    <h4 className="text-center">Loading...</h4>
                ) : (
                    showCategories()
                )}
            </div>
        </div>
    );
};

export default CategoryList;
