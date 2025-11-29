const Copyright = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <div className="text-slate-400 text-sm mb-4 md:mb-0">
      © {currentYear} Баукен и Партнеры. Все права защищены.
    </div>
  );
};

export default Copyright;
