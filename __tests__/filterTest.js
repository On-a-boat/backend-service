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
       expect(res.text).toContain('100% fixed Bug');
     });
  });

  describe("get single group by Id", function() {
     test('check route for group id = 13', async function() {
      const res = await request(app).get("/find?groupId=14").send();
      // Name for group 13
      expect(res.text).toContain('Fixed the bug');
    });
  
    test('Invalid group id', async function() {
      const res = await request(app).get("/find?groupId=77").send();
      expect(res.text).toContain('[]');
    });
  });
  
  describe("Create new groups", function() {
    test('create a new group to database', async function() {
      const res = await request(app).get("/find?groupId=14").send();
       // Name for group 13
       expect(res.text).toContain('Fixed the bug');
    });
  
    test('Invalid group id', async function() {
       const res = await request(app).get("/find?groupId=77").send();
      expect(res.text).toContain('[]');
    });
  });
})