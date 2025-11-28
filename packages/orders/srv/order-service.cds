using {sap.capire.orders as my} from '../db/schema';

namespace sap.capire.orders.api;

service OrderService @(path: '/order-service') {
    entity Orders     as projection on my.Orders;

    @odata.draft.bypass
    entity OrderDraft as projection on my.Orders;

    event OrderChanged {
        product  : String;
        deltaQty : String;
    }
}
