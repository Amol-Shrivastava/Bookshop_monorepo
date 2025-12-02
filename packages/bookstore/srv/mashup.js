const cds = require("@sap/cds");

class BookstoreCatalogService extends cds.ApplicationService {
  async init() {
    const CatalogService = await cds.connect.to("CatalogService");
    const ReviewService = await cds.connect.to("ReviewService");

    const { bookstoreBooks } = this.entities;

    this.after("READ", bookstoreBooks, async (data) => {
      await Promise.all(
        data.map(async (book) => {
          const results = await ReviewService.read("AverageRatings")
            .columns("subject", "rating")
            .where({ subject: String(book.ID) });

          book.ratings = results?.[0]?.rating ?? "NA";
        })
      );
    });

    return super.init();
  }
}

module.exports = BookstoreCatalogService;

// cds.once("served", async () => {
//   const CatalogService = await cds.connect.to("CatalogService");
//   const ReviewService = await cds.connect.to("ReviewService");

//   CatalogService.prepend((srv) =>
//     srv.on("READ", "Books/reviews", (req) => {
//       debugger;
//       const [id] = req.params,
//         { columns, limit } = req.query.SELECT;
//       return ReviewService.read("Reviews", columns)
//         .limit(limit)
//         .where({ subject: String(id) });
//     })
//   );
// });
