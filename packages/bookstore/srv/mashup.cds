using {sap.capire.bookshop} from 'bookshop';
using {sap.capire.reviews.api.ReviewService as reviews} from 'reviews';

extend bookshop.Books with {
    test_prop : Integer default 2;
    ratings   : type of reviews.AverageRatings : rating;
}

service BookstoreCatalogService @(path: '/bookstore/catalog') {
    entity bookstoreBooks as projection on bookshop.Books;
}
