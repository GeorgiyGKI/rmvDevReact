import Background from "./Background";
import Container from "./Container";
import Footer from "./Footer";
import Header from "./Header";
import Logo from "./Logo";
import BookmarksButton from "./BookmarksButton";
import SearchForm from "./SearchForm";
import Sidebar from "./Sidebar";
import JobItemContent from "./JobItemContent";
import ResultsCount from "./ResultsCount";
import SortingControls from "./SortingControls";
import { Toaster } from "react-hot-toast";
import PaginationControls from "./PaginationControls";
import JobListData from "./JobListData";

function App() {
  return <>
    <Background />

    <Header>
      <div className="header__top">
        <Logo />
        <BookmarksButton />
      </div>

      <SearchForm />
    </Header>

    <Container>
      <Sidebar>
        <div className="sidebar__top">
          <ResultsCount />
          <SortingControls />
        </div>
        <JobListData />
        <PaginationControls />
      </Sidebar>

      <JobItemContent />
    </Container>

    <Footer />

    <Toaster position="top-right" />
  </>
}

export default App;
