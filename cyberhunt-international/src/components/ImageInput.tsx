import type React from "react";
import inputImage from "../assets/imgs/input.png"

interface ImageInputProps{
    type: string;
    placeholder: string;
    inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


export default function ImageInput({type, placeholder, inputMode= "text",value, onChange}:ImageInputProps ){
  
    return(

        <div
        className="bg-no-repeat p-4"
        style={{
            backgroundImage: `url(${inputImage})`,
            width:  '223px',  // ← ancho real de tu imagen
            height: '66px'   // ← alto real de tu imagen
        }}
        >
        <input
            type={type}
            placeholder={placeholder}
            inputMode={inputMode}
            value={value}
            onChange={onChange}
            className="
            block       /* para que respete el width */
            w-full      /* ocupe el 100% del padre */
            placeholder-[#5323C7]
            max-w-full  /* nunca lo supere */
            font-sourceCodeFont text-xl text-[#5323C7] font-bold
            "
            
        />
        </div>
        
    );
}