import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  noteData:any =''
  searchKey:string=''
  noteId:string = ''

  constructor(private _NoteService:NoteService){

  }

  addNoteForm:FormGroup = new FormGroup({
    title:new FormControl(null),
    content: new FormControl(null)
  })

  editNoteForm:FormGroup = new FormGroup({
    title:new FormControl(null),
    content: new FormControl(null)
  })

  addNote(addNoteForm:FormGroup){
    this._NoteService.addNotes(addNoteForm.value).subscribe({
      next:(respo)=>{
        console.log(respo);
        
      },
      error:(err)=>{
        console.log(err);
        

      }
    })
    // console.log(addNoteForm.value);
    
  }

  getNote(){
    this._NoteService.getNotes().subscribe({
      next:(respo)=>{
        console.log(respo);
        this.noteData = respo.notes
        
      },
      error:(err)=>{
        console.log(err);
        

      }
    })
  }


  editNote(editNoteForm:FormGroup){
    this._NoteService.updateNotes(editNoteForm.value,this.noteId).subscribe({
      next:(respo)=>{
        console.log(respo);
        this.noteData = respo.notes;
        this.getNote();
        
      },
      error:(err)=>{
        console.log(err);
        

      }
    })
  }

  deleteNote(){
    this._NoteService.deleteNotes(this.noteId).subscribe({
      next:(respo)=>{
        console.log(respo);
        
        this.getNote();
        
      },
      error:(err)=>{
        console.log(err);
        

      }
    })
  }


  getNoteId(id:string){
    this.noteId = id
    console.log(this.noteId);
    
  }

  ngOnInit(): void {
    this.getNote();
    
  }

}
