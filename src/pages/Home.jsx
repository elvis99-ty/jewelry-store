import MainLayout from "../layouts/MainLayout"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Collections from "../components/Collections"

function Home() {
  return (
    <MainLayout>

      <Hero />

      <Features />

      <Collections/>

    </MainLayout>
  )
}

export default Home