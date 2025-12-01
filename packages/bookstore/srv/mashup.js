const cds = require("@sap/cds");

class BookstoreCatalogService extends cds.ApplicationService {
  async init() {
    const CatalogService = await cds.connect.to("CatalogService");
    // const ReviewServiceAPI = await cds.connect.to("ReviewServiceAPI");

    // this.on("READ", "Books", async (req) => {
    //   return CatalogService.read(req.query);
    // });

    CatalogService.prepend((srv) =>
      srv.on("READ", "Books/reviews", (req) => {
        console.debug("> delegating request to ReviewServiceAPI");
        const { id } = req.params,
          { columns, limit } = req.query.SELECT;
        return ReviewService.read("Reviews", columns)
          .limit(limit)
          .where({ subject: String(id) });
      })
    );

    return super.init();
  }
}

module.exports = BookstoreCatalogService;
