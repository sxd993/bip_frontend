import { SearchIcon } from "@/shared/ui/icons/SearchIcon";
import { SearchBar } from "./SearchBar";
import { BurgerButton } from "@/shared/ui/icons/BurgerButton";

export const Header = () => {
  return (
    <header className="mt-[20px] lg:mt-[30px]">
      <div className="mx-auto max-w-[97%] lg:max-w-[1180px] bg-primary rounded-[7px]">

        {/* ===== MOBILE <430px ===== */}
        <div className="flex items-center justify-between px-4 py-3 xs:hidden lg:hidden">
          <div className="relative w-[200px] overflow-hidden">
            <img
              src="https://s3.twcstorage.ru/d90a9000-bip/logo/Bauken%20Logo%201%20White%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%203%20(1).svg"
              className=" object-cover max-w-[90%]"
            />
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button className="text-[14px] px-4 py-1 border border-white rounded-[6px] text-white font-bold">
              войти
            </button>
            <BurgerButton />
          </div>
        </div>

        {/* ===== TABLET 610px - 1024 */}
        <div className="hidden xs:flex lg:hidden items-center gap-6 px-4 py-3 justify-between">
          <img
            src="https://s3.twcstorage.ru/d90a9000-bip/logo/Bauken%20Logo%201%20White%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%203%20(1).svg"
          />

          {/* Навигация */}
          <nav className="flex items-center gap-5">
            <button className="text-white text-[16px] sm:text-[18px] font-bold text-nowrap">
              о нас
            </button>
            <button className="text-white text-[16px] sm:text-[18px] font-bold">
              статьи
            </button>
          </nav>

          {/* Правый блок */}
          <div className="flex items-center gap-5">
            <button className="text-white text-[16px] sm:text-[18px] font-bold border border-white px-5 py-[6px] rounded-[6px]">
              войти
            </button>
            <BurgerButton className="scale-110" />
          </div>
        </div>

        {/* ===== DESKTOP ===== */}
        <div className="hidden lg:flex items-center justify-around px-6 py-[11px]">
          <div className="mr-[30px]">
            <img
              src="https://s3.twcstorage.ru/d90a9000-bip/logo/Bauken%20Logo%201%20White%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%203%20(1).svg"
            />
          </div>

          <div className="flex items-center mr-[10px] max-w-[519px] min-h-[42px] rounded-[6px] bg-white text-primary">
            <div className="flex justify-between px-4 gap-8">
              <button className="text-[18px] font-bold">о нас</button>
              <button className="text-[18px] font-bold">статьи</button>
            </div>

            <div className="max-w-[318px] h-8 border border-[#A01E1E] rounded-[7px] items-center lg:flex px-2 py-[5px] gap-2 mr-[5px] hidden">
              <SearchIcon />
              <SearchBar />
            </div>
          </div>

          <div className="flex gap-[13px]">
            <button className="h-[42px] px-5 bg-primary border-2 border-white rounded-[6px] text-white font-bold text-[18px]">
              войти
            </button>
            <button className="h-[42px] px-5 bg-white border-2 border-white rounded-[6px] text-black font-bold text-[18px]">
              зарегистрироваться
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
