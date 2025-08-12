import { Component } from '@angular/core';
interface Student {
  name: string;
  roll: number;
  className: string;
}

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent {
  // the in-memory data store
  students: Student[] = [];

  // form fields
  name = '';
  roll: number | null = null;
  className = '';

  // for editing
  editIndex: number | null = null;

  // search box
  searchText = '';

  // add new or save changes
  saveStudent() {
    // simple validation
    if (!this.name.trim() || this.roll === null || !this.className.trim()) {
      alert('Please fill name, roll and class.');
      return;
    }

    const newStudent: Student = {
      name: this.name.trim(),
      roll: this.roll,
      className: this.className.trim()
    };

    if (this.editIndex !== null) {
      // update existing
      this.students[this.editIndex] = newStudent;
      this.editIndex = null;
    } else {
      // add new
      this.students.push(newStudent);
    }

    this.clearForm();
  }

  // prepare form for editing
  startEdit(index: number) {
    const s = this.students[index];
    this.name = s.name;
    this.roll = s.roll;
    this.className = s.className;
    this.editIndex = index;
  }

  // delete a student
  removeStudent(index: number) {
    if (!confirm('Delete this student?')) return;
    this.students.splice(index, 1);
    // if we were editing this one, clear form
    if (this.editIndex === index) {
      this.clearForm();
      this.editIndex = null;
    }
  }

  // reset the form fields
  clearForm() {
    this.name = '';
    this.roll = null;
    this.className = '';
    this.editIndex = null;
  }

  // simple case-insensitive search by name
  get filteredStudents() {
    const q = this.searchText.trim().toLowerCase();
    if (!q) return this.students;
    return this.students.filter(s => s.name.toLowerCase().includes(q));
  }
}
