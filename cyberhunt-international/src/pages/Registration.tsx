// import RegistrationForm from "../features/registration/components/RegistrationForm";
import ImageButton from "../components/ImageButton";
import arrow from "../assets/imgs/flecha.png";
import registerButton from "../assets/buttons/registerButton.png";

//layput imports
import BackgroundDesktop from "../layouts/BackgroundDesktop";
import Footer from "../layouts/footerDesktop"

//imports
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { RegistrationForm, useRegister } from "../features/Registration";
import type {RegisterData} from "../features/Registration/api/registerUser"




export default function Registration() {

    const [formData, setFormData] = useState<RegisterData | null>(null);
    const navigate = useNavigate();

    const { mutate, isPending, isError, error } = useRegister(() => {
        navigate("/login");
    });

    const handleSubmit = () => {
        if (formData) {
        mutate(formData);
        }
    };

    return (
        <div className="w-screen h-screen flex flex-col items-center justify-between relative">        
            
            <BackgroundDesktop />

            {/* Arrow to go back to the previous page and log in title */}
            <header className="flex flex-row justify-center items-start w-full max-w-full pt-10 pl-10 ">
                <ImageButton to="/" image={arrow} size="w-[60px] h-[60px]" />
                <p className="font-Game text-[#FFB800] text-4xl flex-1 text-center text-6xl pr-16">Register!</p>
            </header>

            <main className="relative z-10 flex flex-col items-center justify-center">
                
                {/* components container */}
                <div className="w-full max-w-xl flex flex-col items-center space-y-4 flex-1 ">
                
                
                


                {/* Registration Form */}
                <RegistrationForm onSubmit={setFormData}/>

                {/* Botóncito de registro  Register Button*/}
                <div>
                    <ImageButton
                    image={registerButton}
                    onClick={handleSubmit}
                    size="w-48 h-20"
                    />
                </div>

                {isPending && <p className="text-white">Registering...</p>}
                
                {/* Error Message 
                    Documentation, para saber como se manejan los errores de firebase. para el registro de usuario. Dejo pendiente, 🚩🚩!!
                    https://firebase.google.com/docs/reference/js/v8/firebase.auth.Auth#createuserwithemailandpassword
                */}
                
                {isError && <p className="text-red-500 text-sm">{(error as any).message}</p>} 

                </div>
        </main>

        <Footer />
        </div>
    );
}
