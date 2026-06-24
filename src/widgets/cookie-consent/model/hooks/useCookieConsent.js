import { useState } from "react";
import { COOKIE_CONSENT_STORAGE_KEY } from "../const/storageKey";

const hasAcceptedCookies = () => {
  try {
    return localStorage.getItem(COOKIE_CONSENT_STORAGE_KEY) === "true";
  } catch {
    return false;
  }
};

export const useCookieConsent = () => {
  const [isVisible, setIsVisible] = useState(() => !hasAcceptedCookies());

  const accept = () => {
    try {
      localStorage.setItem(COOKIE_CONSENT_STORAGE_KEY, "true");
    } catch {
      // localStorage недоступен — просто скрываем плашку в текущей сессии
    }

    setIsVisible(false);
  };

  return { isVisible, accept };
};
