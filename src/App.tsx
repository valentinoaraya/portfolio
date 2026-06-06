import Index from "./Index";
import AboutMeSection from "./components/AboutMeSection";
import ChallengesSection from "./components/ChallengesSection";
import ContactSection from "./components/ContactSection";
import Footer from "./components/Footer";
import ProjectsSection from "./components/ProjectsSection";
import StatsSection from "./components/StatsSection";
import WorkflowSection from "./components/WorkflowSection";
import { LenisProvider } from "./context/LenisProvider";

function App() {
	return (
		<LenisProvider>
			<div className="bg-dark">
				<Index />
				<ProjectsSection />
				<ChallengesSection />
				<WorkflowSection />
				<div className="relative">
					<StatsSection />
					<AboutMeSection />
				</div>
				<ContactSection />
				<Footer />
			</div>
		</LenisProvider>
	);
}

export default App;
