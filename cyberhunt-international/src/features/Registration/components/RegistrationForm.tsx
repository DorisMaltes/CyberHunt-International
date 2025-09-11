//component of the purple registration form

//assets imports
import  purpleBackground from "../../../assets/imgs/Cuadro-De-Contenido-morado.png"
import ImageInput from "../../../components/ImageInput";

//imports
import { useEffect, useState } from "react";

interface RegistrationFormProps{
    onSubmit: (FormData: {
        name: string;
        title: string;
        company: string;
        number: string;
        email: string;
        password: string;
    }) => void;
}

export default function RegistrationForm({onSubmit}: RegistrationFormProps){
    const [formData, setFormData] = useState({
        name: "",
        title: "",
        company: "",
        number: "",
        email: "",
        password: "",

    });

    useEffect(() => {
        onSubmit(formData);
    }, [formData, onSubmit]);

    const handleChange = (field: string, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    return(
        <div className="relative inline-block">
            <img src={purpleBackground} alt="" className="block" />
            
            <div className="absolute inset-0 overflow-y-auto flex items-center justify-center">
                
                <div className="flex flex-col items-center justify-between h-full w-full p-6">
                
                    <ImageInput type="text" placeholder="Name" value={formData.name} onChange={(e) => handleChange("name", e.target.value)} />
                    <ImageInput type="text" placeholder="Title" value={formData.title} onChange={(e) => handleChange("title", e.target.value)}/>
                    <ImageInput type="text" placeholder="Company" value={formData.company} onChange={(e) => handleChange("company", e.target.value)}/>
                    <ImageInput type="text" placeholder="Number" inputMode="numeric" value={formData.number} onChange={(e) => handleChange("number", e.target.value)}/>

                    <ImageInput type="text" placeholder="Email" inputMode="email" value={formData.email} onChange={(e) => handleChange("email", e.target.value)}/>
                    <ImageInput type="password" placeholder="Password" value={formData.password} onChange={(e) => handleChange("password", e.target.value)}/>

                </div>
                
            </div>
        </div>
    );
}