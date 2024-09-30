import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'oc-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent implements OnInit {
  files: FileList | null = null;
  @Output() filesSelectedEvent = new EventEmitter();
  @Input() sampleName = '';
  fileName: string;
  constructor() {}

  ngOnInit(): void {}

  onDragOver(event: DragEvent) {
    event.preventDefault();
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.files = event.dataTransfer?.files;
  }

  chooseFile(): void {
    document.getElementById('file-upload').click();
  }

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;
    if (files.length) {
      this.fileName = files[0].name;
    }
    this.filesSelectedEvent.emit(files);
    // Handle selected files here
  }

  downloadSample() {}
}
