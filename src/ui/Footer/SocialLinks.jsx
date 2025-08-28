const SocialLinks = () => {
    return (
        <div className="flex items-center space-x-4">
            <a 
                href="https://t.me/s/baukenlaw" 
                className="text-slate-400 hover:text-red-400 transition-colors duration-200" 
                aria-label="Telegram"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.18-.357.295-.6.295-.002 0-.003 0-.005 0l.213-3.054 5.56-5.022c.24-.213-.054-.334-.373-.121l-6.869 4.326-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                </svg>
            </a>
            <a 
                href="https://vk.com/baukenlaw74" 
                className="text-slate-400 hover:text-red-400 transition-colors duration-200" 
                aria-label="VK"
            >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M15.07 8.93v-1.4c0-.2-.16-.36-.36-.36h-1.4c-.2 0-.36.16-.36.36v1.4c0 .2.16.36.36.36h1.4c.2 0 .36-.16.36-.36zm-4.64 0v-1.4c0-.2-.16-.36-.36-.36H8.67c-.2 0-.36.16-.36.36v1.4c0 .2.16.36.36.36h1.4c.2 0 .36-.16.36-.36zm4.64 4.64v-1.4c0-.2-.16-.36-.36-.36h-1.4c-.2 0-.36.16-.36.36v1.4c0 .2.16.36.36.36h1.4c.2 0 .36-.16.36-.36zm-4.64 0v-1.4c0-.2-.16-.36-.36-.36H8.67c-.2 0-.36.16-.36.36v1.4c0 .2.16.36.36.36h1.4c.2 0 .36-.16.36-.36z"/>
                </svg>
            </a>
        </div>
    );
};

export default SocialLinks;