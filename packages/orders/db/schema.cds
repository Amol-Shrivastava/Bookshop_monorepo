namespace sap.capire.orders;

using {
    cuid,
    managed,
    User,
    Currency
} from '@sap/cds/common';


entity Orders : cuid, managed {
    OrderNo  : String(44) @title: 'Order Number';
    Items    : Composition of many {
                   key ID       : UUID;
                       product  : Association to Products;
                       quantity : Integer;
                       title    : String;
                       price    : Double;
               }
    buyer    : User;
    currency : Currency;
}

entity Products @(cds.persistence.skip: always) {
    key ID : String;
}
