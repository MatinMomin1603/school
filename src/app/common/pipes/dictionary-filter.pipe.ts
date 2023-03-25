import { Pipe, PipeTransform } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Pipe({
  name: 'dictionaryFilter'
})
export class DictionaryFilterPipe implements PipeTransform {
  searchData:any;
  dates:any = [
    {
      'day': 'Sunday',
      'limit': 7, 
    },
    {
    'day': 'Monday',
    'limit': 4, 
    },
    {
    'day': 'Tuesday',
    'limit': 5, 
    },
    {
    'day': 'Wednesday',
    'limit': 5, 
    },
    {
    'day': 'Thursday',
    'limit': 6, 
    },
    {
    'day': 'Friday',
    'limit': 6, 
    },
    {
    'day': 'Saturday',
    'limit': 7, 
    }  
]
currentDate:any;
constructor(public http: HttpClient){

  this.http.get('assets/en.json').subscribe(data => {
    this.searchData = data;
  });
}
  transform(items: any[], searchText:string): any[] {
  console.log('searchText :', searchText);
  console.log('items :', items);
    if (!items) return [];
    if (!searchText) return items;
    searchText = searchText.toLowerCase();
    return items.filter(item => {
      return item.toLowerCase().includes(searchText);
    });
  }

}
