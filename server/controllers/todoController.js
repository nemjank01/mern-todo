export async function getAllTodos(req, res, next) {
  res.send("all todos");
}

export async function createTodo(req, res, next) {
  res.send(`create todo`);
}

export async function getTodo(req, res, next) {
  res.send(`get todo with id ${req.params.id}`);
}

export async function updateTodo(req, res, next) {
  res.send(`update todo with id ${req.params.id}`);
}

export async function deleteTodo(req, res, next) {
  res.send(`delete todo with id ${req.params.id}`);
}
