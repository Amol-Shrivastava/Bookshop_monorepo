using {sap.capire.bookshop as my} from '../db/schema';


@oData: '/browse'
service CatalogService {
    @readonly
    entity ListofBooks as
        projection on my.Books
        excluding {
            descr
        };

    @readonly
    entity Books       as
        projection on my.Books {
            *,
            author.name as author
        }
        excluding {
            createdBy,
            modifiedBy
        }

    // @requires: 'authenticated-user'
    action submitOrder(book_ID: Books:ID, quantity: Integer) returns {
        stock : Integer
    };
}
