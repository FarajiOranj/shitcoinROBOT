const starterMessage = (name: string): string => {
  return `سلام ${name} جان 👋 \n\nبه ربات بلاکچینی خودت خیلی خوش اومدی 🎉\n\nمیتونی برای راهنمایی بیشتر، از گزینه مربوطه استفاده کنی ✅`;
};

const menuMessage: string = "🖲 لطفا گزینه مد نظر خود را انتخاب کنید:";

const notAuthenticated: string = "🚫 شما احراز نشده اید 🚫";

export { starterMessage, notAuthenticated, menuMessage };
