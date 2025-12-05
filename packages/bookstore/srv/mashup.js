const cds = require("@sap/cds");

// cds.once("served", async () => {
//   const CatalogService = await cds.connect.to("CatalogService");
//   const OrderService = await cds.connect.to("OrderService");

//   CatalogService.before("submitOrder", async (req) => {
//     const { book_ID, quantity } = req.data;
//     const { title, price } = await CatalogService.read("Books")
//       .columns("title", "price")
//       .where({ ID: `${book_ID}` });

//     await OrderService.create("OrdersDraft").entries({
//       OrderNo: `Order at ${new Date().toLocaleString()}`,
//       Items: [
//         {
//           product: {
//             ID: `${book_ID}`,
//           },
//           title,
//           price,
//         },
//       ],
//       buyer: req.user.id || "Amol",
//       createdBy: req.user.id || "Amol",
//     });
//   });
// });

// class BookstoreCatalogService extends cds.ApplicationService {
//   async init() {
//     const CatalogService = await cds.connect.to("CatalogService");
//     const ReviewService = await cds.connect.to("ReviewService");
//     const OrderService = await cds.connect.to("OrderService");
//     // const db = await cds.connect.to('db')

//     const { bookstoreBooks } = this.entities;

//     this.after("READ", bookstoreBooks, async (data) => {
//       await Promise.all(
//         data.map(async (book) => {
//           const results = await ReviewService.read("AverageRatings")
//             .columns("subject", "rating")
//             .where({ subject: String(book.ID) });

//           book.ratings = results?.[0]?.rating ?? "NA";
//         })
//       );
//     });

//     return super.init();
//   }
// }

// module.exports = BookstoreCatalogService;

cds.once("served", async () => {
  const CatalogService = await cds.connect.to("CatalogService");
  const ReviewService = await cds.connect.to("ReviewService");


  CatalogService.prepend((srv) =>
    srv.on("READ", "Books/reviews", (req) => {
      debugger;
      const [id] = req.params,
        { columns, limit } = req.query.SELECT;
      return ReviewService.read("Reviews", columns)
        .limit(limit)
        .where({ subject: String(id) });
    })
  );
});
