using {sap.capire.reviews as my} from '../db/schema';

namespace sap.capire.reviews.app;

type Review {
    subject  : my.Reviews:subject;
    reviewer : my.Reviews:reviewer;
}

@oData  @rest
service ReviewService @(path: '/reviews') {
    entity listofReviews                   as
        projection on my.Reviews
        excluding {
            text,
            likes
        };

    entity Reviews @cds.redirection.target as projection on my.Reviews;

    entity Likes                           as projection on my.Likes;
    action like(targetReview: Review);
    action unlike(targetReview: Review);
}
