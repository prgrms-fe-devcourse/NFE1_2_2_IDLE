import Footer from "../components/Common/Footer";
import Header from "../components/Common/Header";
import SearchBar from "../components/Common/SearchBar";
import PostCard from "../components/Post/PostCard";

const MainPage = () => {
    return (
        <div>
            <Header />
            <SearchBar />
            <PostCard />
            <Footer />
        </div>
    );
};

export default MainPage;