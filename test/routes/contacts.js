const request = require("supertest");
const app = require("../../app");
var expect = require("chai").expect;

const contacts = require("../../data/contacts");

describe("Contacts", () => {
  it("should send back a JSON Array with all of the contacts", (done) => {
    request(app)
      .get("/contacts")
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        expect(res.body.length).to.equal(contacts.length);
        done();
      });
  });

  it("should send back a JSON Array with one of the contacts", (done) => {
    const { contact_id } = contacts[0];

    request(app)
      .get(`/contacts/${contact_id}`)
      .expect("Content-Type", /json/)
      .expect(200, (err, res) => {
        if (err) {
          return done(err);
        }
        const { contact_id: responseContactId } = res.body;
        expect(contact_id).to.equal(responseContactId);
        done();
      });
  });

  it("should return a 400 if the request is malformed", (done) => {
    request(app)
      .get("/contacts/NOT-A-UUID")
      .expect("Content-Type", /json/)
      .expect(400, (err, res) => {
        done();
      });
  });

  it("should return a 404 if the contact id is not found", (done) => {
    request(app)
      .get("/contacts/a01b1cee-b599-4394-84eb-ab5e5e7b923c")
      .expect("Content-Type", /json/)
      .expect(404, (err, res) => {
        done();
      });
  });
});
