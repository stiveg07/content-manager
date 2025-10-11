import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Folder } from "../../interfaces/folder.interface";
import { NgClass } from "@angular/common";
import { RemoveExtensionPipe } from "../../pipe/remove-extension.pipe";

@Component({
	selector: "app-category-item",
	standalone: true,
	imports: [NgClass, RemoveExtensionPipe],
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

	getFileExtension(fileName: string): string | null {
		const parts = fileName.split(".");

		// Si no hay un punto en el nombre del archivo o el nombre es un único fragmento, devolvemos null
		if (parts.length <= 1) {
			return null;
		}

		// Si el primer fragmento tiene un punto (es decir, no es una extensión válida), devolvemos null
		const extension = parts.pop();
		return extension ? extension : null;
	}

	getIconForExtension(extension: string | null): string {
		if (!extension) {
			return "file"; // Default icon for files without extension
		}

		return `<span class="badge text-bg-light border border-dark">${extension.toLowerCase()}</span>`;
		// if (["png", "jpg", "jpeg", "svg", "gif"].includes(extension.toLowerCase())) {
		// 	return '<span class="badge bg-light">image</span>';
		// } else if (["html", "htm"].includes(extension.toLowerCase())) {
		// 	return '<span class="badge bg-light">'{extension.toLowerCase()}'</span>';
		// } else if (["pdf"].includes(extension.toLowerCase())) {
		// 	return "picture_as_pdf";
		// } else if (["doc", "docx"].includes(extension.toLowerCase())) {
		// 	return "description";
		// } else if (["xls", "xlsx"].includes(extension.toLowerCase())) {
		// 	return "grid_on";
		// } else if (["ppt", "pptx"].includes(extension.toLowerCase())) {
		// 	return "slideshow";
		// } else if (["md"].includes(extension.toLowerCase())) {
		// 	return "markdown";
		// } else {
		// 	return "";
		// }
	}

	toggle(ev: MouseEvent) {
		// ev.stopPropagation();
		// this.item.expanded = !this.item.expanded;
		ev.stopPropagation();
		ev.preventDefault();

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