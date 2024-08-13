import { Component } from '@angular/core';
import { GptCallerService } from '../services/gpt-caller.service';


@Component({
  selector: 'app-text-corrector',
  templateUrl: './text-corrector.component.html',
  styleUrls: ['./text-corrector.component.scss']
})
export class TextCorrectorComponent {
  longText: string = '';
  corrections: { error: string, suggestion: string }[] = [];
  loading: boolean = false;

  constructor(private gptService: GptCallerService) { }

  onSubmit() {
    this.loading = true;
    this.gptService.checkSpelling(this.longText).subscribe(
      (correctionResponses: string[]) => {
        this.corrections = correctionResponses.map(correction => {
          const [error, suggestion] = correction.split(':').map(str => str.trim());
          return { error, suggestion };

        });
        this.loading = false;
      },
      error => {
        console.error('Erreur lors de la correction orthographique', error);
        this.loading = false;
      }
    );
  }
}


