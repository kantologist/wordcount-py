from app import db
from sqlalchemy.dialects.postgresql import JSON

class Result(db.Model):
    __tablename__ = 'results'

    id = db.Column(db.Integer, primary_key=True)
    url = d.Column(db.String())
    result_all = db.Column(JSON)
    result_no_stop_word = db.Column(JSON)


    def __init__(self, url, result_all, result_no_stop_word):
        self.url = url
        self.result_all = result_all
        self.result_no_stop_word = result_no_stop_word


    def __repr__(self):
        return '<id {}>'.format(self.id)
