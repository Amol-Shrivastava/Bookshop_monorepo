using {sap.capire.bookshop as bookshop} from 'bookshop';

extend bookshop.Books with {
    test_prop : Integer default 2;
}

service BookstoreCatalogService @(path: '/bookstore/catalog') {
    entity bookstoreBooks as projection on bookshop.Books;
}
