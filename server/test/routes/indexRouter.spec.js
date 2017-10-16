import app from "../../app";
import { assert } from "chai";
import request from "supertest";

describe("indexRouter Test", () => {

    it("#indexRouter", done=> {
        request(app.instance)
            .get('/admin/paperGroup')
            // .expect('Content-Type', /json/)
            .expect(200);
    });

});