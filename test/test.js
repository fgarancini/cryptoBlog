let chai = require("chai");
let chaiHttp = require("chai-http");
const expect = require("chai").expect;

chai.use(chaiHttp);

const url = `http://localhost:9090/api/v1`;

describe("Insert a category", () => {
  it("should insert a category", (done) => {
    chai
      .request(url)
      .post("/category")
      .send({ Titulo: "NFT's games" })
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(200);
        done();
      });
  });
});

describe("Insert a category", () => {
  it("should fail at insert a category", (done) => {
    chai
      .request(url)
      .post("/category")
      .send({})
      .end((err, res) => {
        console.log(res.body);
        expect(res).to.have.status(404);
        done();
      });
  });
});
