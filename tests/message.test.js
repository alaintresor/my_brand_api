const mocha =require( 'mocha');
const chai=require( 'chai');
const { expect } =require( 'chai');
const chaiHttp =require( 'chai-http');
const app =require( '../index');
const Meassage=require('../src/models/messageModel')

const { it, describe, beforeEach, after } = mocha;

const testingMessage={
    name:"John Doe",
    email:"john@gmail.com",
    message:"testing message"
}

const admin={
    email:'admin@gmail.com',
    password:'123456'
}

chai.expect()
chai.use(chaiHttp)

describe('Testing message routes',()=>{
    beforeEach(async()=>{
        await Meassage.deleteMany()
    })
    after(async()=>{
        await Meassage.deleteMany()
    }),
    it('should send message',async()=>{
        const res= await chai.request(app).post('/api/message/send').send(testingMessage)
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.a('object')
    })
    it('should get all messages',async()=>{
       const send= await chai.request(app).post('/api/message/').send(testingMessage)
       const adminSignin=await chai.request(app).post('/api/users/login').send(admin)
        const token = `Bearer ${adminSignin.body.user.token}`;
        const res= await chai.request(app).get('/api/message/').set('Authorization', token)
        expect(res.status).to.be.equal(200)
        expect(res.body).to.be.a('object')
    })
    it('should return User Not Authorized where user isn\'t admin',async()=>{
       const send= await chai.request(app).post('/api/message/').send(testingMessage)
    //    const adminSignin=await chai.request(app).post('/api/users/login').send(admin)
        const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyNjQxOWM3ZGM3YTNlNzY1YzZhZjk2YiIsImlhdCI6MTY1MTE3Njg2NywiZXhwIjoxNjUzNzY4ODY3fQ.m7ByD-CDicvEfi9ELAv3SwkSngr_mb4Iephg9S-rtmg";
        const res= await chai.request(app).get('/api/message/').set('Authorization', token)
        expect(res.status).to.be.equal(401)
        expect(res.body).to.be.a('object')
    })
})