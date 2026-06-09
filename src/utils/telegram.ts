export function getTelegramUser() {
  console.log("Telegram object:", (window as any).Telegram);

  console.log("Telegram WebApp:", (window as any).Telegram?.WebApp);

  console.log(
    "initDataUnsafe:",
    (window as any).Telegram?.WebApp?.initDataUnsafe,
  );

  const user = (window as any).Telegram?.WebApp?.initDataUnsafe?.user;

  console.log("Telegram user:", user);

  if (!user) return null;

  return {
    id: user.id,
    username: user.username,
    firstName: user.first_name,
  };
}
