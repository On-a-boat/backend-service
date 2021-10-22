const request = require("supertest");

const app = require('../server');

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