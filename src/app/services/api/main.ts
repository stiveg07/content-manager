import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { ApiResponse } from "../../data/response.data";

@Injectable({ providedIn: "root" })
export class MainService {
	private http = inject(HttpClient);

	constructor() { }
	baseUrl = "https://localhost:7164";

	getFolders(): Observable<ApiResponse> {
		return this.http.get<ApiResponse>(`${this.baseUrl}/content/tree`).pipe(
			catchError(error => {
				console.error('Error al obtener folders:', error);
				return of({
					isSuccess: false,
					result: [],
					statusCode: 500
				} as ApiResponse);
			})
		);
	}

}
