import Navbar from "../components/Navbar"

function MainLayout({ children }) {
  return (
    <div className="min-h-screen bg-[#fcfbfb] text-[#78736d]">
      
      <Navbar />

      <main>
        {children}
      </main>

    </div>
  )
}

export default MainLayout