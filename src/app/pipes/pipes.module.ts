import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HtmlSanitizerPipe } from './html-sanitizer.pipe';
import { CuttextPipe } from './cuttext.pipe';
import { KeysPipe } from './keys.pipe';
import { PriceConversionPipe } from './price-conversion.pipe';
import { GetcountryPipe } from './getcountry.pipe';
import { AddHtmlPipe } from './add-html.pipe';
import { TrimCatImagePipe } from './trim-cat-image.pipe';
import { StripHtmlPipe } from './strip-html.pipe';



@NgModule({
  declarations: [
    HtmlSanitizerPipe,
    CuttextPipe,
    KeysPipe,
    PriceConversionPipe,
    GetcountryPipe,
    AddHtmlPipe,
    TrimCatImagePipe,
    StripHtmlPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    HtmlSanitizerPipe,
    CuttextPipe,
    KeysPipe,
    PriceConversionPipe,
    GetcountryPipe,
    AddHtmlPipe,
    TrimCatImagePipe,
    StripHtmlPipe
  ]
})
export class PipesModule { }
