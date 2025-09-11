import ImageWorld from "./WorldMap";
import ImageButton from "../components/ImageButton";
import BackgroundDesktop from "../layouts/BackgroundDesktop";
import Footer from "../layouts/footerDesktop";

//components imports
import ModalQuestion from "../features/home/components/ModalQuestion";
import UserInfo from "../features/home/components/UserInfo";

// Assets
import leaderboardButton from "../assets/buttons/LeaderBoardButton.png";

export default function HomePage() {
    return (
        <div className="w-screen h-screen flex flex-col items-center justify-between relative">
            <BackgroundDesktop />
            
            {/* User Info positioned at top left */}
            <UserInfo />
            
            {/* Leaderboard Button positioned at bottom left */}
            <div className="absolute bottom-24 left-6 z-20">
                <ImageButton
                    to="/leaderboard"
                    image={leaderboardButton}
                    size="w-48 h-20"
                />
            </div>
            
            {/* World Map takes up the main area */}
            <div className="flex-1 w-full flex items-center justify-center">
                <ImageWorld />
            </div>
            
            <Footer />
        </div>
    );
}