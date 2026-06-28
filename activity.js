// activity.js

class Activity {

  constructor(title, deadline, note = '') {
    this.id = Date.now();
    this.title = title;
    this.deadline = deadline;
    this.note = note;
    this.isDone = false;
  }

  complete() {
    this.isDone = true;
  }

  undoComplete() {
    this.isDone = false;
  }

  get status() {
    return this.isDone ? 'Selesai' : 'Belum Selesai';
  }

}