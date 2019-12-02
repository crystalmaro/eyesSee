// making an instance for Vue
// el is the entry point of the app
new Vue({
	el: '#app',
	data() {
		return {
			newTodo: '',
			todos: [ { id: 0, title: 'first todo', completed: false } ],
			editedTodo: null,
			visibility: 'all',
		};
	},
	// lifecycle hooks
	created() {
		this.todos = JSON.parse(localStorage.getItem('vue-todo') || []);
	},
	computed: {
		filteredTodos() {
			if (this.visibility === 'all') {
				// all
				return this.todos;
			} else if (this.visibility === 'active') {
				// active
				return this.todos.filter((todo) => {
					return !todo.completed;
				});
			} else if (this.visibility === 'completed') {
				// completed
				return this.todos.filter((todo) => {
					return todo.completed;
				});
			}
		},
	},
	methods: {
		addTodo() {
			this.todos.push({ id: this.todos.length, title: this.newTodo, completed: false });
			this.newTodo = '';
			localStorage.setItem('vue-todo', JSON.stringify(this.todos));
		},
		removeTodo(todo) {
			this.todos.splice(this.todos.indexOf(todo), 1);
			localStorage.setItem('vue-todo', JSON.stringify(this.todos));
		},
		// double click
		editTodo(todo) {
			// put the targeted todo to the editedTodo staging area
			this.editedTodo = todo;
		},
		doneEdit(todo) {
			if (!this.editedTodo) {
				return;
			}
			// after editing, reset this.editedTodo back to null
			this.editedTodo = null;
			// todo.title = todo.title.trim(); //remove space
			if (!todo.title) {
				this.removeTodo(todo);
			}
			localStorage.setItem('vue-todo', JSON.stringify(this.todos));
		},
	},
});
