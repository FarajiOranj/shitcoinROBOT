type btn = { text: string; callback_data?: string, url?: string };

type Keyboard = Array<Array<btn>>;

class Skeleton {
  private layout;

  constructor(keyboard: Keyboard) {
    this.layout = {
      reply_markup: {
        resize_keyboard: true,
        one_time_keyboard: true,
        inline_keyboard: keyboard,
      },
    };
  }

  get keyboardLayout() {
    return this.layout;
  }
}

export default Skeleton;
export { Keyboard };
