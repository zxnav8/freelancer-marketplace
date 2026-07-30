import "./Categories.css";
import { useNavigate } from "react-router-dom";

function Categories() {
  const navigate = useNavigate();

  const categories = [
    { icon: "💻", name: "Web Development" },
    { icon: "📱", name: "App Development" },
    { icon: "🎨", name: "UI/UX Design" },
    { icon: "✍️", name: "Content Writing" },
    { icon: "📈", name: "Digital Marketing" },
    { icon: "🤖", name: "AI & Machine Learning" },
  ];

  const handleCategoryClick = (category) => {
    navigate("/freelancers", {
      state: { category },
    });
  };

  return (
    <section className="categories">
      <h2>Browse Categories</h2>

      <p>Find the best freelancers by category</p>

      <div className="category-grid">
        {categories.map((item, index) => (
          <div
            className="category-card"
            key={index}
            onClick={() => handleCategoryClick(item.name)}
            style={{ cursor: "pointer" }}
          >
            <div className="icon">{item.icon}</div>

            <h3>{item.name}</h3>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Categories;