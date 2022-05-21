import { Component, ElementRef, HostListener } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-file-upload-field',
  templateUrl: './file-upload-field.component.html',
  styleUrls: [
    './file-upload-field.component.scss'
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: FileUploadFieldComponent,
      multi: true
    }
  ]
})
export class FileUploadFieldComponent {
  onChange: Function;
  file: File | null = null;

  @HostListener( 'change', [ '$event.target.files', '$event' ] ) emitFiles( event: FileList, test: any ) {
    const file = event && event.item( 0 );
    this.onChange( file );
    this.file = file;
  }

  constructor( private host: ElementRef<HTMLInputElement> ) {}

  writeValue( file: File ) {
    if ( !file ) {
      console.log('clear input');
      this.host.nativeElement.value = '';
      this.host.nativeElement.files = null;
      this.file = null;
    } else {
      const fileList = {} as FileList;
      fileList[0] = file;

      console.log('set file', file);
      this.host.nativeElement.value = file.name;
      this.host.nativeElement.files = fileList;
      this.file = file;
    }
  }

  registerOnChange( fn: Function ) {
    this.onChange = fn;
  }

  registerOnTouched( fn: Function ) {
  }
}
