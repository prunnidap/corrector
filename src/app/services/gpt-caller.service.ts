import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, from, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GptCallerService {
  private apiUrl = 'https://api.openai.com/v1/chat/completions';
  private apiKey = 'sk-proj-763cFcULYhBeQEs7YMJ4T3BlbkFJIwaKz5vyFhQVeJLVXYFv'; // Remplacez par votre clé API OpenAI
  private maxTokens = 4096; // La limite de tokens pour GPT-3.5

  constructor(private http: HttpClient) { }

  checkSpelling(text: string): Observable<string[]> {
    const prePrompt = 'Correct the following text for spelling errors and provide the corrections in the format "<error>: <correction>" only. Do not rewrite the entire text.';

    const textChunks = this.splitTextIntoChunks(text, this.maxTokens - prePrompt.length);

    const correctionPromises = textChunks.map(chunk =>
      this.callGptApi(prePrompt + chunk).toPromise()
    );

    return from(Promise.all(correctionPromises).then(responses => {
      return responses.flatMap(response => this.extractCorrections(response));
    }));
  }

  private splitTextIntoChunks(text: string, maxChunkSize: number): string[] {
    const chunks = [];
    let currentChunk = '';

    for (const word of text.split(' ')) {
      if (currentChunk.length + word.length + 1 > maxChunkSize) {
        chunks.push(currentChunk);
        currentChunk = word;
      } else {
        currentChunk += (currentChunk ? ' ' : '') + word;
      }
    }

    if (currentChunk) {
      chunks.push(currentChunk);
    }

    return chunks;
  }

  private callGptApi(prompt: string): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.apiKey}`
    });

    const body = {
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    };

    return this.http.post<any>(this.apiUrl, body, { headers });
  }

  private extractCorrections(response: any): string[] {
    const text = response.choices[0].message.content.trim();
    return text.split('\n').map((line: string) => line.trim());
  }

  // Mock function to replace the real callGptApi
  private mockGptApiResponse(prompt: string): Observable<any> {
    console.log("hello");
    const mockResponse = {
      choices: [
        {
          message: {
            content: 'mocked error: mocked correction\nanother error: another correction'
          }
        }
      ]
    };
    return of(mockResponse);
  }
}
