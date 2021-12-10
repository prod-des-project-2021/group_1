const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));
const server = require('./server');
const apiAddress = 'http://localhost:4000';

describe('Test routes', function() {
    // Start the server
    before(function() {
        server.start();
    });

    // Close the server
    after(function() { 
        server.close();
    })
    
    //Test stores
    describe('Testing route /items', function() {
        it('Should return status 200 with all store', async function() {
            // Send the request to our server
            await chai.request(apiAddress)
            .get('/items')
            .then(response => {
                // Check response
                expect(response).to.have.status(200);
                expect(response.status).to.equal(200)
            })
            .catch(error => {
                throw error;
            })
        }).timeout(10000)

        it('Should return status 200 with single store', async function() {
            await chai.request(apiAddress)
            .get('/items/61a3e5e0874540ff229fdf7a')
            .then(response => {
                expect(response.status).to.equal(200);
            })
            .catch(error => {
                throw error;
            })
        })

        it('Post a store without login', async function () {
            await chai.request(apiAddress)
            .post('/items')
            .then(response =>{
                expect(response.status).to.equal(403);
            })
            .catch(error => {
                throw error;
            })
        })
    })

    describe('Post a store when logged in', function() {
        beforeEach(function() {
            chai.request(apiAddress)
            .post('auth/login')
            .send({
                username: 'adminadmin',
                password: '12345678'
            })
            .then(response =>{
                expect(response.status).to.equal(200);
            })
            .catch(error => {
                throw error;
            })
        })
        
        it('Should reject (status 200) the request if post the correct information', function () {
                chai.request(apiAddress)
                    .post('/items')
                    .send({
                        "name": "Lovella Hiukset ja Kauneus",
                        "address": "Torikatu 26, 90100 Oulu",
                        "price": 45,
                        "contact_number": "040 8463100",
                        "description": "We work with love or  notch in the magnificent Rieki house (Rooster upstairs) in the center of Oulu.At Lovella you will find a wide range of hair, beauty and wellness services. We are proud to offer the most unique and unforgettable experience in a stunning setting.",
                        "discount_rate": 10,
                        "instagram": "lovella.suomi"
                    })
                    .then(response =>{
                        expect(response.status).to.equal(200);
                    })
                    .catch(error => {
                        throw error;
                    })
        }).timeout(10000)
            
        it('Should reject (status 400) the request if name field is empty',  function() {
            chai.request(apiAddress)
                .post('/items')
                .send({
                    "address": "Torikatu 26, 90100 Oulu",
                    "price": 45,
                    "contact_number": "040 8463100",
                    "description": "We work with love or  notch in the magnificent Rieki house (Rooster upstairs) in the center of Oulu.At Lovella you will find a wide range of hair, beauty and wellness services. We are proud to offer the most unique and unforgettable experience in a stunning setting.",
                    "discount_rate": 10,
                    "instagram": "lovella.suomi"
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
        })
        
        it('Should reject (status 400) the request if address field is empty',  function() {
            chai.request(apiAddress)
                .post('/items')
                .send({
                    "name": "Lovella Hiukset ja Kauneus",
                    "price": 45,
                    "contact_number": "040 8463100",
                    "description": "We work with love or  notch in the magnificent Rieki house (Rooster upstairs) in the center of Oulu.At Lovella you will find a wide range of hair, beauty and wellness services. We are proud to offer the most unique and unforgettable experience in a stunning setting.",
                    "discount_rate": 10,
                    "instagram": "lovella.suomi"
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
        })

        it('Should reject (status 400) the request if price field is empty',  function() {
            chai.request(apiAddress)
                .post('/items')
                .send({
                    "name": "Lovella Hiukset ja Kauneus",
                    "address": "Torikatu 26, 90100 Oulu",
                    "contact_number": "040 8463100",
                    "description": "We work with love or  notch in the magnificent Rieki house (Rooster upstairs) in the center of Oulu.At Lovella you will find a wide range of hair, beauty and wellness services. We are proud to offer the most unique and unforgettable experience in a stunning setting.",
                    "discount_rate": 10,
                    "instagram": "lovella.suomi"
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
        })

        it('Should reject (status 400) the request if contact_number field is empty',  function() {
            chai.request(apiAddress)
                .post('/items')
                .send({
                    "name": "Lovella Hiukset ja Kauneus",
                    "address": "Torikatu 26, 90100 Oulu",
                    "price": 45,
                    "description": "We work with love or  notch in the magnificent Rieki house (Rooster upstairs) in the center of Oulu.At Lovella you will find a wide range of hair, beauty and wellness services. We are proud to offer the most unique and unforgettable experience in a stunning setting.",
                    "discount_rate": 10,
                    "instagram": "lovella.suomi"
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
        })

        it('Should reject (status 400) the request if description field is empty',  function() {
            chai.request(apiAddress)
                .post('/items')
                .send({
                    "name": "Lovella Hiukset ja Kauneus",
                    "address": "Torikatu 26, 90100 Oulu",
                    "price": 45,
                    "contact_number": "040 8463100",
                    "discount_rate": 10,
                    "instagram": "lovella.suomi"
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
        })

        it('Should reject (status 400) the request if discount_rate field is empty',  function() {
            chai.request(apiAddress)
                .post('/items')
                .send({
                    "name": "Lovella Hiukset ja Kauneus",
                    "address": "Torikatu 26, 90100 Oulu",
                    "price": 45,
                    "contact_number": "040 8463100",
                    "description": "We work with love or  notch in the magnificent Rieki house (Rooster upstairs) in the center of Oulu.At Lovella you will find a wide range of hair, beauty and wellness services. We are proud to offer the most unique and unforgettable experience in a stunning setting.",
                    "instagram": "lovella.suomi"
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
        })

        it('Should reject (status 400) the request if instagram field is empty',  function() {
            chai.request(apiAddress)
                .post('/items')
                .send({
                    "name": "Lovella Hiukset ja Kauneus",
                    "address": "Torikatu 26, 90100 Oulu",
                    "price": 45,
                    "contact_number": "040 8463100",
                    "description": "We work with love or  notch in the magnificent Rieki house (Rooster upstairs) in the center of Oulu.At Lovella you will find a wide range of hair, beauty and wellness services. We are proud to offer the most unique and unforgettable experience in a stunning setting.",
                    "discount_rate": 10
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
        })

        it('Should reject (status 400) the request if name field is empty',  function() {
            chai.request(apiAddress)
                .post('/items')
                .send({
                    "name": "",
                    "address": "Torikatu 26, 90100 Oulu",
                    "price": 45,
                    "contact_number": "040 8463100",
                    "description": "We work with love or  notch in the magnificent Rieki house (Rooster upstairs) in the center of Oulu.At Lovella you will find a wide range of hair, beauty and wellness services. We are proud to offer the most unique and unforgettable experience in a stunning setting.",
                    "discount_rate": 10,
                    "instagram": "lovella.suomi"
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
        })

        it('Should reject (status 400) the request if address field is empty',  function() {
            chai.request(apiAddress)
                .post('/items')
                .send({
                    "name": "Lovella Hiukset ja Kauneus",
                    "address": "",
                    "price": 45,
                    "contact_number": "040 8463100",
                    "description": "We work with love or  notch in the magnificent Rieki house (Rooster upstairs) in the center of Oulu.At Lovella you will find a wide range of hair, beauty and wellness services. We are proud to offer the most unique and unforgettable experience in a stunning setting.",
                    "discount_rate": 10,
                    "instagram": "lovella.suomi"
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
        })

        it('Should reject (status 400) the request if price field is empty',  function() {
            chai.request(apiAddress)
                .post('/items')
                .send({
                    "name": "Lovella Hiukset ja Kauneus",
                    "address": "Torikatu 26, 90100 Oulu",
                    "price": "",
                    "contact_number": "040 8463100",
                    "description": "We work with love or  notch in the magnificent Rieki house (Rooster upstairs) in the center of Oulu.At Lovella you will find a wide range of hair, beauty and wellness services. We are proud to offer the most unique and unforgettable experience in a stunning setting.",
                    "discount_rate": 10,
                    "instagram": "lovella.suomi"
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
        })

        it('Should reject (status 400) the request if contact_number field is empty',  function() {
            chai.request(apiAddress)
                .post('/items')
                .send({
                    "name": "Lovella Hiukset ja Kauneus",
                    "address": "Torikatu 26, 90100 Oulu",
                    "price": 45,
                    "contact_number": "",
                    "description": "We work with love or  notch in the magnificent Rieki house (Rooster upstairs) in the center of Oulu.At Lovella you will find a wide range of hair, beauty and wellness services. We are proud to offer the most unique and unforgettable experience in a stunning setting.",
                    "discount_rate": 10,
                    "instagram": "lovella.suomi"
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
        })

        it('Should reject (status 400) the request if description field is empty',  function() {
            chai.request(apiAddress)
                .post('/items')
                .send({
                    "name": "Lovella Hiukset ja Kauneus",
                    "address": "Torikatu 26, 90100 Oulu",
                    "price": 45,
                    "contact_number": "040 8463100",
                    "description": "",
                    "discount_rate": 10,
                    "instagram": "lovella.suomi"
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
        })

        it('Should reject (status 400) the request if discount_rate field is empty',  function() {
            chai.request(apiAddress)
                .post('/items')
                .send({
                    "name": "Lovella Hiukset ja Kauneus",
                    "address": "Torikatu 26, 90100 Oulu",
                    "price": 45,
                    "contact_number": "040 8463100",
                    "description": "We work with love or  notch in the magnificent Rieki house (Rooster upstairs) in the center of Oulu.At Lovella you will find a wide range of hair, beauty and wellness services. We are proud to offer the most unique and unforgettable experience in a stunning setting.",
                    "discount_rate": "",
                    "instagram": "lovella.suomi"
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
        })

        it('Should reject (status 400) the request if instagram field is empty',  function() {
            chai.request(apiAddress)
                .post('/items')
                .send({
                    "name": "Lovella Hiukset ja Kauneus",
                    "address": "Torikatu 26, 90100 Oulu",
                    "price": 45,
                    "contact_number": "040 8463100",
                    "description": "We work with love or  notch in the magnificent Rieki house (Rooster upstairs) in the center of Oulu.At Lovella you will find a wide range of hair, beauty and wellness services. We are proud to offer the most unique and unforgettable experience in a stunning setting.",
                    "discount_rate": 10,
                    "instagram": ""
                })
                .then(res => {
                    expect(res.status).to.equal(400);
                })
                .catch(err => {
                    throw err;
                });
        })
    })

    //Testing rate
    describe('Testing route /rates', function() {
        it('Should return status 200 with all rates', async function() {
            // Send the request to our server
            await chai.request(apiAddress)
            .get('/rates')
            .then(response => {
                // Check response
                expect(response).to.have.status(200);
                expect(response.status).to.equal(200)
            })
            .catch(error => {
                throw error;
            })
        }).timeout(10000)

        it('Should return status 200 with single rate', async function() {
            await chai.request(apiAddress)
            .get('/rates/61a88524ee8b9ef631a2c3ef')
            .then(response => {
                expect(response.status).to.equal(200);
            })
            .catch(error => {
                throw error;
            })
        })

        it('Post a rate without login', async function () {
            await chai.request(apiAddress)
            .post('/rates')
            .then(response =>{
                expect(response.status).to.equal(403);
            })
            .catch(error => {
                throw error;
            })
        })
    })

    describe('Post a store when logged in', function() {
        beforeEach(function() {
            chai.request(apiAddress)
            .post('auth/login')
            .send({
                username: 'adminadmin',
                password: '12345678'
            })
            .then(response =>{
                expect(response.status).to.equal(200);
            })
            .catch(error => {
                throw error;
            })
        })
        
        it('Should reject (status 200) the request if post the correct information', function () {
                chai.request(apiAddress)
                    .post('/rates')
                    .send({
                        "rate": 1,
                        "comment": "Bad",
                        "storeId": "61a3e928874540ff229fdf8f"
                    })
                    .then(response =>{
                        expect(response.status).to.equal(200);
                    })
                    .catch(error => {
                        throw error;
                    })
        })

        it('Should reject (status 400) the request if rate is empty', function () {
            chai.request(apiAddress)
                .post('/rates')
                .send({
                    "comment": "Bad",
                    "storeId": "61a3e928874540ff229fdf8f"
                })
                .then(response =>{
                    expect(response.status).to.equal(400);
                })
                .catch(error => {
                    throw error;
                })
        })

        it('Should reject (status 400) the request if storeId is empty', function () {
            chai.request(apiAddress)
                .post('/rates')
                .send({
                    "rate": 1,
                    "comment": "Bad"
                })
                .then(response =>{
                    expect(response.status).to.equal(400);
                })
                .catch(error => {
                    throw error;
                })
        })

        it('Should reject (status 400) the request if rate is empty', function () {
            chai.request(apiAddress)
                .post('/rates')
                .send({
                    "rate": "",
                    "comment": "Bad",
                    "storeId": "61a3e928874540ff229fdf8f"
                })
                .then(response =>{
                    expect(response.status).to.equal(400);
                })
                .catch(error => {
                    throw error;
                })
        })

        it('Should reject (status 400) the request if storeId is empty', function () {
            chai.request(apiAddress)
                .post('/rates')
                .send({
                    "rate": "1",
                    "comment": "Bad",
                    "storeId": ""
                })
                .then(response =>{
                    expect(response.status).to.equal(400);
                })
                .catch(error => {
                    throw error;
                })
        })

        it('Should reject (status 400) the request if rate is not in the limit 1 to 5 is empty', function () {
            chai.request(apiAddress)
                .post('/rates')
                .send({
                    "rate": "6",
                    "comment": "Bad",
                    "storeId": "61a3e928874540ff229fdf8f"
                })
                .then(response =>{
                    expect(response.status).to.equal(400);
                })
                .catch(error => {
                    throw error;
                })
        })

    })

    describe('User registration tests', function() {
        it('Should reject (status 400) the request if username is empty', async function() {
            await chai.request(apiAddress)
            .post('/auth/register')
            .send({
                name:"tester01",
                passwordHash: "12345678",
                role: "admin"
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })

        it('Should reject (status 400) the request if name is empty', async function() {
            await chai.request(apiAddress)
            .post('/auth/register')
            .send({
                username: "tester01",
                passwordHash: "12345678",
                role: "admin"
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })

        it('Should reject (status 400) the request if passwordHash is empty', async function() {
            await chai.request(apiAddress)
            .post('/auth/register')
            .send({
                username: "tester01",
                name:"tester01",
                role: "admin"
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })

        it('Should reject (status 400) the request if username is empty', async function() {
            await chai.request(apiAddress)
            .post('/auth/register')
            .send({
                username: "",
                name:"tester01",
                passwordHash: "12345678",
                role: "admin"
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
        it('Should reject (status 400) the request if name is empty', async function() {
            await chai.request(apiAddress)
            .post('/auth/register')
            .send({
                username: "tester01",
                name:"",
                passwordHash: "12345678",
                role: "admin"
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
        it('Should reject (status 400) the request if password is empty', async function() {
            await chai.request(apiAddress)
            .post('/auth/register')
            .send({
                username: "tester01",
                name:"tester01",
                passwordHash: "",
                role: "admin"
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
        it('Should reject (status 400) the request if role is empty', async function() {
            await chai.request(apiAddress)
            .post('/auth/register')
            .send({
                username: "tester01",
                name:"tester01",
                passwordHash: "12345678",
                role: ""
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
        it('Should reject (status 400) the request if username is to short', async function() {
            await chai.request(apiAddress)
            .post('/auth/register')
            .send({
                username: "test",
                name:"tester01",
                passwordHash: "12345678",
                role: "admin"
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
        it('Should reject (status 400) the request if name is too short', async function() {
            await chai.request(apiAddress)
            .post('/auth/register')
            .send({
                username: "tester01",
                name:"test",
                passwordHash: "12345678",
                role: "admin"
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
        it('Should reject (status 400) the request if password is too short', async function() {
            await chai.request(apiAddress)
            .post('/auth/register')
            .send({
                username: "tester01",
                name:"tester01",
                passwordHash: "123",
                role: ""
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
        it('Should reject (status 400) the request if role is not include admin, basic, supervisor', async function() {
            await chai.request(apiAddress)
            .post('/auth/register')
            .send({
                username: "tester01",
                name:"tester01",
                passwordHash: "12345678",
                role: "superstar"
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
        it('Should reject (status 400) the request if username is already exits', async function() {
            await chai.request(apiAddress)
            .post('/auth/register')
            .send({
                username: "testeradmin",
                name:"testeradmin",
                passwordHash: "12345678",
                role: "admin"
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
        it('Should response (status 201) the request if all information is correct', async function() {
            await chai.request(apiAddress)
            .post('/auth/register')
            .send({
                username: "tester10",
                name:"tester10",
                passwordHash: "12345678",
                role: "admin"
            })
            .then(res => {
                expect(res.status).to.equal(201);
            })
            .catch(err => {
                throw err;
            });
        })

    })

    describe('User login tests', function() {
        it('Should reject (status 400) the request if username is empty', async function() {
            await chai.request(apiAddress)
            .post('/auth/login')
            .send({
                passwordHash: "12345678"
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
        it('Should reject (status 400) the request if password is empty', async function() {
            await chai.request(apiAddress)
            .post('/auth/login')
            .send({
                username: 'tester01'
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
        it('Should reject (status 400) the request if username is empty', async function() {
            await chai.request(apiAddress)
            .post('/auth/login')
            .send({
                username: "",
                passwordHash: "12345678"
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
        it('Should reject (status 400) the request if username is empty', async function() {
            await chai.request(apiAddress)
            .post('/auth/login')
            .send({
                username: "tester01",
                passwordHash: ""
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
        it('Should reject (status 400) the request if username and password are not correct', async function() {
            await chai.request(apiAddress)
            .post('/auth/login')
            .send({
                username: "tester011",
                passwordHash: "123456789"
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
        it('Should reject (status 400) the request if username is correct and password is wrong', async function() {
            await chai.request(apiAddress)
            .post('/auth/login')
            .send({
                username: "tester01",
                passwordHash: "123456789"
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
        it('Should reject (status 400) the request if username is wrong and password is correct', async function() {
            await chai.request(apiAddress)
            .post('/auth/login')
            .send({
                username: "tester011",
                passwordHash: "12345678"
            })
            .then(res => {
                expect(res.status).to.equal(400);
            })
            .catch(err => {
                throw err;
            });
        })
    })    

    //Get user information
    describe('Testing user route', function() {
        beforeEach(function() {
            chai.request(apiAddress)
            .post('auth/login')
            .send({
                username: 'adminadmin',
                password: '12345678'
            })
            .then(response =>{
                expect(response.status).to.equal(200);
            })
            .catch(error => {
                throw error;
            })
        })
        
        it('Should response (status 200) the request if logged', function () {
                chai.request(apiAddress)
                    .get('/users')
                    .then(response =>{
                        expect(response.status).to.equal(200);
                    })
                    .catch(error => {
                        throw error;
                    })
        })

        it('Should response (status 200) the request if logged', function () {
            chai.request(apiAddress)
                .get('/user/61a9551fc184ecefb891f18a')
                .then(response =>{
                    expect(response.status).to.equal(200);
                })
                .catch(error => {
                    throw error;
                })
        })
    })    
})