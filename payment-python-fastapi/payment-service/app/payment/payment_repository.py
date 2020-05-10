from app.database import couch


def save(doc):
    return couch.save(doc)  # Saving document

def update(doc):
    return couch.save(doc)

def delete(transaction_id):
    print("[ repository::delete ]", transaction_id)
    mango = {'selector': {'transaction_id': transaction_id}, 'fields': ['_id', '_rev']}
    docs = couch.find(mango)
    for row in docs:
        couch.delete(row)
