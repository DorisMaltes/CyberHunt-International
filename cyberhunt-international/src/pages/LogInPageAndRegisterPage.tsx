import Footer from "../layouts/footerDesktop"
import BackgroundDesktop from "../layouts/BackgroundDesktop";
import logo from "./../assets/imgs/CyberHunt-Logo.png"



import ImageButton from "../components/ImageButton";

import botonLogIn from "./../assets/buttons/botonLogIn.png"
import buttonRegister from "./../assets/buttons/registerButton.png"



export default function LogInPageAndRegisterPage() {
    

    return(
        <>
            <div className="relative min-h-screen overflow-hidden">
                <BackgroundDesktop />

                <main className="relative z-10 flex flex-col items-center justify-center text-white text-center px-4 py-16">
                    {/* Logo */}
                    <img src={logo} alt="CyberHunt Logo" className=" h-36 object-contain animate-bounce"/> 

                    {/* Buttons for Log In and Register*/}
                    <div className="flex flex-col   pt-20 gap-4">
                        
                        <ImageButton
                            to="/login"
                            image={botonLogIn}
                            size="w-64 h-20"
                            alt="Log In Page"
                        />
                        
                        <br />

                        <ImageButton
                            to="/register"
                            image={buttonRegister}
                            size="w-64 h-20"
                            alt="Register Page"
                        />

                        
                    </div>

                    
                </main>
                

                <Footer />
            </div>
        
        </>

        
    );
}