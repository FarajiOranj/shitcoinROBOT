"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Skeleton {
    constructor(keyboard) {
        this.layout = {
            reply_markup: {
                resize_keyboard: true,
                one_time_keyboard: true,
                keyboard: keyboard,
            },
        };
    }
    get keyboardLayout() {
        return this.layout;
    }
}
exports.default = Skeleton;
