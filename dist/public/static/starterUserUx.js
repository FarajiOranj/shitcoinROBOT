"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuMessage = exports.starterMessage = void 0;
const starterMessage = (name) => {
    return `
     سلام ${name} جان 👋
     به ربات بلاکچینی خودت خیلی خوش اومدی 🎉
     میتونی برای راهنمایی بیشتر، از گزینه مربوطه استفاده کنی ✅`;
};
exports.starterMessage = starterMessage;
const menuMessage = ':لطفا گزینه مد نظر خود را انتخاب کنید';
exports.menuMessage = menuMessage;
