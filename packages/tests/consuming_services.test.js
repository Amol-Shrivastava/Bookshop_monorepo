const cds = require("@sap/cds");

const { expect } = cds.test("bookshop");

cds.User.default = cds.User.Privileged;

describe("cap/samples - consuming services locally ", () => {
  console.log("cds.db:", cds.db);
  console.log("services:", cds.services);
  it("bootstrapped the database successfully", () => {
    const { AdminService } = cds.services;
    const { Authors } = AdminService.entities;

    expect(AdminService).to.exist;
    expect(Authors).to.exist;
  });

  it("supports targets as strings or reflected defs", async () => {
    const AdminService = await cds.connect.to("AdminService");
    const { Authors } = AdminService.entities;

    expect(await SELECT.from(Authors))
      // .to.eql(await SELECT.from('Authors'))
      .to.eql(await AdminService.read(Authors))
      .to.eql(await AdminService.read("Authors"))
      .to.eql(await AdminService.run(SELECT.from(Authors)))
      .to.eql(await AdminService.run(SELECT.from("Authors")));
  });

  it("allows reading from local service using cds.ql", async () => {
    const adminService = await cds.connect.to("AdminService");
    const authors = await adminService
      .read("Authors", (a) => {
        a.name,
          a.books((b) => {
            b.title,
              b.currency((c) => {
                c.name, c.symbol;
              });
          });
      })
      .where(`name like`, `E%`);
    expect(authors).to.containSubset([
      {
        name: "Emily Brontë",
        books: [
          {
            title: "Wuthering Heights",
            currency: { name: "British Pound", symbol: "£" },
          },
        ],
      },
      {
        name: "Edgar Allen Poe",
        books: [
          { title: "The Raven", currency: { name: "US Dollar", symbol: "$" } },
          { title: "Eleonora", currency: { name: "US Dollar", symbol: "$" } },
        ],
      },
    ]);
  });

  it("uses same methods for all kind of services, including dbs.", async () => {
    const srv = await cds.connect.to("AdminService");
    const db = await cds.connect.to("db");
    const { Authors } = srv.entities;
    const projection = (a) => {
      a.name,
        a.books((b) => {
          b.title,
            b.currency((c) => {
              c.name, c.symbol;
            });
        });
    };
    const q1 = SELECT.from(Authors, projection).where(`name like`, `E%`);
    const q2 = cds.read(Authors, projection).where(`name like`, `E%`);

    expect(await cds.run(q1))
      .to.eql(await db.run(q1))
      .to.eql(await srv.run(q1))
      .to.eql(await srv.read(Authors, projection).where(`name like`, "E%"))
      .to.eql(await cds.run(q2))
      .to.eql(await db.run(q2))
      .to.eql(await srv.run(q2))
      .to.eql(await db.read(Authors, projection).where(`name like`, "E%"));
  });
});
