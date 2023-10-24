import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import Quill from 'quill';
import { PostService } from 'src/app/services/postService/post.service';
import {
  MatSnackBar,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
})
export class EditorComponent implements AfterViewInit {
  @ViewChild('editor', { static: true }) editorElement: ElementRef;
  private quill!: Quill;
  public isEditorVisible = true;

  constructor(
    private postService: PostService,
    private snackBar: MatSnackBar,
    private dialogRef: MatDialogRef<EditorComponent>
  ) {
    this.editorElement = {} as ElementRef;
  }

  ngAfterViewInit(): void {
    this.quill = new Quill(this.editorElement.nativeElement, {
      theme: 'snow',
    });
  }

  submitEditorContent() {
    const content = this.quill.root.innerHTML; // Get the HTML content from the editor
    this.postService.saveContent(content).subscribe((result) => {
      console.log('Submit Result', result);

      this.snackBar.open(result.message, 'Close', {
        duration: 2000,
        verticalPosition: 'top',
      });
      setTimeout(() => {
        this.toggleEditorVisibility();
      }, 1000);
    });
    this.dialogRef.close();
  }

  toggleEditorVisibility() {
    this.isEditorVisible = false;
  }
}
