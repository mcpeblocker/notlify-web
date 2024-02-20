class BotApiService {
  private token: string;

  constructor(token: string) {
    this.token = token;
  }

  async sendMessage(chatId: string, text: string) {
    try {
      // TODO: test whether the fetch function works in the runtime
      const response = await fetch(
        `https://api.telegram.org/bot${this.token}/sendMessage?chat_id=${chatId}&text=${text}`
      );
      if (!response.ok) {
        throw new Error("Failed to send message.");
      }
      return {
        ok: true,
        message: "Message sent.",
      };
    } catch (error: any) {
      // return error in a nice format
      return {
        ok: false,
        message: error?.message || "Couldn't send message.",
      };
    }
  }
}

export default BotApiService;
