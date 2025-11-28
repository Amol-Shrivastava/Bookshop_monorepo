const cds = require("@sap/cds");

class OrderService extends cds.ApplicationService {
  init() {
    const { "Order.Items": OrderItems } = this.entities;

    this.before("UPDATE", "Orders", async (req) => {
      const { ID, Items } = req.data;
      if (!Items || !Items.length)
        return req.error(404, "No items found for this order structure.");
      else
        for (let { product_ID, quantity } of Items) {
          let row = await SELECT.one.from("Orders.Items").where({
            up__ID: ID,
            product_ID,
          });
          if (!row)
            return req.error(404, `No reserved qty found for this order item.`);
          else {
            let beforeQty = row.quantity;
            if (beforeQty && beforeQty !== quantity)
              return this.orderChanged(product_ID, beforeQty - quantity);
          }
        }
    });

    this.before("DELETE", "Orders", async (req) => {
      const { ID } = req.data;
      const items = await SELECT.from("Orders.Items")
        .columns("product_ID", "quantity")
        .where({ up__ID: ID });
      if (items && items.length) {
        return Promise.all(
          items.map(({ product_ID, quantity }) =>
            this.orderChanged(product_ID, -quantity)
          )
        );
      }
      return req.error(404, "No Items found for the given order");
    });

    return super.init();
  }

  orderChanged = (product, deltaQty) => {
    console.log(" >>  emitting:", " OrderChanged", { product, deltaQty });
    return this.emit("OrderChanged", { product, deltaQty });
  };
}

module.exports = OrderService;
