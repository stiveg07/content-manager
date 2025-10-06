import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Folder } from "../../interfaces/folder.interface";
import { NgClass} from "@angular/common";
import { RemoveExtensionPipe } from "../../pipe/remove-extension.pipe";

@Component({
	selector: "app-category-item",
	standalone: true,
	imports: [NgClass,RemoveExtensionPipe],
	templateUrl: "./category-item.html",
	styleUrl: "./category-item.css",
})
export class CategoryItem {
	@Input() item!: Folder;
	@Input() level = 0;
	@Output() select = new EventEmitter<Folder>();

	toggleExpand(e: MouseEvent) {
		this.item.expanded = !this.item.expanded;
		this.select.emit(this.item);
	}

	onSelect() {
		this.select.emit(this.item);
	}

	get hasChildren(): boolean {
		return Array.isArray(this.item.children) && this.item.children.length > 0;
	}

	onRowClick(e: MouseEvent) {
		e.stopPropagation();
		e.preventDefault(); 

		if (this.item.link && !this.hasChildren) {
			this.select.emit(this.item); 
			return;
		}
		if (this.hasChildren) {
			this.item.expanded = !this.item.expanded;
			return;
		}
		this.select.emit(this.item);
	}
}
