from __init__ import db

class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(256), nullable=False)
    completed = db.Column(db.Boolean, nullable=False, default=False)

    def to_json(self):
        return {
            'id': self.id,
            'title': self.title,
            'completed': self.completed
        }