const cds = require("@sap/cds");

module.exports = cds.on("served", async () => {
  await UPSERT.into("sap.common.Currencies")
    .columns(["code", "symbol", "name"])
    .rows(
      ["EUR", "€", "Euro"],
      ["USD", "$", "US Dollar"],
      ["GBP", "£", "British Pound"],
      ["ILS", "₪", "Shekel"],
      ["JPY", "¥", "Yen"]
    );
});
