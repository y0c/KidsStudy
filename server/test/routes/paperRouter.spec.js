import app from "../../app";
import { assert } from "chai";
import request from "supertest";
import db from "../../models/index";


describe("PaperRouter Test", () => {

    before(() => {
        return db.sequelize.sync({ force : true })
                .then(()=>{
                    return db.PaperGroup.create({
                        groupId : "A",
                        groupTitle : "초등학교 수학 학습지",
                        createdAt : new Date()
                    })
                });
    });

    
    it("#POST /admin/paper", done => {
        request(app.instance)
            .post('/admin/paper')
            .send({
                groupId : "A",
                paperTitle : "fail Check Test",
                step : "110",
                description : "뺄셈을 하세요",
                operationType : "calculate",
                displayType : "horizontal",
                etc : "테스트 !!",
                question : "3+4\n2+3\n9+44\n3+44\n23+33\n344+33"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                
                assert.equal( res.body.code, "success" );
                done();
            });
    });

    it("#GET /admin/paper/:groupId ", done => {
        request(app.instance)
            .get('/admin/paper/A')
            .expect('Content-Type', /json/)
            .expect(200)
            .end( (err, res) => {
                if (err) throw err;
                
                assert.equal( res.body.code, "success" );
                assert.isArray( res.body.paperList );
                done();
            });
    });


    it("#GET /admin/paper/:groupId/:paperId", done => {
        request(app.instance)
            .get('/admin/paper/A/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                
                assert.equal( res.body.code, "success" );
                assert.isNotNull( res.body.paper , "findOnePaper return Null");
                done();
            });
    });


    it("#PUT /admin/paper/:paperId", done => {
        request(app.instance)
            .put('/admin/paper/1')
            .send({
                paperTitle : "ㅈㄷㄹㅈㄷㄹㄷㅈ",
                step : "110",
                description : "뺄셈을 하세요",
                operationType : "calculate",
                displayType : "horizontal",
                etc : "테스트 3343434334343!!",
                question : "44+4\n34+3\n9+44\n3+44\n23+33\n344+33\n344+33\n344+33"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);

                // assert( res.body.questions.length == 8 );
                assert.equal( res.body.code, "success" );
                done();
            });

    });

    it("#DELETE /admin/paper/:paperId", done => {
        request(app.instance)
            .delete('/admin/paper/1')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                
                assert.equal( res.body.code, "success" );
                done();
            });

    });
    


});