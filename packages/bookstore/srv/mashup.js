const cds = require("@sap/cds");

class BookstoreCatalogService extends cds.ApplicationService {
  async init() {
    const CatalogService = await cds.connect.to("CatalogService");

    this.on("READ", "Books", async (req) => {
      debugger;
      return CatalogService.read(req.query);
    });

    await super.init();
  }
}

module.exports = BookstoreCatalogService;
