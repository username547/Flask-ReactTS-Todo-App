from flask import request, jsonify
from typing import List
from __init__ import app, db
from models import Todo

@app.route("/todos", methods=["GET"])
def get_todos():
    todos: List[Todo] = Todo.query.all()
    json_todos = list(map(lambda x: x.to_json(), todos))
    return jsonify({"todos": json_todos}), 200

@app.route("/create", methods=["POST"])
def create_todo():
    title = request.json.get("title")
    if not title:
        return jsonify({"message": "Bad Request"}), 400

    new_todo = Todo(title=title)
    db.session.add(new_todo)
    db.session.commit()
    
    return jsonify({"todo": new_todo.to_json()}), 201

@app.route("/update/<int:id>", methods=["PATCH"])
def update_todo(id):
    todo: Todo = Todo.query.get(id)
    if not todo:
        return jsonify({"message": "Not Found"}), 404
    
    title = request.json.get("title")
    if not title:
        return jsonify({"message": "Bad Request"}), 400
    
    todo.title = title
    db.session.commit()

    return jsonify({"todo": todo.to_json()}), 200

@app.route("/complete/<int:id>", methods=["PATCH"])
def complete_todo(id):
    todo: Todo = Todo.query.get(id)
    if not todo:
        return jsonify({"message": "Not Found"}), 404
    
    todo.completed =  not todo.completed
    db.session.commit()

    return jsonify({"todo": todo.to_json()}), 200

@app.route("/delete/<int:id>", methods=["DELETE"])
def delete_todo(id):
    todo: Todo = Todo.query.get(id)
    if not todo:
        return jsonify({"message": "Not Found"}), 404
    
    db.session.delete(todo)
    db.session.commit()

    return jsonify({"todo": todo.to_json()}), 200

@app.route("/delete-all", methods=["DELETE"])
def delete_all_todos():
    todos: List[Todo] = Todo.query.all()

    for todo in todos:
        db.session.delete(todo)
    db.session.commit()

    return jsonify({"message": "OK"}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)