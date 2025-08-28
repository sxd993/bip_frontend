const MobileMenuButton = ({ isOpen, onToggle }) => {
  return (
    <div className="md:hidden">
      <button
        onClick={onToggle}
        className="group relative w-10 h-10 flex items-center justify-center transition-all duration-300"
        aria-label={isOpen ? 'Закрыть меню' : 'Открыть меню'}
      >
        <div className="w-6 h-6 relative flex flex-col items-center justify-center">
          {/* Верхняя линия */}
          <span className={`block h-0.5 w-7 bg-white transform transition-all duration-300 origin-center ${
            isOpen ? 'rotate-45 translate-y-1' : ''
          }`}></span>
          
          {/* Средняя линия */}
          <span className={`block h-0.5 w-7 bg-white transform transition-all duration-300 mt-1.5 origin-center ${
            isOpen ? 'opacity-0 scale-0' : ''
          }`}></span>
          
          {/* Нижняя линия */}
          <span className={`block h-0.5 w-7 bg-white transform transition-all duration-300 mt-1.5 origin-center ${
            isOpen ? '-rotate-45 -translate-y-1' : ''
          }`}></span>
        </div>
      </button>
    </div>
  );
};

export default MobileMenuButton;
