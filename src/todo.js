/**
 * @typedef {object} Task
 * @property {number} id
 * @property {string} title
 * @property {boolean} done
 */

/** @returns {Task[]} */
export function createList() {
  return [];
}

/**
 * @param {Task[]} tasks
 * @param {string} title
 * @returns {Task[]}
 */
export function addTask(tasks, title) {
  const trimmed = title.trim();
  if (!trimmed) {
    throw new Error('Title is required');
  }
  const id = tasks.reduce((max, task) => Math.max(max, task.id), 0) + 1;
  return [...tasks, { id, title: trimmed, done: false }];
}

/**
 * @param {Task[]} tasks
 * @param {number} id
 * @returns {Task[]}
 */
export function toggleTask(tasks, id) {
  const found = tasks.some((task) => task.id === id);
  if (!found) {
    throw new Error('Task not found');
  }
  return tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));
}

/**
 * @param {Task[]} tasks
 * @param {number} id
 * @returns {Task[]}
 */
export function removeTask(tasks, id) {
  const found = tasks.some((task) => task.id === id);
  if (!found) {
    throw new Error('Task not found');
  }
  return tasks.filter((task) => task.id !== id);
}

/**
 * @param {Task[]} tasks
 * @param {'active' | 'completed'} status
 * @returns {Task[]}
 */
export function filterTasks(tasks, status) {
  if (status === 'active') {
    return tasks.filter((task) => !task.done);
  }
  if (status === 'completed') {
    return tasks.filter((task) => task.done);
  }
  throw new Error('Invalid filter status');
}
