const request = require("supertest");

const app = require('../server');

describe("Filtering users Integration", function() {

  describe("get all users", function() {
    test('check status send', async function() {
      await request(app).get("/filter/show").send().expect(200);
    });
  });

  describe("get all users' information", function() {
    test('check status send', async function() {
      await request(app).get("/filter/showall").send().expect(200);
    });

    test('check information', async function() {
      const res = await request(app).get("/filter/showall").send();
      // Check the information is contain in the res body
      expect(res.text).toContain('address');
      expect(res.text).toContain('signDate');
      expect(res.text).toContain('amountSpent');
    });
  });


  describe("find a single user with id 1", function() {
    test('check the correct result', async function() {
      const res = await request(app).get("/filter/user?userId=1").send();
      // First name 
      expect(res.text).toContain('Carter');
      // Email
      expect(res.text).toContain('Carter_Owen7508@deavo.com');
    });

    test('check a invalid user', async function() {
      const res = await request(app).get("/filter/user?userId=1024").send();
      // First name 
      expect(res.text).toContain('[]');
    });
  });

  describe("get users information by keyword", function() {
    test('check status send', async function() {
      await request(app).get("/filter/search?keywords=keyword1").send().expect(200);
    });

    test('check the right answer', async function() {
      const res = await request(app).get("/filter/search?keywords=keyword1").send();
      // User 48
      expect(res.text).toContain('Rihanna');
    });

    test('wrong keyword', async function() {
      const res = await request(app).get("/filter/search?keywords=NotKeyword").send();
      // User 48
      expect(res.text).toContain('[]');
    });
  });
});

// Grouping test 
describe("Grouping users Integration", function() {

  describe("get all groups", function() {
    test('check status send', async function() {
       await request(app).get("/group").send().expect(200);
    });
  
    test('check all information', async function() {
       const res = await request(app).get("/find").send();
       // Group 16
       expect(res.text).toContain('{\"msg\":\"This is CORS-enabled for a Single Route\"}');
     });
  });

  describe("get single group by Id", function() {
     test('check route for group id = 13', async function() {
      const res = await request(app).get("/group/find?groupId=1").send();
      // Name for group 13
      expect(res.text).toContain('[{"UserId":"1","FirstName":"John","LastName":"Kim","Age":21,"Gender":"M","Keywords":"[keyword1, keyword2]","Link":"1"}]');
    });
  
    test('Invalid group id', async function() {
      const res = await request(app).get("/find?groupId=77").send();
      expect(res.text).toContain('{\"msg\":\"This is CORS-enabled for a Single Route\"}');
    });
  });
  
  describe("Create new groups", function() {
    test('create a new group to database', async function() {
      const date = new Date();
      const res = await request(app).put("/group")
                  .send({groupName:'UnitTesting', users:'1,2,3,4,5,6', userCount: '6', dateCreated: date});
       expect(res.text).toContain('sucess');
    });
  });    
})

describe("Statistics", function() {
  describe("Count All Opened Emails", function() {
    
    test('check send', async function() {
      await request(app).get("/statistics/allOpen").send().expect(200);
    });

    test('check information', async function() {
      const res = await request(app).get("/statistics/allOpen").send();
      // Check the information is contain in the res body
      expect(res.text).toContain('[{"SUM(NumberOpened)":191}]');
    });
  });

  describe("Count All users", function() {
    test('check send', async function() {
      await request(app).get("/statistics/allUser").send().expect(200);
    });

    test('check information', async function() {
      const res = await request(app).get("/statistics/allUser").send();
      // Check the information is contain in the res body
      expect(res.text).toContain('[{"count(userId)":100}]');
    });
  });

  describe("Count All Gender", function() {
    test('check send', async function() {
      await request(app).get("/statistics/allGender").send().expect(200);
    });

    test('check information', async function() {
      const res = await request(app).get("/statistics/allGender").send();
      // Check the information is contain in the res body
      expect(res.text).toContain('[{"male_count":50,"female_count":50}]');
    });
  });

  describe("Count All Age groups", function() {
    test('check send', async function() {
      await request(app).get("/statistics/allAge").send().expect(200);
    });

    test('check information', async function() {
      const res = await request(app).get("/statistics/allAge").send();
      // Check the information is contain in the res body
      expect(res.text).toContain('[{"Under 20":11,"20 - 29":18,"30 - 39":19,"40 - 49":15,"50 - 60":24}]');
    });
  });

  describe("Count opened email for one email", function() {
    test('check send', async function() {
      await request(app).get("/statistics/email").send().expect(200);
    });

    test('right case', async function() {
      const res = await request(app).get("/statistics/email?emailId=1").send();
      // Check the information is contain in the res body
      expect(res.text).toContain('[{"numberOpened":10}]');
    });

    test('wrong case', async function() {
      const res = await request(app).get("/statistics/email?emailId=100").send();
      // Check the information is contain in the res body
      expect(res.text).toContain('[]');
    });
  });

  describe("get content for one email", function() {
    test('check send', async function() {
      await request(app).get("/statistics/content").send().expect(200);
    });

    test('right case', async function() {
      const res = await request(app).get("/statistics/content?emailId=1").send();
      // Check the information is contain in the res body
      expect(res.text).toContain('[{"contents":"Have a good weekend!"}]');
    });

    test('wrong case', async function() {
      const res = await request(app).get("/statistics/content?emailId=100").send();
      // Check the information is contain in the res body
      expect(res.text).toContain('[]');
    });
  });

  describe("get email sent for one email", function() {
    test('check send', async function() {
      await request(app).get("/statistics/sent").send().expect(200);
    });

    test('right case', async function() {
      const res = await request(app).get("/statistics/sent?emailId=1").send();
      // Check the information is contain in the res body
      expect(res.text).toContain('[{"numberSent":50}]');
    });

    test('wrong case', async function() {
      const res = await request(app).get("/statistics/sent?emailId=100").send();
      // Check the information is contain in the res body
      expect(res.text).toContain('[]');
    });
  });

  describe("get gender stats for one email", function() {
    test('check send', async function() {
      await request(app).get("/statistics/emailGender").send().expect(200);
    });

    test('right case', async function() {
      const res = await request(app).get("/statistics/emailGender?emailId=1").send();
      // Check the information is contain in the res body
      expect(res.text).toContain('[{"male_count":1,"female_count":1}]');
    });

    test('wrong case', async function() {
      const res = await request(app).get("/statistics/emailGender?emailId=100").send();
      // Check the information is contain in the res body
      expect(res.text).toContain('[{"male_count":null,"female_count":null}]');
    });
  });

  describe("get age stats for one email", function() {
    test('check send', async function() {
      await request(app).get("/statistics/emailAge").send().expect(200);
    });

    test('right case', async function() {
      const res = await request(app).get("/statistics/emailAge?emailId=1").send();
      // Check the information is contain in the res body
      expect(res.text).toContain('[{"Under 20":0,"20 - 29":0,"30 - 39":0,"40 - 49":2,"50 - 60":0}]');
    });

    test('wrong case', async function() {
      const res = await request(app).get("/statistics/emailAge?emailId=100").send();
      // Check the information is contain in the res body
      expect(res.text).toContain('[{"Under 20":null,"20 - 29":null,"30 - 39":null,"40 - 49":null,"50 - 60":null}]');
    });
  });
});