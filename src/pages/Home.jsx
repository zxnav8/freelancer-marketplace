import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Categories from "../components/Categories";
import FeaturedFreelancers from "../components/FeaturedFreelancers";
import LatestProjects from "../components/LatestProjects";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <Navbar />

      <main className="home">

        <Hero />

        <Categories />

        <FeaturedFreelancers />

        <LatestProjects />

      </main>

      <Footer />
    </>
  );
}

export default Home;