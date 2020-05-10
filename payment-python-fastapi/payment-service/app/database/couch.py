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
    print("[ couch::save ]", doc)
    _connect()
    return db.save(doc)  # Saving document


def find(mango):
    print("[ couch::find ]", mango)
    _connect()
    return db.find(mango)


def delete(doc):
    print("[ couch::delete ]", doc)
    _connect()
    return db.delete(doc)
