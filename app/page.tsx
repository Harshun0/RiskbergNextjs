import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import IDDEIFramework from './components/IDDEIFramework';
import Partners from './components/Partners';
import Testimonials from './components/Testimonials';
import Industries from './components/Industries';
import Footer from './components/Footer';

export default function Home() {
  return (
    <main>
      <Hero />
      <TrustBar />
      <Services />
      <IDDEIFramework />
      <Partners />
      <Testimonials />
      <Industries />
      <Footer />
    </main>
  );
}
