import { Pipe, PipeTransform } from '@angular/core';
import { Data } from '../../../notes/src/app/data'
@Pipe({
  name: 'search'
})
export class SearchPipe implements PipeTransform {

  transform(note:Data[],searchKey:string): Data[] {
    return note.filter((note)=>note.title.toLocaleLowerCase().includes(searchKey.toLocaleLowerCase()));
  }

}
