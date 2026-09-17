import AboutBeam from '../components/AboutBeam';
import AboutStory from '../components/AboutStory';
import TeamDNA from '../components/TeamDNA';
import AboutCTA from '../components/AboutCTA';
import AboutPartners from '../components/AboutPartners';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export const metadata = {
  title: 'About Us | RiskBerg Consulting',
  description: 'Learn about RiskBerg — our team, credentials, and the thinking behind every engagement.',
};

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="about-page-main">
        <AboutBeam />
        <AboutStory />
        <TeamDNA />
        
        <AboutPartners />
        <AboutCTA />
      </main>
      <Footer />
    </>
  );
}
