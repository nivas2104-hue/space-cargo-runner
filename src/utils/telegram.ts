export function getTelegramUser() {
  const user = (window as any).Telegram?.WebApp?.initDataUnsafe?.user;
  if (!user) return null;

  return {
    id: user.id,
    username: user.username,
    firstName: user.first_name,
  };
}
