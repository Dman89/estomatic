var chai = require('chai');
var sinon = require('sinon');
var expect = chai.expect;
var PORT = process.env.PORT || 3000;
var ROOT_URL = process.env.ROOT_URL || "http://localhost:"+PORT;
var mongoose = require('mongoose');
require('sinon-mongoose');
var User = require('../../server/models/user.js');

describe("Database Models:", ()=>{
  var data, data2, user, pw, pw2;
  beforeEach(()=>{
    user = "U2s2e2r", pw = "Pa2ssword", pw2 = pw;
    data2 = { email: "Dan", password: "Dan"}
    data = { email: user, password: pw}
  })
  afterEach(()=>{

  })
  describe("\tGet All Users:", ()=>{
    var UserMock;
    beforeEach(()=>{
      UserMock = sinon.mock(User);
    })
    it("Success:  Get Users:", function(done) {
      var expectedResult = {statusMessage: "User List", users: []};
      UserMock.expects("find").yields(null, expectedResult)
      User.find(function (err, result) {
                  UserMock.verify();
                  UserMock.restore();
                  expect(result.users).to.eql([]);
                  done();
              });
    })
    it("Error: Get Users", function(done) {
      var expectedResult = {status: 500, statusMessage: "Error", users: []};
      UserMock.expects("find").yields(expectedResult, null)
      User.find(function (err, result) {
          UserMock.verify();
          UserMock.restore();
          expect(err.users).to.eql([]);
          expect(err.status).to.eql(500);
          expect(err.statusMessage).to.eql("Error");
          done();
      });
    })
  })
  describe("\tPost User:", ()=>{
    var UserMock, user;
    beforeEach(()=>{
      UserMock = sinon.mock(new User(data));
      user = UserMock.object;
    })
    it("Success: Post User", function(done){
      var expectedResult = { status: true };
      UserMock.expects('save').yields(null, expectedResult);
      user.save(function (err, result) {
        UserMock.verify();
        UserMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });
    it("Error: Post User", function(done){
      var expectedResult = { status: false };
      UserMock.expects('save').yields(expectedResult, null);
      user.save(function (err, result) {
        UserMock.verify();
        UserMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });
  describe("\tUpdate User:", function(){
    var UserMock, user;
    beforeEach(()=>{
      UserMock = sinon.mock(new User(data));
      user = UserMock.object;
    })
    it("Success: Update User", function(done){
      var expectedResult = { status: true };
      UserMock.expects('save').withArgs({_id: 12345}).yields(null, expectedResult);
      user.save({_id: 12345}, function (err, result) {
        UserMock.verify();
        UserMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });

    it("Error: Update User", function(done){
      var expectedResult = { status: false };
      UserMock.expects('save').withArgs({_id: 12345}).yields(expectedResult, null);
      user.save({_id: 12345}, function (err, result) {
        UserMock.verify();
        UserMock.restore();
        expect(err.status).to.not.be.true;
        done();
      });
    });
  });
  describe("\tDelete User:", function(){
    var UserMock, user;
    beforeEach(()=>{
      UserMock = sinon.mock(new User(data));
      user = UserMock.object;
    })
    it("Success: Delete User", function(done){
      var expectedResult = { status: true };
      UserMock.expects('remove').withArgs({_id: 12345}).yields(null, expectedResult);
      user.remove({_id: 12345}, function (err, result) {
        UserMock.verify();
        UserMock.restore();
        expect(result.status).to.be.true;
        done();
      });
    });
    it("Error: Delete User", function(done){
      var expectedResult = { status: false };
      UserMock.expects('remove').withArgs({_id: 12345}).yields(expectedResult, null);
      user.remove({_id: 12345}, function (err, result) {
          UserMock.verify();
          UserMock.restore();
          expect(err.status).to.not.be.true;
          done();
      });
    });
  });
});
