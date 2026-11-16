import assert from 'node:assert/strict';
import { describe, it } from 'node:test';
import { addTask, createList, removeTask, toggleTask } from '../src/todo.js';

describe('todo list', () => {
  it('starts empty', () => {
    assert.deepEqual(createList(), []);
  });

  it('adds a task with the next id', () => {
    const tasks = addTask(addTask(createList(), '  Buy milk  '), 'Walk');
    assert.deepEqual(tasks, [
      { id: 1, title: 'Buy milk', done: false },
      { id: 2, title: 'Walk', done: false },
    ]);
  });

  it('rejects an empty title', () => {
    assert.throws(() => addTask(createList(), '   '), /Title is required/);
  });

  it('toggles done and keeps the other tasks', () => {
    const tasks = addTask(addTask(createList(), 'Buy milk'), 'Walk');
    const toggled = toggleTask(tasks, 1);
    assert.equal(toggled[0].done, true);
    assert.equal(toggled[1].done, false);
    assert.equal(tasks[0].done, false);
  });

  it('removes a task by id', () => {
    const tasks = addTask(addTask(createList(), 'Buy milk'), 'Walk');
    assert.deepEqual(removeTask(tasks, 1), [{ id: 2, title: 'Walk', done: false }]);
  });

  it('refuses to toggle or remove a missing id', () => {
    const tasks = addTask(createList(), 'Buy milk');
    assert.throws(() => toggleTask(tasks, 9), /Task not found/);
    assert.throws(() => removeTask(tasks, 9), /Task not found/);
  });
});
