"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuMessage = exports.notAuthenticated = exports.starterMessage = void 0;
const starterMessage = (name) => {
    return `سلام ${name} جان 👋 \n\nبه ربات بلاکچینی خودت خیلی خوش اومدی 🎉\n\nمیتونی برای راهنمایی بیشتر، از گزینه مربوطه استفاده کنی ✅`;
};
exports.starterMessage = starterMessage;
const menuMessage = "🖲 لطفا گزینه مد نظر خود را انتخاب کنید:";
exports.menuMessage = menuMessage;
const notAuthenticated = "🚫 شما احراز نشده اید 🚫";
exports.notAuthenticated = notAuthenticated;
