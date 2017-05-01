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
  var urlLogin, urlSignin, urlGet, urlGets, urlNew, urlEdit, urlDelete, urlAddRemovePriceItem, correctUser, correctUserToken, correctUserId, correctData, correctVendorId;
  beforeEach((done)=>{
    //Create User Before Each Call
    urlSignin = '/api/user/signin';
    urlLogin = '/api/user/profile';
    urlGets = '/api/vendors';
    urlGet = '/api/vendor/:id';
    urlNew = '/api/vendor/new';
    urlEdit = '/api/vendor/:id/edit';
    urlDelete = '/api/vendor/:id/delete';
    // urlAddRemovePriceItem = '/api/vendor/:id/:priceListId/AddRemovePriceItem';
    correctUser = {
        email: "FakeUserToBeDeletedLater",
        password: "Password"
    }
    chai.request(server)
        .post(urlSignin)
        .send(correctUser)
        .end((err, res) => {
          correctUserToken = res.body.token;
          chai.request(server)
              .get(urlLogin)
              .set("authorization", correctUserToken)
              .send(correctUser)
              .end((err, res) => {
                //Set User
                correctUser = res.body.user;
                correctUserId = correctUser._id;
                correctData = {
                  vendor: {
                    admins: [correctUserId],
                    name: "String",
                    address: "String",
                    "range": "String",
                    region: "String",
                    priceList: [],
                    oldPriceLists: []
                  },
                  userId: correctUserId
                };
                done();
              });
        });
  })
  describe("\nVendors:", () => {
    // beforeEach((done)=>{
    //   //Login and Set User
    //   chai.request(server)
    //       .post(url3)
    //       .send(correctUser)
    //       .end((err, res) => {
    //         //Login User
    //         correctUserToken = res.body.token;
    //         correctUserId = correctUser._id;
    //         chai.request(server)
    //             .get(url2)
    //             .set("authorization", correctUserToken)
    //             .end((err, res) => {
    //               //Set User
    //               correctUser = res.body.user;
    //               correctUserId = correctUser._id;
    //               done();
    //             });
    //       });
    // })
      describe('\t/GETs Vendors', () => {
        it('Success: GETs Vendors', function(done) {
          chai.request(server)
              .get(urlGets)
              .end((err, res) => {
                expect(res.body.vendors).to.exist;
                expect(res.body.vendors).to.be.an('array');
                done();
              });
        });
      });
      describe('\t/POST Vendors', () => {
        it('Success: POST Vendors', function(done) {
          chai.request(server)
              .post(urlNew)
              .set("authorization", correctUserToken)
              .send(correctData)
              .end((err, res) => {
                correctVendorId = res.body.id;
                correctData = res.body.vendor;
                expect(res.body.vendor).to.exist;
                expect(res.body.id).to.exist;
                done();
              });
        });
      });
      describe('\t/GET Vendor', () => {
        it("Success: GET Vendor", function(done) {
          var newUrlGet = urlGet.replace(":id", correctVendorId);
          chai.request(server)
              .get(newUrlGet)
              .end((err, res) => {
                expect(res.body.vendor).to.exist;
                done();
              });
        })
      })
      describe('\t/PUT Vendors', () => {
        var newCorrectData, urlEditWIdNew;
        beforeEach(function(done) {
          newCorrectData = correctData;
          newCorrectData.vendor.name = "New Name";
          newCorrectData.vendor._id = correctVendorId;
          urlEditWIdNew = urlEdit.replace(":id", correctVendorId)
          done();
        })
        it('Success: PUT Vendors', function(done) {
          chai.request(server)
              .put(urlEditWIdNew)
              .set("authorization", correctUserToken)
              .send(newCorrectData)
              .end((err, res) => {
                expect(res.body.vendor).to.exist;
                expect(res.body.vendor.name).to.equal(newCorrectData.vendor.name);
                done();
              });
        });
        it('Failed: PUT Vendors (Wrong Token)', function(done) {
          chai.request(server)
              .put(urlEditWIdNew)
              .set("authorization", null)
              .send(newCorrectData)
              .end((err, res) => {
                expect(err).to.exist;
                done();
              });
        });
      });
      describe('\t/DELETE Vendor', () => {
        it('Success: DELETE Vendor', function(done) {
          var newUrlDelte = urlDelete.replace(":id", correctVendorId)
          chai.request(server)
              .delete(newUrlDelte)
              .set("authorization", correctUserToken)
              .send({vendor: correctVendorId, userId: correctData.userId})
              .end((err, res) => {
                expect(res.body.statusMessage).to.equal("Deleted Vendor");
                done();
              });
        });
      });
  })
})
