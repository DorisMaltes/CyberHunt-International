//layout imports
import BackgroundDesktop from "../layouts/BackgroundDesktop";
import Footer from "../layouts/footerDesktop";

//assets imports
import botonToHome from "../assets/imgs/flecha.png";

//components imports
import ImageButton from "../components/ImageButton";

//components imports from features/LeaderBoard
import LeaderBoardContainer from "../features/LeaderBoard/component/LeaderBoardContainer";

export default function LeaderboardPage() {
    return (
        <div className="h-screen w-screen">
            <BackgroundDesktop />

            <Footer />

            <div className="h-screen w-screen flex flex-col items-center justify-between px-4 relative z-10 gap-8">
                <div className="w-full pt-5"> 
                    <ImageButton
                        to="/home"
                        image={botonToHome} 
                        size="w-[60px] h-[60px]"
                    />
                </div>
            
                <div className="relative text-center">
                    <p className="text-white font-Game text-[32px] font-normal">Leaderboard!</p>
                </div>

                <LeaderBoardContainer />

                <br />
            </div>
            
            <Footer />
        </div>
    );
}
