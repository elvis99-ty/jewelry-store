import MainLayout from "../layouts/MainLayout"
import Hero from "../components/Hero"
import Features from "../components/Features"
import Collections from "../components/Collections"
import FeaturedPieces from "../components/FeaturedPieces"
import Footer from "../components/Footer"

function Home() {
  return (
    <MainLayout>

      <Hero />

      <Features />

      <Collections/>

      <FeaturedPieces/>

      <Footer/>

    </MainLayout>
  )
}

export default Home