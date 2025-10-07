import { Component, inject, OnDestroy, OnInit, signal } from "@angular/core";
import { Header } from "./components/header/header";
import { CategorySidebar } from "./components/category-sidebar/category-sidebar";
import { MainContent } from "./components/main-content/main-content";
import { Folder } from "./interfaces/folder.interface";
import { MainService } from "./services/api/main";
import { Subscription } from "rxjs";

@Component({
	selector: "app-root",
	imports: [Header, CategorySidebar, MainContent],
	templateUrl: "./app.html",
	styleUrl: "./app.css",
})
export class App implements OnInit, OnDestroy {
	protected readonly title = signal("bizagi-app");
	private service = inject(MainService);
	private sub!: Subscription;

	categories: Folder[] | null = null;
	isLoading = true;
	active?: Folder;

	ngOnInit(): void {
		this.sub = this.service.getFolders().subscribe({
			next: data => {
				if (data.isSuccess && data.statusCode === 200) {
					this.categories = data.result;
					this.isLoading = false;
				}
			},
			error: () => {
				this.isLoading = false;
			},
		});
	}

	ngOnDestroy(): void {
		if (this.sub) {
			this.sub.unsubscribe();
		}
	}
}