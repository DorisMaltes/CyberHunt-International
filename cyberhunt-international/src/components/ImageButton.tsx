// this is a component for doing things with a custom button image 

import { useNavigate } from "react-router-dom";

interface ImageButtonProps {
    to?: string;
    onClick?: () => void;
    image: string;
    size?: string;
    alt?: string;
    className?: string;
    disabled?: boolean;
}

export default function ImageButton({
    to,
    onClick,
    image,
    size = "w-40 h-16",
    alt = "Button",
    className,
    disabled = false
}: ImageButtonProps) {
    const navigate = useNavigate();

    const handleClick = () => {
        if (disabled) return;
        if (onClick) onClick();     // excutes the function first
        if (to) navigate(to);       // navigates to the page
    };

    return (
        <button
        onClick={handleClick}
        disabled={disabled}
        className={`bg-no-repeat bg-center bg-contain ${size} ${className} ${
            disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
        }`}
        style={{ backgroundImage: `url(${image})` }}
        aria-label={alt}
        />
    );
}
