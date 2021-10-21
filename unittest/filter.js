const filter = require("../controllers/filterController");


describe('Our application', function() {


  before(function(){
    /*
        Mock API using nock for the REST API
        Endpoint. Any calls to URL https://jsonplaceholder.typicode.com
        will be intercepted by the fake_api nock  
    */
    let fake_api = nock('localhost:5000')
        .get('/filter')
        .reply(200, {"name":"John"});
  })

  // This is the name of the test
  it('should understand basic mathematical principles', function(done) {


    assert(filter.findAll(), {{"name":"John"}})

  });

});