import ImageButton from "../components/ImageButton";
import arrow from "../assets/imgs/flecha.png";
import loginButton from "../assets/buttons/botonLogIn.png"

import BackgroundDesktop from "../layouts/BackgroundDesktop";
import Footer from "../layouts/footerDesktop"



import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLogin, LogInForm } from "./../features/LogIn/index";
import type {LoginData} from "./../features/LogIn/index"



export default function LogInPage(){

    const [formData, setFormData] = useState<LoginData | null>(null);
    const navigate = useNavigate();

    const { mutate, isLoading, isError, error } = useLogin((uid) => {
    navigate("/home");
    });

    const handleLogin = () => {
    if (formData) {
        mutate(formData);
    }
    };

    return(

    <div className="w-screen h-screen flex flex-col items-center justify-between relative">
        
        <BackgroundDesktop />
        
        {/* Arrow to go back to the previous page and log in title */}
        <header className="flex flex-row justify-center items-start w-full max-w-full pt-10 pl-10 ">
            <ImageButton to="/" image={arrow} size="w-[60px] h-[60px]" />
            <p className="font-Game text-[#FFB800] text-4xl flex-1 text-center text-6xl pr-16">Log in!</p>
        </header>

        <main className="relative z-10 flex flex-col items-center justify-center overflow-hidden">
            <div className="w-full max-w-xl flex flex-col items-center space-y-4 flex-1 ">


                <LogInForm onSubmit={setFormData}/>

                <div>
                    <ImageButton
                        image={loginButton}
                        onClick={handleLogin}
                        size="w-48 h-20"
                    />
                </div>

                {isLoading && <p className="text-white">Log In... </p>}
                
                {isError && <p className="text-red-500 text-sm">{(error as any).message}</p>}

            </div>
        </main>

        <Footer />
    </div>
    );
}
