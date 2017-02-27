var mongoose = require("mongoose");
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
  describe("\tUser:", () => {
      describe('\t/POST User', () => {
        var url;
        beforeEach(()=>{
          url = '/api/user/signup'
        })
        it('Success: Post User', function(done) {
          this.timeout(5000)
          var user = {
              email: "Usseer",
              password: "Paasssswwoorrd",
          }
          chai.request(server)
              .post(url)
              .send(user)
              .end((err, res) => {
                  res.should.have.status(201);
                  res.body.should.be.a('object');
                done();
              });
        });
        it('Error: Post User (Duplicate)', (done) => {
          var user = {
              email: "Usseer",
              password: "Paasssswwoorrd"
          }
          chai.request(server)
            .post(url)
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
              done();
            });
        });
      });
      describe('\t/LOGIN User', () => {
        var url;
        beforeEach(()=>{
          url = '/api/user/signin'
        })
        it('Success: User LOGGED In', (done) => {
          var user = {
          	"email": "Usseer",
          	"password": "Paasssswwoorrd"
          }
          chai.request(server)
              .post(url)
              .send(user)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                done();
              });
        });
        it('Error: User LOGGED In (Wrong Password)', (done) => {
          var user = {
          	"email": "Usseer",
          	"password": "Paasssswwoorr"
          }
          chai.request(server)
            .post(url)
            .send(user)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
              done();
            });
        });
        it('Error: User LOGGED In (Wrong User)', (done) => {
          var user = {
          	"email": "Ussee",
          	"password": "Paasssswwoorrd"
          }
          chai.request(server)
            .post(url)
            .send(user)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
              done();
            });
        });
      });
      describe('\t/Profile User (Restricted)', () => {
        var url, user_token;

        beforeEach((done)=>{
          url = '/api/user/profile'
          var usera = {
            "email": "Usseer",
            "password": "Paasssswwoorrd"
          }
          chai.request(server)
            .post('/api/user/signin')
            .send(usera)
            .end((err, res) => {
              user_token = res.body.token;
              done();
            });
        })
        it('Success: User LOGGED In', (done) => {
          var user = {
          	"email": "Usseer",
          	"password": "Paasssswwoorrd"
          }
          chai.request(server)
              .get(url)
              .set("authorization", user_token)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
              });
        });
        it('Error: User LOGGED In (Wrong TOKEN)', (done) => {
          chai.request(server)
            .get(url)
            .set("authorization", "user_token")
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.a('object');
              done();
            });
        });
      });
      describe('\t/Edit User (Restricted)', () => {
        var url, user_token,  userToEdit,newId;

        beforeEach((done)=>{
          url = '/api/user/profile';
          var usera = {
            "email": "Usseer",
            "password": "Paasssswwoorrd"
          }
          chai.request(server)
            .post('/api/user/signin')
            .send(usera)
            .end((err, res) => {
              user_token = res.body.token;
              chai.request(server)
                  .get(url)
                  .set("authorization", user_token)
                  .end((err, res) => {
                    userToEdit = res.body.user;
                    newId = userToEdit._id;
                    done();
                  });
            });
        })
        it('Success: User EDITED In', (done) => {
          var ApiUrlToEdit = '/api/user/'+newId+"/edit";
          chai.request(server)
              .put(ApiUrlToEdit)
              .set("authorization", user_token)
              .send(userToEdit)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
              });
        });
        it('Error: User EDITED Failed (Wrong TOKEN)', (done) => {
          var ApiUrlToEdit = '/api/user/'+userToEdit._id+"/edit";
          chai.request(server)
            .put(ApiUrlToEdit)
            .set("authorization", "user_token")
            .send(userToEdit)
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.a('object');
              done();
            });
        });
      });
      describe('\t/Delete User', () => {
        var url;
        beforeEach(()=>{
          url = '/api/user/deleteAUser'
        })
        it('Success: Delete User', (done) => {
          var user = {
          	"email": "Usseer",
          	"password": "Paasssswwoorrd",
          	"allow": "true"
          }
          chai.request(server)
              .delete(url)
              .send(user)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  // res.body.should.have.property('errors');
                  // res.body.errors.should.have.property('pages');
                  // res.body.errors.pages.should.have.property('kind').eql('required');
                done();
              });
        });
        it('Error: delete User (Wrong Password)', (done) => {
          var user = {
          	"email": "Usseer",
          	"password": "Paasssswwoorr",
          	"allow": "true"
          }
          chai.request(server)
            .delete(url)
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                // res.body.should.be.a('object');
                // res.body.should.have.property('errors');
                // res.body.errors.should.have.property('pages');
                // res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
        });
        it('Error: delete User (Wrong User)', (done) => {
          var user = {
          	"email": "Ussee",
          	"password": "Paasssswwoorrd",
          	"allow": "true"
          }
          chai.request(server)
            .delete(url)
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                // res.body.should.have.property('errors');
                // res.body.errors.should.have.property('pages');
                // res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
        });
        it('Error: delete User (Not Allowed)', (done) => {
          var user = {
          	"email": "Usseer",
          	"password": "Paasssswwoorrd",
          	"allow": "false"
          }
          chai.request(server)
            .delete(url)
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                // res.body.should.have.property('errors');
                // res.body.errors.should.have.property('pages');
                // res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
        });
      });
  })
})
