import { useState, useEffect } from "react";
export function useNow(interval, enabled) {
  const [now, setNow] = useState();
  useEffect(() => {
    if (!enabled) {
      const timeout = setTimeout(() => setNow(undefined), 0);
      return () => clearTimeout(timeout);
    }

    const int = setInterval(() => {
      setNow(Date.now());
    }, interval);

    return () => clearInterval(int);
  }, [interval, enabled]);

  return now;
}

export function useInterval(interval, enabled, cb) {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    // Вызываем каждую секунду dispatch чтобы отследить закончилось ли время хода у игрока
    const int = setInterval(() => {
      cb(Date.now());
    }, interval);

    return () => clearInterval(int);
  }, [interval, enabled]);
}
