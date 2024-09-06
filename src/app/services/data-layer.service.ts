import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { WindowReferenceService } from './window-reference.service';
declare var gtag : any;

@Injectable({
    providedIn: 'root'
})
export class DataLayerService {
   private window;
   isBrowser = false;
   constructor (private _windowRef: WindowReferenceService, @Inject(PLATFORM_ID) private platformId,)
   {
      this.isBrowser = isPlatformBrowser(this.platformId);
      if(this.isBrowser) {
       this.window = _windowRef.nativeWindow; // intialise the window to what we get from our window service
      } else {
        this.window = [];
      }

   }

    private pingHome(obj)
    {
      if(this.isBrowser) {
        if(obj)  this.window.dataLayer.push(obj);
      }
    }

    /*trackEvent(value: any, transaction: any) {
      gtag('event', 'conversion', {
        'send_to': 'AW-962887714/sISWCPLZgK0ZEKKAkssD',
        'value': value,
        'currency': 'AED',
        'transaction_id': transaction
    });
    }*/


   //list of all our dataLayer methods

   logPageView(url)
   {
       const hit = {
           event: 'page-view',
           pageName: url
       };
       this.pingHome(hit);
   }

   logEvent(event,category,action,label)
   {
       const hit = {
           event:event,
           category:category,
           action:action,
           label: label
       }
        this.pingHome(hit);
   }

   logCustomDataEvent(data) {
    console.log('GaEvent', data);
    this.pingHome(data);
   }



   logCustomDimensionTest(value)
   {
       const hit = {
           event:'custom-dimension',
           value:value
       }
       this.pingHome(hit);
   }
   logRevenueEvent(value) {
    this.window.uetq.push('event', '', {"revenue_value":value,"currency":"AED"});
   }

   // .. add more custom methods as needed by your app.
}
