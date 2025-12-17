import { Disclosure } from "@headlessui/react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { motion, AnimatePresence } from "framer-motion";
import { serviceBusinessData } from "../shared/constants/service-business";
import { useNavigate } from "react-router-dom";

const ServicesBusiness = () => {
  const navigate = useNavigate();
  const MotionDiv = motion.div;

  const handleConsultationClick = () => {
    navigate("/personal-account");
  };

  return (
    <div className="py-24 bg-white">
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 tracking-tight">
            {serviceBusinessData.legal.title}
          </h1>
          <div className="w-24 h-1 bg-red-200 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 font-light leading-relaxed">
            Профессиональные юридические услуги для вашего бизнеса
          </p>
        </div>

        <div className="space-y-6">
          {serviceBusinessData.legal.services.map((service) => (
            <Disclosure key={service.id}>
              {({ open }) => (
                <div className="border-2 border-red-200 rounded-2xl overflow-hidden">
                  <Disclosure.Button className="flex w-full justify-between items-center px-6 py-4 text-left text-lg font-semibold text-gray-900 hover:bg-red-50 transition">
                    <span>{service.name}</span>
                    <ChevronRightIcon
                      className={`h-6 w-6 text-red-400 transition-transform duration-300 ${open ? "rotate-90" : ""
                        }`}
                    />
                  </Disclosure.Button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <MotionDiv
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 bg-red-50/50">
                          <div className="space-y-4 mt-4">
                            {service.subServices.map((sub) => (
                              <div
                                key={sub.id}
                                className="border-l-4 border-red-400 pl-4"
                              >
                                <h4 className="text-gray-800 font-semibold mb-1">
                                  {sub.name}
                                </h4>
                                <p className="text-gray-600">
                                  {sub.description}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="pt-6">
                            <button
                              onClick={handleConsultationClick}
                              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-2xl transition-colors duration-300"
                            >
                              Получить консультацию
                            </button>
                          </div>
                        </div>
                      </MotionDiv>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </Disclosure>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServicesBusiness;
