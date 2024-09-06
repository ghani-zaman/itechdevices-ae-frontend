
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { WebsiteService } from 'src/app/services/website.service';

@Component({
  selector: 'app-jsonld',
  templateUrl: './jsonld.component.html',
  styleUrls: ['./jsonld.component.css'],
  standalone: true,
  host: {ngSkipHydration: 'true'},
  imports: [CommonModule]
})



export class JsonldComponent implements OnInit {
  @Input() product: any = null;
  @Input() condition: any = null;
  jsonLD: SafeHtml;
  jsonLD1: SafeHtml;
  loading: any = null;
  constructor(private sanitizer: DomSanitizer, private websiteService: WebsiteService) {}
  async ngOnInit(): Promise<void> {
    this.loading = true;
    const model = this.product?.attributes.filter(attribute => attribute.attribute_id === 3);
    const gtin = this.product?.attributes.filter(attribute => attribute.attribute_id === 41);
    // console.log('model', model);
    let modelData = '';
    if (model.length > 0) {
      modelData = model[0].attribute_value;
    }else  {
      modelData = this.product.sku
    }
    let gtindata = '';
    if (gtin.length > 0) {
      gtindata = gtin[0].attribute_value;
    }
    let sku = this.product.id;
    if(this.product.magento_product_id != null) {
      sku = this.product.magento_product_id
    }
    const website = await this.websiteService.getWebiteInfo().toPromise();

    const json: any = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: this.product?.title,
      // item: this.product?.title,
      model: modelData,
      gtin: gtindata,
      image: (this.product?.images.length > 0) ? this.product?.images[0].image : 'assets/images/no-image.webp',
      description: this.product?.description,
      brand: {
        '@type': 'Brand',
        name: this.product?.brand_name
      },
      // availability: (this.product?.is_in_stock) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      sku: sku,
      mpn: this.product?.sku,
      url:  'https://' + website.data.name + '/' + this.product.url,
      // priceCurrency: 'AED',
      "hasMerchantReturnPolicy": {
        "@type": "MerchantReturnPolicy",
        "applicableCountry": "AED",
        "returnPolicyCategory": "https://itechdevices.ae/return_policy",
        "merchantReturnDays": 30,
        "returnMethod": "https://schema.org/ReturnByMail",
        "returnShippingFeesAmount": "25%"
      },

      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
        ratingCount: '5'
      }
    };
    if (this.product[this.condition] > 0) {
         // json.price = this.product[this.condition];
          /*json.offers = {
            '@type': 'AggregateOffer',
            url:  'https://' + website.data.name + '/' + this.product.url,
            priceCurrency: 'AED',
            lowPrice: this.product[this.condition],
            highPrice: this.product[this.condition]
          };*/
          json.offers =  {
              '@type': 'Offer',
              availability: (this.product?.is_in_stock) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
              price: this.product[this.condition],
              itemCondition: "https://schema.org/Refurbished",
              priceCurrency: 'AED',
              "shippingDetails": {
                "@type": "OfferShippingDetails",
                "shippingRate": {
                  "@type": "MonetaryAmount",
                  "value": 3.49,
                  "currency": "AED"
                },
                "shippingDestination": {
                  "@type": "DefinedRegion",
                  "addressCountry": "US"
                },
                "deliveryTime": {
                  "@type": "ShippingDeliveryTime",
                  "handlingTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 0,
                    "maxValue": 1,
                    "unitCode": "DAY"
                  },
                  "transitTime": {
                    "@type": "QuantitativeValue",
                    "minValue": 1,
                    "maxValue": 5,
                    "unitCode": "DAY"
                  }
                }
              }
          };
    }

    this.jsonLD = this.getSafeHTML(json);

    const json1 = {
      "@context": "https://schema.org",
      "@type": "Product",
      sku: sku,
      mpn: this.product?.sku,
      url:  'https://' + website.data.name + '/' + this.product.url,
      name: this.product?.title,
      image: (this.product?.images.length > 0) ? this.product?.images[0].image : 'assets/images/no-image.webp',
      description: this.product?.description,
      brand: {
        '@type': 'Brand',
        name: this.product?.brand_name
      },

      "offers": [
        {
          "@type": "Offer",
          availability: (this.product?.is_in_stock) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          price: this.product[this.condition],
          priceCurrency: 'AED',
          "seller": {
            "@type": "Organization",
            "name": "Itech Devices"
          },
          mpn: this.product?.sku,
          url:  'https://' + website.data.name + '/' + this.product.url,
        }
      ],

      "aggregateRating": [],
      "review": [],

      "manufacturer": {
        "@type": "Organization",
        name: this.product?.brand_name
      }
    }
    this.jsonLD1 = this.getSafeHTML(json1);
    this.loading = false;
  }


  getSafeHTML(value: {}): any {
    // If value convert to JSON and escape / to prevent script tag in JSON
    const json = value
      ? JSON.stringify(value, null, 2) // .replace(/\//g, '\\/')
      : '';
    const html = `<script type="application/ld+json">
    ${json}</script>`;

    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
