//component of the purple registration form
import  purpleBackground from "../../../assets/imgs/Cuadro-De-Contenido-morado.png"
import ImageInput from "./../../../components/ImageInput";

//imports
import { useEffect,useState } from "react";

interface LoginFormProps {
  onSubmit: (formData: {
    email: string;
    password: string;
  }) => void;
}


export default function LogInForm({onSubmit}: LoginFormProps){
    const [formData, setFormData] = useState({
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
                
                <div className="flex flex-col items-center justify-center h-full w-full p-6">
                   
                    <div className="flex flex-col gap-10">

                        <ImageInput
                            type="text"
                            placeholder="Email"
                            value={formData.email}
                            onChange={(e) => handleChange("email", e.target.value)}
                        />
                        
                       <ImageInput
                            type="password"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => handleChange("password", e.target.value)}
                        />

                    </div>

                </div>
                
            </div>
        </div>
    );
}