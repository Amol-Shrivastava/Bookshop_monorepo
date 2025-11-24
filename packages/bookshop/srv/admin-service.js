const cds = require("@sap/cds");

class AdminService extends cds.ApplicationService {
  async init() {
    const { Authors, Books } = this.entities;

    this.before(["NEW", "CREATE"], Authors, genID);
    this.before(["NEW", "CREATE"], Books, genID);

    await super.init();
  }
}

genID = async (req) => {
  const { ID } = req.data;
  if (ID) return;

  let { id } = await SELECT.one.from(req.target).columns(`max(ID) as id`);
  req.data.ID = id + 4;
};

module.exports = AdminService;
