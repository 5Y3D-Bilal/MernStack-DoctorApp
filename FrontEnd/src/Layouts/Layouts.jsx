import Footer from "../components/Footer/footer";
import Header from "../components/Header/header";
import Router from "../routes/Router";

function Layouts() {
  return (
    <>
      <Header className="App" />
      <main className="main">
        <Router />
      </main>
      <Footer />
    </>
  );
}

export default Layouts;
