export interface Folder {
  id: string;
  name: string;
  icon?: string;           
  count: number;          
  expanded?: boolean;   
  link?: string;    
  children?: Folder[];
}
