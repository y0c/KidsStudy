import Datastore from "nedb";
let db = {};

db.users = new Datastore("users.db");
db.papers   = new Datastore("papres.db");

db.users.loadDatabase();
db.papers.loadDatabase();

export default db;

