import app from "../../app";
import { assert } from "chai";
import request from "supertest";


describe("paperGroupRouter Test", () => {

    
    it("#GET /admin/paperGroup ", done => {
        request(app.instance)
            .get('/admin/paperGroup')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(( err, res ) =>{
                if (err) throw err;
                
                assert.equal( res.body.code, "success" );
                assert.isArray( res.body.paperGroupList );
                done();
            });
    });


    it("#GET /admin/paperGroup/:groupid", done => {
        request(app.instance)
            .get('/admin/paperGroup/A')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(( err, res ) =>{
                if (err) throw err;
                
                assert.equal( res.body.code, "success" );
                assert.isNotNull( res.body.paperGruop , "findOnePaperGroup return Null");
                done();
            });
    });


    it("#PUT /admin/paperGroup/:groupid", done => {
        request(app.instance)
            .put('/admin/paperGroup/A')
            .send({ groupTitle : "update Test"})
            .expect('Content-Type', /json/)
            .expect(200)
            .end(( err, res ) =>{
                if (err) throw err;
                
                assert.equal( res.body.code, "success" );
                done();
            });

    });
   

    it("#POST /admin/paperGroup fail Check", done => {
        request(app.instance)
            .post('/admin/paperGroup')
            .send({
                groupId : "A",
                groupTitle : "fail Check Test"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(( err, res ) =>{
                if (err) throw err;
                
                assert.equal( res.body.code, "fail" );
                done();
            });
    });

    it("#POST /admin/paperGroup success Check", done => {
        request(app.instance)
            .post('/admin/paperGroup')
            .send({
                groupId : "F",
                groupTitle : "success Check Test"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end(( err, res ) =>{
                if (err) throw err;
                
                assert.equal( res.body.code, "success" );
                done();
            });
    });


    it("#DELETE /admin/paperGroup/:groupid", done => {
        request(app.instance)
            .delete('/admin/paperGroup/A')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(( err, res ) =>{
                if (err) throw err;
                
                assert.equal( res.body.code, "success" );
                done();
            });

    });
    


});