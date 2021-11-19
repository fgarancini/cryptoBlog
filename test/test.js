let chai = require("chai");
let chaiHttp = require("chai-http");
// const fs = require("fs");

const expect = require("chai").expect;


chai.use(chaiHttp);

const url = `http://localhost:9090/api/v1`;

describe("Get Token", () => {
  it("Should return a token", (done) => {
    const user = { username: "fgarancini", password: "ni3t5zch3" };
    chai
      .request(url)
      .post("/auth/login")
      .send({
        username: user.username,
        password: user.password,
      })
      .end((err, res) => {
        // console.log(res.body.token);
        expect(res).to.have.status(200);
        done();
      });
  });
});

// describe("Insert a post", () => {
//   it("should insert a post", (done) => {
//     console.log(fs.existsSync(`${__dirname}\\..\\constitution.jpg`));
//     chai
//       .request(url)
//       .post("/posts")
//       .set(
//         "authorization",
//         "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjM3Mjg0OTM1LCJleHAiOjE2MzczNzEzMzV9.5tmP1sCepMIVdD1Qq301qj8aNvRNfa_A8i-4917U1Co"
//       )
//       .set("Content-Type", "multipart/form-data")
//       .field("Titulo", "DAO loses the constitution")
//       .field(
//         "Contenido",
//         "Do you think that because it was public that there was $46 million raised that it sort of made this go wildly more than it should have come for?"
//       )
//       .field("categoryID", "1")
//       .attach("Imagen", fs.readFileSync(`${__dirname}\\..\\constitution.jpg`),"constitution.jpg")
//       .end((err, res) => {
//         console.log(res);
//         expect(res).to.have.status(200);
//         done();
//       });
//   });
// });

describe("Insert a category", () => {
  it("should fail at insert a category", (done) => {
    chai
      .request(url)
      .post("/category")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjM3Mjg0OTM1LCJleHAiOjE2MzczNzEzMzV9.5tmP1sCepMIVdD1Qq301qj8aNvRNfa_A8i-4917U1Co"
      )
      .send({})
      .end((err, res) => {
        // console.log(res.body);
        expect(res).to.have.status(404);
        done();
      });
  });
});

describe("Register user", () => {
  it("Should not register an user", (done) => {
    const user = {
      mail: "shibarandomuser@gmail.com",
      username: "shitman",
      password: "shib@tothemoonqweqweqwe123331",
      type: 1,
    };
    chai
      .request(url)
      .post("/auth/register")
      .send({
        mail: user.mail,
        username: user.username,
        password: user.password,
        type: user.type,
      })
      .end((err, res) => {
        expect(res).to.have.status(400);
        done();
      });
  });
});


describe("Delete a post", () => {
  it("Users can't delete posts", (done) => {
    const user = {
      username: "shitmanA",
      password: "shib@tothemoon",
    };
    chai
      .request(url)
      .delete("/posts/2")
      .set(
        "authorization",
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjaGVjayI6dHJ1ZSwiaWF0IjoxNjM3MzIyMTgzLCJleHAiOjE2Mzc0MDg1ODN9.trBx6QH7QbBuyxk34tMS8BaSxwaczj0LWWWzvtyyKVQ"
      )
      .send({
        username: user.username,
        password: user.password,
      })
      .end((err, res) => {
        expect(res).to.have.status(401);
        done();
      });
  });
});