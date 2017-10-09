//argument 가 없다면 default로 development 환경으로 설정
process.env.NODE_ENV = process.env.NODE_ENV || "development";

import express from "express";
import path from "path";
import favicon from "serve-favicon";
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import adminIndex from './routes/admin/index';
import studentIndex from './routes/student/index';
import paperGroupRouter from "./routes/admin/paperGroupRouter";
import paperRouter from "./routes/admin/paperRouter";
import studentRouter from "./routes/admin/studentRouter"
import session from 'express-session';

import db from "./db";

const app = express();

let port = process.env.PORT || '3000';
app.set('port', port);

// view engine setup
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

app.use(session({
    secret: '@#@$SECRET_KEY#@$#$',
    resave: false,
    saveUninitialized: true
}));

function isAuthendicated( req, res, next ){
    if( !req.session.userid ){
        res.redirect("/");
    }
}

// app.use('/', studentIndex(db) );
// app.use('/admin', adminIndex);
app.use('/admin/paperGroup', paperGroupRouter );
app.use('/admin/paper' , paperRouter );
app.use('/admin/student', studentRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

export default {
    instance : app,
    start() {
        return new Promise((resolve, reject) => {
            app.listen(port, () => {
                resolve();
            });
        });
    }
}
