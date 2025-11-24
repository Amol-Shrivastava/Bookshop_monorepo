const cds = require("@sap/cds");

class CatalogService extends cds.ApplicationService {
  async init() {
    const { ListofBooks, Books } = this.entities;

    this.after("each", ListofBooks, async (book) => {
      if (book.stock > 111) book.title += ` -- 11% discount`;
    });

    this.on("submitOrder", async (req) => {
      const { book_ID, quantity } = req.data;

      if (!book_ID || !quantity || quantity < 1)
        return req.error(
          400,
          "Book id and valid quantity is mandatory for this operation."
        );
      console.log(`${book_ID} ${quantity}`);
      let book = await SELECT.one.from(Books).where(`ID = ${book_ID}`);
      console.log(book);
      if (!book) return req.error(404, `No book found.`);
      else if (quantity > book.stock)
        return req.error(
          400,
          `Quantity ${quantity} is greater than book stock.`
        );

      await UPDATE(Books, book_ID).with(`stock = stock - ${quantity}`);
      book.stock -= quantity;

      return book;
    });

    await super.init();
  }
}

module.exports = CatalogService;
