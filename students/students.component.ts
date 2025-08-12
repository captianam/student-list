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
  students: Student[] = [];

  name = '';
  roll: number | null = null;
  className = '';

  editIndex: number | null = null;
  searchText = '';

  saveStudent() {

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
 
      this.students[this.editIndex] = newStudent;
      this.editIndex = null;
    } else {
     
      this.students.push(newStudent);
    }

    this.clearForm();
  }

 
  startEdit(index: number) {
    const s = this.students[index];
    this.name = s.name;
    this.roll = s.roll;
    this.className = s.className;
    this.editIndex = index;
  }


  removeStudent(index: number) {
    if (!confirm('Delete this student?')) return;
    this.students.splice(index, 1);
    // if we were editing this one, clear form
    if (this.editIndex === index) {
      this.clearForm();
      this.editIndex = null;
    }
  }


  clearForm() {
    this.name = '';
    this.roll = null;
    this.className = '';
    this.editIndex = null;
  }


  get filteredStudents() {
    const q = this.searchText.trim().toLowerCase();
    if (!q) return this.students;
    return this.students.filter(s => s.name.toLowerCase().includes(q));
  }
}
