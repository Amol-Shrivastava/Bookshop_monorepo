const cds = require("@sap/cds");
const { GET, expect, axios } = cds.test("bookshop");

axios.defaults.auth = {
  username: "alice",
  password: "admin",
};

describe("cap/samples - Bookshop APIs", () => {
  it("serves $metadata document in v4", async () => {
    const { header, status, data } = await GET`/browse/$metadata`;
    expect(status).to.eql(200);
    // expect(header).to.contain({
    //   Version: "4.0",
    // });
    // expect(header["content-type"]).to.match(/application\/xml; charset=utf-8/);
    expect(data).to.contain(
      '<EntitySet Name="Books" EntityType="CatalogService.Books">'
    );
    expect(data).to.contain(
      '<Annotation Term="Common.Label" String="Currency"/>'
    );
  });

  it("serves Books?$exapnd=genre, currency", async () => {
    const Mystery = { name: "Mystery" };
    const Romance = { name: "Romance" };

    const USD = { name: "US Dollar", code: "USD", descr: null, symbol: "$" };
    const { data } = await GET`/browse/Books ${{
      params: {
        $search: "Po",
        $select: "title,author",
        $expand: `genre,currency`,
      },
    }}`;
    expect(data.value).to.containSubset([
      {
        ID: 251,
        title: "The Raven",
        author: "Edgar Allen Poe",
        genre: Mystery,
        currency: USD,
      },
      {
        ID: 252,
        title: "Eleonora",
        author: "Edgar Allen Poe",
        genre: Romance,
        currency: USD,
      },
    ]);
  });

  it("serves /browse/Books?$select=genre/name,currency/code", async () => {
    const { data } = await GET`/browse/Books ${{
      params: {
        $search: "Po",
        $select: `title,author,genre/name,currency/code`,
      },
    }}`;

    expect(data.value).to.containSubset([
      {
        ID: 251,
        title: "The Raven",
        author: "Edgar Allen Poe",
        genre_name: "Mystery",
        currency_code: "USD",
      },
      {
        ID: 252,
        title: "Eleonora",
        author: "Edgar Allen Poe",
        genre_name: "Romance",
        currency_code: "USD",
      },
    ]);
  });
});

describe("query options...", () => {
  it("supports $search in multiple fields", async () => {
    // debugger;
    const { data } = await GET`/browse/Books ${{
      params: {
        $search: "Po",
        $select: "title,author",
      },
    }}`;

    expect(data.value).to.containSubset([
      { ID: 201, title: "Wuthering Heights", author: "Emily Brontë" },
      { ID: 207, title: "Jane Eyre", author: "Charlotte Brontë" },
      { ID: 251, title: "The Raven", author: "Edgar Allen Poe" },
      { ID: 252, title: "Eleonora", author: "Edgar Allen Poe" },
    ]);
  });

  it("supports $select", async () => {
    const { data } = await GET`/browse/Books ${{
      params: { $select: `ID,title` },
    }}`;
    expect(data.value).to.containSubset([
      { ID: 201, title: "Wuthering Heights" },
      { ID: 207, title: "Jane Eyre" },
      { ID: 251, title: "The Raven" },
      { ID: 252, title: "Eleonora" },
      { ID: 271, title: "Catweazle" },
    ]);
  });

  it("supports $expand", async () => {
    const { data } = await GET`/admin/Authors ${{
      params: {
        $select: "name",
        $expand: `books($select=title)`,
      },
    }}`;
    expect(data.value).to.containSubset([
      { name: "Emily Brontë", books: [{ title: "Wuthering Heights" }] },
      { name: "Charlotte Brontë", books: [{ title: "Jane Eyre" }] },
      {
        name: "Edgar Allen Poe",
        books: [{ title: "The Raven" }, { title: "Eleonora" }],
      },
      { name: "Richard Carpenter", books: [{ title: "Catweazle" }] },
    ]);
  });

  it("supports $value requests", async () => {
    const { data } = await GET`/admin/Books/201/stock/$value`;
    expect(data).to.eql(12);
  });

  it("supports $top/$skip paging", async () => {
    const { data: p1 } = await GET`/browse/Books?$select=title&top=3`;
    expect(p1.value).to.containSubset([
      { ID: 201, title: "Wuthering Heights" },
      { ID: 207, title: "Jane Eyre" },
      { ID: 251, title: "The Raven" },
    ]);

    const { data: p2 } = await GET`/browse/Books?$select=title&skip=3`;
    expect(p2.value).to.containSubset([
      { ID: 252, title: "Eleonora" },
      { ID: 271, title: "Catweazle" },
    ]);
  });
});
