/* checksum : ca9d5a1b4f6f2d2405516a9073edc505 */
@Capabilities.BatchSupported : false
@Capabilities.KeyAsSegmentSupported : true
@Core.Description : 'Use @title: ''...'' on your CDS service to provide a meaningful title.'
@Core.LongDescription : 'Use @Core.LongDescription: ''...'' on your CDS service to provide a meaningful description.'
service Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title.![] {};

@Common.Label : 'Batch Requests'
@Core.Description : 'Sends a group of requests'
@Core.LongDescription : `Group multiple requests into a single request payload, see [Batch Requests](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_BatchRequests).

*Please note that "Try it out" is not supported for this request.*`
@openapi.path : '/$batch'
action Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title.![]._batch_post(
  @openapi.contentType : 'multipart/mixed;boundary=request-separator'
  @openapi.in : 'body'
  body : String
) returns
  @openapi.contentType : 'multipart/mixed'
  String;

@Common.Label : 'AverageRatings'
@Core.Description : 'Retrieves a list of average ratings.'
@openapi.path : '/AverageRatings'
function Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title.![].AverageRatings(
  @description : 'Show only the first n items, see [Paging - Top](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptiontop)'
  @openapi.in : 'query'
  @openapi.name : '$top'
  _top : Integer,
  @description : 'Skip the first n items, see [Paging - Skip](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionskip)'
  @openapi.in : 'query'
  @openapi.name : '$skip'
  _skip : Integer,
  @description : 'Search items by search phrases, see [Searching](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionsearch)'
  @openapi.in : 'query'
  @openapi.name : '$search'
  _search : String,
  @description : 'Filter items by property values, see [Filtering](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionfilter)'
  @openapi.in : 'query'
  @openapi.name : '$filter'
  _filter : String,
  @description : 'Include count of items, see [Count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount)'
  @openapi.in : 'query'
  @openapi.name : '$count'
  _count : Boolean,
  @description : 'Order items by property values, see [Sorting](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionorderby)'
  @openapi.in : 'query'
  @openapi.name : '$orderby'
  _orderby : many Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title.![].anonymous.type0,
  @description : 'Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)'
  @openapi.in : 'query'
  @openapi.name : '$select'
  _select : many Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title.![].anonymous.type1
) returns
  @title : 'Collection of AverageRatings'
  {
    @openapi.name : '@count'
    _count : Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title._types.count;
    value : many Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title._types.sap_capire_reviews_api_ReviewService_AverageRatings;
  };

@Common.Label : 'AverageRatings'
@Core.Description : 'Retrieves a single average rating.'
@openapi.path : '/AverageRatings(''{subject}'')'
function Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title.![].AverageRatings_____(
  @description : 'key: subject'
  @openapi.in : 'path'
  subject : String(111),
  @description : 'Select properties to be returned, see [Select](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptionselect)'
  @openapi.in : 'query'
  @openapi.name : '$select'
  _select : many Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title.![].anonymous.type2
) returns Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title._types.sap_capire_reviews_api_ReviewService_AverageRatings;

@Common.Label : 'Service Operations'
@Core.Description : 'Invokes action rate'
@openapi.path : '/rate'
action Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title.![].rate_post(
  @openapi.in : 'body'
  body : {
    reviewer : String(255);
    subject : String(111);
    rating : Integer;
    title : String(111);
    text : String(1111);
  }
);

@title : 'AverageRatings'
type Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title._types.sap_capire_reviews_api_ReviewService_AverageRatings {
  subject : String(111);
  rating : Integer;
  reviews : Integer;
};

@description : 'The number of entities in the collection. Available when using the [$count](http://docs.oasis-open.org/odata/odata/v4.01/odata-v4.01-part1-protocol.html#sec_SystemQueryOptioncount) query option.'
type Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title._types.count : String;

type Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title._types.error {
  @mandatory : true
  error : {
    @mandatory : true
    code : String;
    @mandatory : true
    message : String;
    target : String;
    details : many {
      @mandatory : true
      code : String;
      @mandatory : true
      message : String;
      target : String;
    };
    @description : 'The structure of this object is service-specific'
    innererror : { };
  };
};

@assert.range : true
type Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title.![].anonymous.type0 : String enum {
  subject;
  subject_desc = 'subject desc';
  rating;
  rating_desc = 'rating desc';
  reviews;
  reviews_desc = 'reviews desc';
};

@assert.range : true
type Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title.![].anonymous.type1 : String enum {
  subject;
  rating;
  reviews;
};

@assert.range : true
type Use._title_._.![].![]._.on.your.CDS.service.to.provide.a.meaningful.title.![].anonymous.type2 : String enum {
  subject;
  rating;
  reviews;
};

