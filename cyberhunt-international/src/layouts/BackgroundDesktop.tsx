import MovingCloud from "../components/design-components/MovingCloud"

import star1 from "../assets/stars/star-gif.gif"
import star2 from "../assets/stars/star2GIF.gif"
import star3 from "../assets/stars/star3GIF.gif"
import star5 from "../assets/stars/star5.png"

import nube1 from "../assets/imgs/nube1.png"
import nube2 from "../assets/imgs/nube2.png"

import star6 from "../assets/stars/estrella6.gif"
import star7 from "../assets/stars/estrella7.gif";
import star8 from "../assets/stars/estrella8.gif"
import star9 from "../assets/stars/estrella9.png"
import star10 from "../assets/stars/estrella10.gif"


export default function BackgroundDesktop() {
    return (
        <div className="fixed inset-0 -z-10 bg-cover bg-center bg-[#15054E]">

            {false && (
                <div className="relative w-full h-screen">

                    <img src={star2} className="w-[30px] object-contain absolute top-[30%] left-[10%]" />

                    <img src={star1} className="w-[20px] object-contain absolute top-[40%] left-[49px]" />

                    <img src={star3} className="w-[20px] rotate-45 object-contain absolute top-[2%] left-[2%]" />

                    <img src={star8} className="h-[20px] rotate-1 object-contain absolute top-[30%] right-[15px]" />

                    <img src={star3} className="w-[46px] h-[46px] rotate-45 object-contain absolute top-[25%] right-[10%]" />

                    <img src={star5} className="w-[10px] object-contain absolute top-1/2 right-[5%]" /> {/*punto morado*/}

                    <img src={star3} className="w-[26px]  rotate-12 object-contain absolute top-[0%] left-1/2 rotate-0" />

                    
                    {/*4 puntos MORADS*/}
                    <img src={star6} className="w-[50px]  object-contain absolute top-[50%] left-[30%] " />

                    {/*cruz MORADA aqua con 4 puntos en el medio*/}
                    <img src={star7} className="w-[26px]   object-contain absolute top-[3%] right-[2%] " />

                    {/*cruz azul aqua con 4 puntos en el medio*/}
                    <img src={star8} className="w-[20px] object-contain absolute top-[50%] left-[50%] " />

                    {/*circulo de puntos azul aqua*/}
                    <img src={star9} className="w-[20px]  object-contain absolute top-[65%] left-[15%] " />

                    {/*circulo de puntos AMRAILLO*/}
                    <img src={star10} className="w-[20px]  object-contain absolute top-[30%] left-[45%]" />


                </div>

                )}
                
                <MovingCloud
                    imageUrl={nube1}
                    direction="right-to-left"
                    size={{ width: 'w-[100px]', height: 'h-[100px]' }}
                    speed={1}
                    yPosition="top-0"
                />

                <MovingCloud
                    imageUrl={nube1}
                    direction="left-to-right"
                    size={{ width: 'w-40', height: 'h-40' }}
                    speed={1}
                    yPosition="top-1/3"
                />

                <MovingCloud
                    imageUrl={nube2}
                    direction="right-to-left"
                    size={{ width: 'w-40', height: 'h-40' }}
                    speed={0.5}
                    yPosition="top-2/3"
                />

            



        </div>
    );

}
