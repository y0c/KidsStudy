import app from "../../app";
import { assert } from "chai";
import request from "supertest";



describe("StudentRouter Test", () => {

    it("#POST /admin/student", done => {
        request(app.instance)
            .post('/admin/student')
            .send({
                userId : "test11",
                userName : "테스트",
                password : "123123",
                grade : "초3",
                role : "student",
                etc : "비고 테스트"
            })
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                
                assert.equal( res.body.code, "success" );
                done();
            });
    });

    it("#GET /admin/student ", done => {
        request(app.instance)
            .get('/admin/student')
            .expect('Content-Type', /json/)
            .expect(200)
            .end( (err, res) => {
                if (err) throw err;
                
                assert.equal( res.body.code, "success" );
                assert.isArray( res.body.studentList );
                done();
            });
    });


    it("#GET /admin/student/:userId", done => {
        request(app.instance)
            .get('/admin/student/test11')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                
                assert.equal( res.body.code, "success" );
                assert.isNotNull( res.body.student );
                done();
            });
    });

    it("#GET /admin/student/paperLog/:userId", done => {
        request(app.instance)
            .get('/admin/student/paperLog/test11')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                
                assert.equal( res.body.code, "success" );
                assert.isArray( res.body.userPaperLogList );
                done();
            });
    });


    it("#PUT /admin/student/:userId", done => {
        request(app.instance)
            .put('/admin/student/test11')
            .send({
                userId : "test12",
                userName : "테스트3333",
                password : "456456",
                grade : "초1",
                role : "student",
                etc : "비고 테스트"
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

    it("#DELETE /admin/student/:userId", done => {
        request(app.instance)
            .delete('/admin/student/test12')
            .expect('Content-Type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) done(err);
                
                assert.equal( res.body.code, "success" );
                done();
            });

    });
    


});