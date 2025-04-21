import 'font-awesome/css/font-awesome.min.css';
import './App.css'
import About from './components/about/About'
import Hero from './components/hero/Hero'
import Nav from './components/nav/Nav'
import BooksList from './components/books/BooksList';
import Footer from './components/footer/Footer';

function App() {

  return (
    <>
      <Nav />
      <Hero />
      <About />
      <BooksList />
      <Footer />
    </>
  )
}

export default App
