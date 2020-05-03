import couchdb
import os

couch = None
db = None

DATABASE_NAME = "payments"


def _connect():
    global couch
    global db
    if(couch):
        return couch

    couch = couchdb.Server(os.getenv("DATABASE", "http://localhost:5984/"))
    try:
        db = couch.create(DATABASE_NAME)
    except:
        db = couch[DATABASE_NAME]


def save(doc):
    print("couch::save")
    _connect()
    return db.save(doc)  # Saving document
