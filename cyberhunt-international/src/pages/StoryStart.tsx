import React, { useState, useEffect } from 'react';
import { TypeAnimation } from 'react-type-animation';
import { useNavigate } from 'react-router-dom';



import computadora from "./../StoryLine/gifComputadora.png";

import mark1 from './mark1.png';

import backgroundStory from '../assets/mobile/backgroundStory.png';
import BackgroundMobile from "../layouts/BackgroundMobile";
import Footer from "../layouts/footerDektop";

export default function StoryLine() {
    const [currentDialogIndex, setCurrentDialogIndex] = useState(0);
    const [isFirstVisit, setIsFirstVisit] = useState(true);
    const [circleFadeIn, setCircleFadeIn] = useState(false);
    const [isEnding, setIsEnding] = useState(false);
    const [fadeOut, setFadeOut] = useState(false);
    const navigate = useNavigate();
    
    // Dialog array with story content
    const dialogs = [
        "Another great day at GovWare! Let's finish these reports...",
        "Hmm? That’s strange… why is my screen lighting up?",
        "Oh no! A virus just hit my system — right in the middle of GovWare!",
        "I can't fix this on my own. I need your help!",
        "To defeat the virus, you scan qrs...",
        "to either answer questions or play games to earn points.",
        "Each correct answer will wipe out part of the infection and earn you points.",
        "Be careful though — wrong answers make the virus stronger!",
        "Can you clear the virus, restore my computer, and reach the top of the leaderboard?",
        "Continue when you're ready, and let's save this computer together!!"
    ];

    // Character images mapping for each dialog
    const characterImages = [

    ];

    // Get current character image based on dialog index
    const getCurrentCharacterImage = () => {
        return characterImages[currentDialogIndex] || personaje;
    };

    // Handle circular fade in effect on first visit
    useEffect(() => {
        if (isFirstVisit) {
            const timer = setTimeout(() => {
                setCircleFadeIn(true);
                setTimeout(() => {
                    setIsFirstVisit(false);
                }, 1500); // Duration of circle fade in animation
            }, 500); // Wait 500ms before starting circle fade in
            
            return () => clearTimeout(timer);
        }
    }, [isFirstVisit]);

    // Handle fade out effect when story ends
    useEffect(() => {
        if (isEnding) {
            const timer = setTimeout(() => {
                // Navigate to home page after fade out
                navigate('/firstPage');
            }, 1000); // Duration of fade out animation
            
            return () => clearTimeout(timer);
        }
    }, [isEnding, navigate]);

    const handleClick = () => {
        // Check if we're at the last dialog
        if (currentDialogIndex === dialogs.length - 1) {
            // Start ending sequence
            setIsEnding(true);
            setFadeOut(true);
        } else {
            // Advance to next dialog
            setCurrentDialogIndex((prevIndex) => prevIndex + 1);
        }
    };

    return (
        <div className="h-svh w-svw relative">
            {/* Background layer */}
            <BackgroundMobile />

            {/* Story background image layer - positioned lower */}
            <img 
                src={wallpaper} 
                alt="background" 
                className='absolute bottom-0 left-0 w-full h-auto object-cover z-0'
                style={{
                    maxHeight: '80vh'
                }}
            />

            {/* Footer layer */}
            <Footer />

            {/* Circular fade in overlay for first visit */}
            {isFirstVisit && (
                <div 
                    className={`absolute inset-0 w-full h-full z-50 transition-all duration-1500 ease-in-out ${
                        circleFadeIn ? 'scale-0' : 'scale-3'
                    }`}
                    style={{ 
                        backgroundColor: 'black',
                        borderRadius: '50%',
                        transformOrigin: 'center',
                        transform: circleFadeIn ? 'scale(0)' : 'scale(3)'
                    }}
                />
            )}

            {/* Fade out overlay for ending */}
            {isEnding && (
                <div 
                    className={`absolute inset-0 w-full h-full z-50 transition-opacity duration-1000 ease-in-out ${
                        fadeOut ? 'opacity-100' : 'opacity-0'
                    }`}
                    style={{ backgroundColor: 'black' }}
                />
            )}

            

            {/* Transparent text background rectangle - full width at bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-40 z-20" 
                style={{ backgroundColor: 'rgba(255, 255, 255, 0.70)' }}>
            </div>
            
            {/* Text overlay with typewriter effect - with left padding to avoid character overlap */}
            <div className="absolute bottom-0 left-4 right-36 h-40 flex items-center justify-start p-4 text-left z-30">
                <div className="max-w-full max-h-full overflow-hidden">
                    <TypeAnimation
                        key={currentDialogIndex} // Important: change key to restart animation
                        sequence={[dialogs[currentDialogIndex]]}
                        wrapper="span"
                        speed={50}
                        cursor={false}
                        repeat={0}
                        className="text-sm font-semibold text-gray-800 leading-tight font-game block"
                        style={{
                            wordWrap: 'break-word',
                            overflowWrap: 'break-word',
                            hyphens: 'auto'
                        }}
                    />
                </div>
            </div>

            {/* Character positioned at bottom right - changes based on dialog */}
            <div className="absolute bottom-4 right-4 z-30">
                <div className='flex items-center justify-center'>
                    <img 
                        src={getCurrentCharacterImage()} 
                        alt="character" 
                        className="w-40 h-40 object-contain"
                        style={{
                            maxWidth: '30vw',
                            maxHeight: '30vh'
                        }}
                    />
                </div>
            </div>

            {/* Clickable overlay for interaction*/}
            <div 
                className="absolute inset-0 z-25 cursor-pointer" 
                onClick={handleClick}
            />
        </div>
    );
}