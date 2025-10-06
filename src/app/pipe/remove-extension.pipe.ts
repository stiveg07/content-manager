import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'removeExtension',
  standalone: true
})
export class RemoveExtensionPipe implements PipeTransform {
  transform(filename: string | null | undefined): string {
    if (!filename) return '';

    const lastDotIndex = filename.lastIndexOf('.');
    if (lastDotIndex === -1 || lastDotIndex === filename.length - 1) {
      return filename;
    }
    const extension = filename.substring(lastDotIndex + 1);
    const extensionRegex = /^[a-zA-Z0-9]+$/;
    if (!extensionRegex.test(extension)) {
      return filename;
    }

    return filename.substring(0, lastDotIndex);
  }
}
