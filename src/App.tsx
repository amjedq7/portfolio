import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Contact from './components/Contact';
import './index.css';

function App() {
  return (
    <div className="min-h-screen bg-zinc-950 text-white">
      <main className="container mx-auto px-6">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}

export default App;
