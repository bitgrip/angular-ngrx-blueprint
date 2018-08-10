import { TranslateLoader } from '@ngx-translate/core';
import { Observable, from } from 'rxjs';

// see also https://github.com/ngx-translate/http-loader/issues/47

export class WebpackTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return from(import(`../../../assets/i18n/${lang}.json`));
  }
}
