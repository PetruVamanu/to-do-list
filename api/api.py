from flask import Flask, request
from flask_sqlalchemy import SQLAlchemy
from flask import jsonify

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///data.db'
app.config["DEBUG"] = True
db = SQLAlchemy(app)


class Todo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(80), nullable=False)
    isdone = db.Column(db.Boolean)

    def __repr__(self):
        return f"{self.task} - {self.isdone}"


@app.route('/')
def say_hello():
    return 'Hello World!'


@app.route('/todos', methods=['GET'])
def get_todos():
    todos = Todo.query.all()
    output = []
    for todo in todos:
        output.append(
            {'task': todo.task, 'isdone': todo.isdone, 'id': todo.id})
    return {"todos": output}


@app.route('/todos/<id>', methods=['GET'])
def get_todo_by_id(id):
    todo = Todo.query.get_or_404(id)
    return {'task': todo.task, 'isdone': todo.isdone, 'id': todo.id}


@app.route('/todos', methods=['POST'])
def add_todo():
    todo = Todo(task=request.json['task'], isdone=request.json['isdone'])
    db.session.add(todo)
    db.session.commit()
    return {"id": todo.id}


@app.route('/todos/<id>', methods=['DELETE'])
def delete_todo(id):
    todo = Todo.query.get(id)
    if todo is None:
        return {"error": "todo Not Found"}
    db.session.delete(todo)
    db.session.commit()
    return {"message": "todo deleted"}


@app.route("/todos/<int:id>", methods=["PUT"])
def put_todo(id):

    todo = Todo.query.get(id)
    task = request.json['task']
    isdone = request.json['isdone']

    todo.task = task
    todo.isdone = isdone
    db.session.commit()

    return {"message": "todo updated"}


app.run()
