import { SearchIcon } from "@/shared/ui/icons/SearchIcon";
import { SearchBar } from "./SearchBar";

export const Header = () => {

  return (
    <>
      <header className='max-w-[1180px] bg-primary mt-[30px] max-h-[62px] mx-auto rounded-[7px]'>
        {/* Общий контейнер*/}
        <div className='px-6 py-[11px] flex items-center justify-center'>
          {/* Логотип*/}
          <div className="mr-[30px] max-w-[225px]">
            <img src="https://s3.twcstorage.ru/d90a9000-bip/logo/Bauken%20Logo%201%20White%20%E2%80%94%20%D0%BA%D0%BE%D0%BF%D0%B8%D1%8F%203%20(1).svg" alt="Баукен и партнеры" />
          </div>
          {/* Навигация*/}
          <div className='max-w-[519px] min-h-[42px] rounded-[6px] bg-white flex items-center mr-[10px]'>
            {/* Кнопки*/}
            <div className='flex justify-between px-4 gap-4'>
              <button className='text-[18px] !font-bold text-center text-primary !leading-[100%] text-nowrap'>о нас</button>
              <button className='text-[18px] !font-bold text-center text-primary leading-[100%]'>статьи</button>
            </div>
            {/* Поиск */}
            <div className='max-w-[318px] h-8 border-1 border-[#A01E1E] rounded-[7px] items-center flex px-1 py-[5px] gap-2 mr-[5px]'>
              <SearchIcon />
              <SearchBar />
            </div>
          </div>
          {/* Аутентификация */}
          <div className="flex gap-[13px]">
            <button
              className="max-w-[125px] max-h-[42px] bg-primary border-2 border-white rounded-[6px] flex py-4 px-8 items-center"
            >
              <p className="text-white font-bold leading-[100%] text-[18px]">войти</p>
            </button>
            <button
              className="max-w-[227px] max-h-[42px] bg-white border-2 border-white rounded-[6px] flex py-4 px-8 items-center"
            >
              <p className=" text-black font-bold leading-[100%] text-[18px]">зарегистрироваться</p>
            </button>
          </div>
        </div>
      </header>


    </>
  );
};
