namespace sap.capire.bookshop;

using {
    managed,
    cuid,
    Currency,
    sap
} from '@sap/cds/common';

entity Books : managed {
    key ID       : Integer;
        author   : Association to Authors @mandatory;
        title    : localized String       @mandatory;
        descr    : localized String(2000);
        genre    : Association to Genres;
        stock    : Integer;
        price    : Price;
        currency : Currency;
}

entity Authors : managed {
    key ID           : Integer;
        name         : String @mandatory;
        dob          : Date;
        dod          : Date;
        placeOfBirth : String;
        placeOfDeath : String;
        books        : Association to many Books
                           on books.author = $self;
}

entity Genres : cuid, sap.common.CodeList {
    parent   : Association to Genres;
    children : Composition of many Genres
                   on children.parent = $self;
}


type Price : Decimal(9, 2);
