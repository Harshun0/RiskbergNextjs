import Hero from './components/Hero';
import TrustBar from './components/TrustBar';
import Services from './components/Services';
import IDDEIFramework from './components/IDDEIFramework';
import Partners from './components/Partners';
import Testimonials from './components/Testimonials';
import Industries from './components/Industries';
import Footer from './components/Footer';
import HashScroller from './components/ui/HashScroller';

export default function Home() {
  return (
    <main>
      <HashScroller />
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
