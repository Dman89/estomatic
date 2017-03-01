var mongoose = require("mongoose");
var _ = require("lodash");
var User = require('../../server/models/user');
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../../server/index.js');
var should = chai.should();
var PORT = process.env.PORT || 3000;
var ROOT_URL = process.env.ROOT_URL || "http://localhost:"+PORT;
var expect = chai.expect;
chai.use(chaiHttp);

describe("API Calls:", function() {
  var url1, url2, url3, correctUser, correctUserToken, correctUserId, correctData;
  beforeEach((done)=>{
    url1 = '/api/user/signup';
    url2 = '/api/user/profile';
    url3 = '/api/user/signin';
    url4 = url = '/api/user/deleteAUser';
    correctUser = {
        email: "FakeUserToBeDeletedLater",
        password: "Password"
    }
    correctData = {
      Name: "New Post",
      "Date": new Date(),
      Description: "A Short Description",
      Job: "A Small Job In The South",
      Address: "123 On The Boarder Mexican Food, El Cajon, 92054",
      Vendor: {
        ID: "Johns_Contracting",
        Name: "Johns Contracting",
        Address: "SouthSide Smiths",
        "Range": "2000 Miles",
        Region: "West_Coast",
        PriceListId: "FakeID"
      },
      ItemList: [
        {
          Item: "Short Item",
          Description: "Short Item",
          UnitType: "Short Item",
          Quantity: "5",
          UPN: "Short Item",
          UnitPriceCurrency: "Short Item",
          UnitPrice: "Short Item",
          UnitId: "Short Item",
          Stock: "n/a",
          Backorder: false,
          Region: "Short Item",
          Address: "Short Item",
          "Range": "Short Item"
        }
      ]
    };
    chai.request(server)
        .post(url1)
        .send(correctUser)
        .end((err, res) => {
          console.log(!err ? "Successfully Deleted" : "Failed to Delete");
          done();
        });
  })
  afterEach((done)=> {
    chai.request(server)
        .delete(url4)
        .send(correctUser)
        .end((err, res) => {
          console.log(!err ? "Successfully Deleted" : "Failed to Delete");
          done();
        });
  })
  describe("\tEstimates:", () => {
    beforeEach((done)=>{
      chai.request(server)
          .post(url3)
          .send(correctUser)
          .end((err, res) => {
            correctUserToken = res.body.token;
            correctUserId = correctUser._id;
            chai.request(server)
                .get(url2)
                .set("authorization", correctUserToken)
                .end((err, res) => {
                  correctUser = res.body.user;
                  correctUserId = correctUser._id;
                  done();
                });
          });
    })
      describe('\t/POST Estimates', () => {
        var url, incorrectData;
        beforeEach(()=>{
          url = `/api/user/${correctUserId}/estimate/new`;
        })
        it('Success: Post Estimates', function(done) {
          chai.request(server)
              .post(url)
              .set("authorization", correctUserToken)
              .send(correctData)
              .end((err, res) => {
                expect(res.body.user.estimates[(res.body.user.estimates.length - 1)].name).to.deep.equal(correctData.name);
                done();
              });
        });
        it('Error: Post Estimates (No Token)', (done) => {
          chai.request(server)
              .post(url)
              .set("authorization", null)
              .send(correctData)
              .end((err, res) => {
                expect(err).to.exist;
                done();
              });
        });
      });
      // describe('\t/LOGIN Estimates', () => {
      //   var url;
      //   beforeEach(()=>{
      //     url = '/api/user/signin'
      //   })
      //   it('Success: Estimates LOGGED In', (done) => {
      //     var user = {
      //     	"email": "Usseer",
      //     	"password": "Paasssswwoorrd"
      //     }
      //     chai.request(server)
      //         .post(url)
      //         .send(user)
      //         .end((err, res) => {
      //             res.should.have.status(200);
      //             res.body.should.be.a('object');
      //           done();
      //         });
      //   });
      //   it('Error: Estimates LOGGED In (Wrong Password)', (done) => {
      //     var user = {
      //     	"email": "Usseer",
      //     	"password": "Paasssswwoorr"
      //     }
      //     chai.request(server)
      //       .post(url)
      //       .send(user)
      //       .end((err, res) => {
      //           res.should.have.status(401);
      //           res.body.should.be.a('object');
      //         done();
      //       });
      //   });
      //   it('Error: Estimates LOGGED In (Wrong Estimates)', (done) => {
      //     var user = {
      //     	"email": "Ussee",
      //     	"password": "Paasssswwoorrd"
      //     }
      //     chai.request(server)
      //       .post(url)
      //       .send(user)
      //       .end((err, res) => {
      //           res.should.have.status(401);
      //           res.body.should.be.a('object');
      //         done();
      //       });
      //   });
      // });
      // describe('\t/Profile Estimates (Restricted)', () => {
      //   var url, user_token;
      //
      //   beforeEach((done)=>{
      //     url = '/api/user/profile'
      //     var usera = {
      //       "email": "Usseer",
      //       "password": "Paasssswwoorrd"
      //     }
      //     chai.request(server)
      //       .post('/api/user/signin')
      //       .send(usera)
      //       .end((err, res) => {
      //         user_token = res.body.token;
      //         done();
      //       });
      //   })
      //   it('Success: Estimates LOGGED In', (done) => {
      //     var user = {
      //     	"email": "Usseer",
      //     	"password": "Paasssswwoorrd"
      //     }
      //     chai.request(server)
      //         .get(url)
      //         .set("authorization", user_token)
      //         .end((err, res) => {
      //           res.should.have.status(200);
      //           res.body.should.be.a('object');
      //           done();
      //         });
      //   });
      //   it('Error: Estimates LOGGED In (Wrong TOKEN)', (done) => {
      //     chai.request(server)
      //       .get(url)
      //       .set("authorization", "user_token")
      //       .end((err, res) => {
      //         res.should.have.status(401);
      //         res.body.should.be.a('object');
      //         done();
      //       });
      //   });
      // });
      // describe('\t/Edit Estimates (Restricted)', () => {
      //   var url, user_token,  userToEdit,newId;
      //
      //   beforeEach((done)=>{
      //     url = '/api/user/profile';
      //     var usera = {
      //       "email": "Usseer",
      //       "password": "Paasssswwoorrd"
      //     }
      //     chai.request(server)
      //       .post('/api/user/signin')
      //       .send(usera)
      //       .end((err, res) => {
      //         user_token = res.body.token;
      //         chai.request(server)
      //             .get(url)
      //             .set("authorization", user_token)
      //             .end((err, res) => {
      //               userToEdit = res.body.user;
      //               newId = userToEdit._id;
      //               done();
      //             });
      //       });
      //   })
      //   it('Success: Estimates SAVED', (done) => {
      //     var ApiUrlToEdit = '/api/user/'+newId+"/edit";
      //     chai.request(server)
      //         .put(ApiUrlToEdit)
      //         .set("authorization", user_token)
      //         .send(userToEdit)
      //         .end((err, res) => {
      //           expect(res.body.user).to.deep.equal(userToEdit)
      //           res.should.have.status(200);
      //           res.body.should.be.a('object');
      //           done();
      //         });
      //   });
      //   it('Success: Estimates EDITED', (done) => {
      //     var ApiUrlToEdit = '/api/user/'+newId+"/edit";
      //     userToEdit.vendors = [{"name":"one"}]
      //     userToEdit.estimates = [{"name":"one"}]
      //     chai.request(server)
      //         .put(ApiUrlToEdit)
      //         .set("authorization", user_token)
      //         .send(userToEdit)
      //         .end((err, res) => {
      //           expect(res.body.user.vendors[0].name).to.deep.equal(userToEdit.vendors[0].name)
      //           expect(res.body.user.estimates[0].name).to.deep.equal(userToEdit.estimates[0].name)
      //           res.should.have.status(200);
      //           res.body.should.be.a('object');
      //           done();
      //         });
      //   });
      //   it('Error: Estimates EDITED Failed (Wrong TOKEN)', (done) => {
      //     var ApiUrlToEdit = '/api/user/'+userToEdit._id+"/edit";
      //     chai.request(server)
      //       .put(ApiUrlToEdit)
      //       .set("authorization", "user_token")
      //       .send(userToEdit)
      //       .end((err, res) => {
      //         res.should.have.status(401);
      //         res.body.should.be.a('object');
      //         done();
      //       });
      //   });
      // });
      describe('\t/Delete Estimates', () => {
        var url, incorrectData, deleteUrl, deletedID;
        beforeEach((done)=>{
          url = `/api/user/${correctUserId}/estimate/new`;
          chai.request(server)
              .post(url)
              .set("authorization", correctUserToken)
              .send(correctData)
              .end((err, res) => {
                var continueToGo = 1;
                _.map(res.body.user.estimates, function(data) {
                  if (data.Name == correctData.Name && continueToGo == 1) {
                    continueToGo = 0;
                    deletedID = data._id;
                    deleteUrl = `/api/user/${correctUserId}/estimate/${data._id}/delete`
                    done();
                  }
                })
              });
        })
        it('Success: Delete Estimate', function(done) {
          var results = 0;
          chai.request(server)
              .delete(deleteUrl)
              .set("authorization", correctUserToken)
              .end((err, res) => {
                var x = 0;
                var checkLength = res.body.user.estimates.length - 1;
                if(err){
                  expect(err.message).to.exist;
                  done();
                }
                else {
                  expect(res.status).to.equal(200);
                  _.map(res.body.user.estimates, function(data) {
                    console.log("\n\n\n\nWorks");
                    console.log(x == checkLength);
                    if (data._id == deletedID) {
                      results += 1;
                    }
                    if (x == checkLength) {
                      expect(results).to.equal(0)
                      done();
                    }
                    x += 1;
                  })
                }
              });
        });
        it('Error: Delete Estimate (No Token)', function(done) {
          var results = 0;
          chai.request(server)
              .delete(deleteUrl)
              .set("authorization", null)
              .end((err, res) => {
                expect(err.message).to.equal("Unauthorized");
                done();
              });
        });

      });

  })
})
