import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, catchError, from, map, switchMap, throwError } from 'rxjs';
import { Enrollment } from '../Models/api.models';
import { API_URL } from './api.config';

export interface DownloadedFile {
  blob: Blob;
  fileName: string;
}

/** Enrollments of the signed in participant. The API takes the participant from the token. */
@Injectable({ providedIn: 'root' })
export class EnrollmentsService {
  private readonly http = inject(HttpClient);

  mine(): Observable<Enrollment[]> {
    return this.http.get<Enrollment[]>(`${API_URL}/enrollments/mine`);
  }

  enroll(workshopId: string): Observable<Enrollment> {
    return this.http.post<Enrollment>(`${API_URL}/enrollments`, { workshopId });
  }

  cancel(enrollmentId: string): Observable<Enrollment> {
    return this.http.patch<Enrollment>(`${API_URL}/enrollments/${enrollmentId}/cancel`, null);
  }

  certificate(enrollmentId: string): Observable<DownloadedFile> {
    return this.http
      .get(`${API_URL}/enrollments/${enrollmentId}/certificate`, { observe: 'response', responseType: 'blob' })
      .pipe(
        map((response) => ({ blob: response.body!, fileName: fileNameOf(response, enrollmentId) })),
        catchError((error: unknown) => from(withJsonBody(error)).pipe(switchMap((parsed) => throwError(() => parsed))))
      );
  }
}

/** File name sent by the API in Content-Disposition, or a reasonable default. */
export function fileNameOf(response: HttpResponse<Blob>, enrollmentId: string): string {
  const disposition = response.headers.get('Content-Disposition') ?? '';
  const match = /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i.exec(disposition);
  const name = match?.[1] ?? match?.[2];
  return name ? decodeURIComponent(name) : `certificate-${enrollmentId}.pdf`;
}

/** With responseType 'blob' the ProblemDetails of an error also arrives as a Blob: it is read back as JSON. */
async function withJsonBody(error: unknown): Promise<unknown> {
  if (!(error instanceof HttpErrorResponse) || !(error.error instanceof Blob)) {
    return error;
  }

  try {
    const body: unknown = JSON.parse(await error.error.text());
    return new HttpErrorResponse({
      error: body,
      headers: error.headers,
      status: error.status,
      statusText: error.statusText,
      url: error.url ?? undefined
    });
  } catch {
    return error;
  }
}

/** Saves a blob through a temporary link, the way browsers download files. */
export function saveFile(file: DownloadedFile): void {
  const url = URL.createObjectURL(file.blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = file.fileName;
  link.click();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}
