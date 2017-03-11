var mongoose = require("mongoose");
var _ = require("lodash");
var User = require('../../server/models/user');
var Estimate = require('../../server/models/estimate');
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
    //Create User Before Each Call
    url1 = '/api/user/signup';
    url2 = '/api/user/profile';
    url3 = '/api/user/signin';
    url4 = '/api/user/deleteAUser';
    correctUser = {
        email: "FakeUserToBeDeletedLater",
        password: "Password"
    }
    correctData = {
      estimate: {
        name: "String",
        date: "String",
        description: "String",
        job: "String",
        address: "String"
      }
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
    //Delete Each User After Call
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
      //Login and Set User
      chai.request(server)
          .post(url3)
          .send(correctUser)
          .end((err, res) => {
            //Login User
            correctUserToken = res.body.token;
            correctUserId = correctUser._id;
            chai.request(server)
                .get(url2)
                .set("authorization", correctUserToken)
                .end((err, res) => {
                  //Set User
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
                _.map(res.body.user.estimates, function(r){
                  let {estimateId} = res.body;
                  if (r._id===estimateId) {
                    expect(r._id).to.deep.equal(estimateId);
                    done();
                  }
                })
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


      describe('\t/PUT Estimates =>', () => {
        var url, urlb, incorrectData,editID, editedData;
        beforeEach((done)=>{
          url = "/api/user/profile/";
          chai.request(server)
              .get(url)
              .set("authorization", correctUserToken)
              .end((err, res) => {
                editID = res.body.user.estimates[0];
                urlb = `/api/user/${correctUserId}/estimate/${editID}/edit`;
                done();
            });
        })
        it('Success: PUT Estimates', function(done) {
          editedData = correctData;
          editedData.estimate.name = "ZZZ";
          var completedTask = 0;
          chai.request(server)
              .put(urlb)
              .set("authorization", correctUserToken)
              .send(editedData)
              .end((err, res) => {
                expect(res.body.user).to.exist;
                var x = 0;
                var checkLength = res.body.user.estimates.length -1;
                _.map(res.body.user.estimates, function(i) {
                  if(i.name==editedData.name) {
                    completedTask = 1;
                  }
                  x+=1
                  if (x == checkLength) {
                    expect(completedTask).to.equal(1);
                    done();
                  }
                })
              });
        });
        it('Error: PUT Estimates (No Token)', (done) => {
          chai.request(server)
              .put(urlb)
              .set("authorization", null)
              .send(correctData)
              .end((err, res) => {
                expect(err).to.exist;
                done();
              });
        });
      });

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
                  if (data.name == correctData.estimate.name && continueToGo == 1) {
                    continueToGo = 0;
                    deletedID = data._id;
                    deleteUrl = `/api/user/${correctUserId}/estimate/${deletedID}/delete`
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
