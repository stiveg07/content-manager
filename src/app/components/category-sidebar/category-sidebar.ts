import { Component, computed, EventEmitter, Input, OnChanges, OnInit, Output, signal, SimpleChanges } from "@angular/core";
import { Folder } from "../../interfaces/folder.interface";
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { CategoryItem } from "../category-item/category-item";

@Component({
	selector: "app-category-sidebar",
	imports: [FormsModule, CommonModule, CategoryItem],
	templateUrl: "./category-sidebar.html",
	styleUrl: "./category-sidebar.css",
})
export class CategorySidebar implements OnChanges {
	
	@Output() categorySelected = new EventEmitter<Folder>();
	@Input() categories!: Folder[];

	all = signal<Folder[]>(structuredClone(this.categories));
	query = signal<string>("");

	filtered = computed<Folder[]>(() => {
		const queryFormatted = this.query().trim().toLowerCase();
		if (!queryFormatted) return this.all();

		const filterNode = (node: Folder): Folder | null => {
			const name = node.name?.toLowerCase() ?? "";
			const selfHit = name.includes(queryFormatted);

			const filteredChildren = (node.children ?? []).map(filterNode).filter(Boolean) as Folder[];

			if (selfHit || filteredChildren.length > 0) {
				return {
					...node,
					expanded: true,
					children: filteredChildren,
				};
			}
			return null;
		};

		return this.all().map(filterNode).filter(Boolean) as Folder[];
	});


	ngOnChanges(changes: SimpleChanges): void {
		if (changes['categories'] && this.categories) {
			this.all.set(structuredClone(this.categories));
		}
	}

	onInput(value: string) {
		this.query.set((value ?? "").trim());
	}

	onSelect(cat: Folder) {
		this.categorySelected.emit(cat);
	}

}
