const mocha =require( 'mocha');
const chai=require( 'chai');
const { expect } =require( 'chai');
const chaiHttp =require( 'chai-http');
const Sinon = require('sinon');
const path = require('path')
const app =require( '../index');
const Article =require( '../src/models/articleModel');
const cloudinary = require('../src/config/cloudinary');

const { it, describe, before, after } = mocha;

const testingData={
    title:'testing article title',
    content:'testing article content',
}
const testingDataUpdate={
    title:'testing article title update',
    content:'testing article content update',
}

const admin={
    email:'admin@gmail.com',
    password:'123456'
}

chai.expect();
chai.use(chaiHttp);

describe('Testing Blog routes', () => {
    const sandbox = Sinon.createSandbox();
    before(async () => {
        sandbox.stub(cloudinary, 'upload').resolves({
            url: 'wazaa',
          });
		await Article.deleteMany();
	});

    after(async () => {
		await Article.deleteMany();
	});
    it('should create new blog article.',async()=>{
        const adminSignin=await chai.request(app).post('/api/users/login').send(admin)
        const token = `Bearer ${adminSignin.body.token}`;
        const res=await chai.request(app).post('/api/articles/add').field('title', testingData.title).field('content', testingData.content).attach('photo', path.resolve(__dirname, './mock/him.png')).set('Authorization', token)
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a('object')
    })
    it('should get all blog articles.',async()=>{
        const adminSignin=await chai.request(app).post('/api/users/login').send(admin)
        const token = `Bearer ${adminSignin.body.token}`;
        const res1=await chai.request(app).post('/api/articles/add').send(testingData).set('Authorization', token)
        const res=await chai.request(app).get('/api/articles/')
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.a('array')
    }),
    it('should get one blog article by id',async()=>{
        const adminSignin=await chai.request(app).post('/api/users/login').send(admin)
        const token = `Bearer ${adminSignin.body.token}`;
        const res1=await chai.request(app).post('/api/articles/add').send(testingData).set('Authorization', token)
        const article=await chai.request(app).get('/api/articles/')
        const id=article.body[0]._id
        const res=await chai.request(app).get(`/api/articles/${id}`)
        
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.a('object')
    }),
    it('should update blog article',async()=>{
        const adminSignin=await chai.request(app).post('/api/users/login').send(admin)
        const token = `Bearer ${adminSignin.body.token}`;
        const res1=await chai.request(app).post('/api/articles/add').send(testingData).set('Authorization', token)
        const article=await chai.request(app).get('/api/articles/')
        const id=article.body[0]._id
        const res=await chai.request(app).patch(`/api/articles/update/${id}`).send(testingDataUpdate).set('Authorization', token)
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.a('object')
    }),
    it('should delete blog article',async()=>{
        const adminSignin=await chai.request(app).post('/api/users/login').send(admin)
        const token = `Bearer ${adminSignin.body.token}`;
        const res1=await chai.request(app).post('/api/articles/add').send(testingData).set('Authorization', token)
        const article=await chai.request(app).get('/api/articles/')
        const id=article.body[0]._id
        const res=await chai.request(app).delete(`/api/articles/delete/${id}`).set('Authorization', token)
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.a('object')
    }),
    it('should comment on blog article',async()=>{
        const adminSignin=await chai.request(app).post('/api/users/login').send(admin)
        const token = `Bearer ${adminSignin.body.token}`;
        const res1=await chai.request(app).post('/api/articles/add').send(testingData).set('Authorization', token)
        const article=await chai.request(app).get('/api/articles/')
        const id=article.body[0]._id
        const res=await chai.request(app).post(`/api/articles/comment/`).send(testingDataUpdate).set('Authorization', token).send({"article_id":id,
        "comment":"that content is very helpful thanks"})
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.a('object')
    }),
    it('should like on blog article',async()=>{
        const adminSignin=await chai.request(app).post('/api/users/login').send(admin)
        const token = `Bearer ${adminSignin.body.token}`;
        const res1=await chai.request(app).post('/api/articles/add').send(testingData).set('Authorization', token)
        const article=await chai.request(app).get('/api/articles/')
        const id=article.body[0]._id
        const res=await chai.request(app).post(`/api/articles/like`).send(testingDataUpdate).set('Authorization', token).send({"article_id":id})
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.a('object')
    })
})