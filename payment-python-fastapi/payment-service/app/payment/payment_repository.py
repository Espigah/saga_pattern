from app.database import couch


def save(doc):
    return couch.save(doc)  # Saving document
