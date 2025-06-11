// === File: todo.js ===
// ES6 module exporting a TodoList class

export class TodoList {
    constructor() {
      this.tasks = [];
    }
  
    /**
     * Add a task with the given description.
     * @param {string} description
     */
    addTask(description) {
      this.tasks.push({ description, completed: false });
    }
  
    /**
     * Mark the task at the given index as complete.
     * @param {number} index
     */
    markComplete(index) {
      if (index >= 0 && index < this.tasks.length) {
        this.tasks[index].completed = true;
      }
    }
  
    /**
     * List all tasks to the console with their status.
     */
    listAll() {
      console.log("=== Todo List ===");
      this.tasks.forEach((task, i) => {
        const status = task.completed ? "✔ Completed" : "✘ Pending";
        console.log(`${i}. ${task.description} [${status}]`);
      });
      console.log("=================");
    }
  }
  
  
  // === File: app.js ===
  // Import the TodoList class and use it
  
  import { TodoList } from './todo.js';
  
  // Create an instance
  const myTodos = new TodoList();
  
  // Add some tasks
  myTodos.addTask('Buy groceries');
  myTodos.addTask('Walk the dog');
  myTodos.addTask('Read JavaScript book');
  
  // Mark one complete
  myTodos.markComplete(1);
  
  // List all tasks
  myTodos.listAll();
  
  // Expected console output:
  // === Todo List ===
  // 0. Buy groceries [✘ Pending]
  // 1. Walk the dog [✔ Completed]
  // 2. Read JavaScript book [✘ Pending]
  // =================
  