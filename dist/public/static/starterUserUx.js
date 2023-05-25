"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuMessage = exports.starterMessage = void 0;
const starterMessage = (name) => {
    return `سلام ${name} جان👋\n
     به ربات بلاکچینی خودت خیلی خوش اومدی\n
     لطفا جهت راهنمایی گزینه مربوطه را انتخاب کنید`;
};
exports.starterMessage = starterMessage;
const menuMessage = ':لطفا گزینه مد نظر خود را انتخاب کنید';
exports.menuMessage = menuMessage;
