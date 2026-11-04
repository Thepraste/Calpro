import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import LiveTV from "./components/LiveTV"
import ProgrammeSchedule from "./components/ProgrammeSchedule"
import About from "./components/About"
import Footer from "./components/Footer"

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#080808] text-white">
      <Navbar />
      <main>
        <Hero />
        <LiveTV />
        <ProgrammeSchedule />
        <About />
      </main>
      <Footer />
    </div>
  )
}

export default App
