namespace sap.capire.reviews;

using {
    User,
    managed
} from '@sap/cds/common';

type ReviewedSubject : String(111);

type Rating          : Integer @assert.range enum {
    Best = 5;
    Good = 4;
    Avg = 3;
    Poor = 2;
    Worst = 1;
}

entity Reviews {
    key subject  : ReviewedSubject;
    key reviewer : User   @cds.on.insert: $user;
        rating   : Rating @mandatory;
        title    : String(111);
        text     : String(1111);
        date     : managed:createdAt;
        likes    : Composition of many Likes
                       on likes.reviews = $self;
        liked    : Integer default 0;
}

entity Likes {
    key reviews : Association to Reviews;
    key user    : User;
}
