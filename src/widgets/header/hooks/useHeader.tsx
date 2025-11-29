import { useState } from "react";

export const useHeader = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMobileMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return {
        isMenuOpen,
        toggleMobileMenu
    }
}