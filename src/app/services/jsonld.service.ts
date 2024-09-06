import { Injectable } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { environment } from 'src/environments/environment';
import { WebsiteService } from './website.service';

@Injectable({
  providedIn: 'root',
})
export class JsonldService {
  constructor(
    private sanitizer: DomSanitizer,
    private websiteService: WebsiteService
  ) {}
  async productJson1(product, condition): Promise<void> {
    const model = product.attributes.filter(
      (attribute) => attribute.attribute_id === 3
    );
    const gtin = product.attributes.filter(
      (attribute) => attribute.attribute_id === 41
    );
    // console.log('model', model);
    let modelData = '';
    if (model.length > 0) {
      modelData = model[0].attribute_value;
    } else {
      modelData = product.sku;
    }
    let gtindata = '';
    if (gtin.length > 0) {
      gtindata = gtin[0].attribute_value;
    }
    let sku = product.id;
    if (product.magento_product_id != null) {
      sku = product.magento_product_id;
    }
    const website = await this.websiteService.getWebiteInfo().toPromise();

    const json1: any = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      sku: sku,
      mpn: product.sku,
      url: 'https://' + website.data.name + '/' + product.url,
      name: product.title,
      image:
        product.images.length > 0
          ? product.images[0].image
          : 'assets/images/no-image.webp',
      description:
        product.description &&
        product.description != null &&
        product.description != ''
          ? product.description
          : product.short_description,
      brand: {
        '@type': 'Brand',
        name: product.brand_name,
      },

      aggregateRating: [],
      review: [],

      manufacturer: {
        '@type': 'Organization',
        name: product.brand_name,
      },
    };
    if (product[condition] > 0) {
      json1.offers = [
        {
          '@type': 'Offer',
          availability: product.is_in_stock
            ? 'https://schema.org/InStock'
            : 'https://schema.org/OutOfStock',
          price: product[condition],
          priceCurrency: 'AED',
          seller: {
            '@type': 'Organization',
            name: 'Itech Devices',
          },
          mpn: product.sku,
          url: 'https://' + website.data.name + '/' + product.url,
        },
      ];
    }
    const jsonLD1 = this.getSafeHTML(json1);
    return jsonLD1;
  }
  async productJson2(product, condition): Promise<void> {
    const model = product.attributes.filter(
      (attribute) => attribute.attribute_id === 3
    );
    const gtin = product.attributes.filter(
      (attribute) => attribute.attribute_id === 41
    );
    // console.log('model', model);
    let modelData = '';
    if (model.length > 0) {
      modelData = model[0].attribute_value;
    } else {
      modelData = product.sku;
    }
    let gtindata = '';
    if (gtin.length > 0) {
      gtindata = gtin[0].attribute_value;
    }
    let sku = product.id;
    if (product.magento_product_id != null) {
      sku = product.magento_product_id;
    }
    const website = await this.websiteService.getWebiteInfo().toPromise();

    const json: any = {
      '@context': 'https://schema.org/',
      '@type': 'Product',
      name: product.title,
      // item: product.title,
      model: modelData,
      image:
        product.images.length > 0
          ? product.images[0].image
          : 'assets/images/no-image.webp',
      description:
        product.description &&
        product.description != null &&
        product.description != ''
          ? product.description
          : product.short_description,
      brand: {
        '@type': 'Brand',
        name: product.brand_name,
      },
      // availability: (product.is_in_stock) ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      sku: sku,
      mpn: product.sku,
      url: 'https://' + website.data.name + '/' + product.url,
      // priceCurrency: 'AED',
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'AED',
        returnPolicyCategory: 'https://itechdevices.ae/return_policy',
        merchantReturnDays: 30,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnShippingFeesAmount: '25%',
      },
      /*aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '5',
        bestRating: '5',
        worstRating: '1',
        ratingCount: '5'
      }*/
    };
    if(gtindata != '') {
      json.gtin = gtindata;
    }
    /*const ratingData: any = await this.websiteService.getShopperApprovedReviews();
    // console.log('dd', ratingData)
    if(ratingData) {
      json.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: (ratingData?.siteinfo.average_rating)? ""+ratingData.siteinfo.average_rating : "4.7",
        reviewCount: ratingData?.siteinfo.total_reviews,
        bestRating: '5',
        worstRating: '1',
        ratingCount: '5'
      }
    } else {
      json.aggregateRating =  [];
    }*/
    const pcondition = product?.product_condition;
    /*const cond = product.attributes.filter(attribute=> attribute.attribute_id==7);
    let pcondition = null;
    if(cond && cond.length > 0){
      pcondition = cond[0].attribute_value;
    }*/
    if (product[condition] > 0) {
      // json.price = product[condition];
      /*json.offers = {
            '@type': 'AggregateOffer',
            url:  'https://' + website.data.name + '/' + product.url,
            priceCurrency: 'AED',
            lowPrice: product[condition],
            highPrice: product[condition]
          };*/
      json.offers = {
        '@type': 'Offer',
        availability: product.is_in_stock
          ? 'https://schema.org/InStock'
          : 'https://schema.org/OutOfStock',
        price: product[condition],
        itemCondition:
          pcondition != null
            ? pcondition === 'new' || pcondition == 'New'
              ? 'https://schema.org/NewCondition'
              : 'https://schema.org/RefurbishedCondition'
            : 'https://schema.org/RefurbishedCondition',
        priceCurrency: 'AED',
        shippingDetails: {
          '@type': 'OfferShippingDetails',
          shippingRate: {
            '@type': 'MonetaryAmount',
            value: 3.49,
            currency: 'AED ',
          },
          shippingDestination: {
            '@type': 'DefinedRegion',
            addressCountry: 'US',
          },
          deliveryTime: {
            '@type': 'ShippingDeliveryTime',
            handlingTime: {
              '@type': 'QuantitativeValue',
              minValue: 0,
              maxValue: 1,
              unitCode: 'DAY',
            },
            transitTime: {
              '@type': 'QuantitativeValue',
              minValue: 1,
              maxValue: 5,
              unitCode: 'DAY',
            },
          },
        },
      };
    }

    const jsonLD = this.getSafeHTML(json);
    return jsonLD;
  }
  getWebsiteJson() {
    const json = {
      '@context': 'https://schema.org/',
      '@type': 'WebSite',
      name: 'Itech Devices',
      url: 'https://itechdevices.ae/',
      potentialAction: {
        '@type': 'SearchAction',
        target:
          'https://itechdevices.ae/search/{search_term_string}',
        'query-input': 'required name=search_term_string',
      },
    };
    return this.getSafeHTML(json);
  }
  getWebsiteJson1() {
    const json = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      url: 'https://itechdevices.ae/',
      name: 'Itech Devices',
    };
    return this.getSafeHTML(json);
  }
  getOrgJson() {
    const json = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "url": "https://www.itechdevices.ae/",
      "name": "iTECH Devices",
      "logo": "https://www.itechdevices.ae/",
      "description": "Shop high-quality computer hardware online in UAE at iTechDevices.ae. Explore our wide range of products, including servers, storage, networking equipment, and more. Enjoy competitive prices and fast delivery across the UAE \r\n",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+971-5-54255786",
          "contactType": "sales"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+971-5-54255786",
          "contactType": "customer service",
          "email": "mailto:orders@itechdevices.ae",
          "contactOption": "TollFree",
          "areaServed": "UAE",
          "availableLanguage": "en"
        }
      ],
      "address": {
        "addressCountry": "United Arab Emirates",
        "postalCode": "186138",
        "addressRegion": "Dubai UAE",
        "addressLocality": "Metropolis Tower - Opp Bay Square",
        "streetAddress": "Office 1904"
      }
    };
    return this.getSafeHTML(json);
  }
  getOrgJson1() {
    const json = {
      "@context": "https://schema.org",
      "@type": "Organization",
      "url": "https://www.itechdevices.ae/",
      "name": "iTECH Devices",
      "logo": "https://www.itechdevices.ae/",
      "description": "Shop high-quality computer hardware online in UAE at iTechDevices.ae. Explore our wide range of products, including servers, storage, networking equipment, and more. Enjoy competitive prices and fast delivery across the UAE \r\n",
      "contactPoint": [
        {
          "@type": "ContactPoint",
          "telephone": "+971-5-54255786",
          "contactType": "sales"
        },
        {
          "@type": "ContactPoint",
          "telephone": "+971-5-54255786",
          "contactType": "customer service",
          "email": "mailto:orders@itechdevices.ae",
          "contactOption": "TollFree",
          "areaServed": "UAE",
          "availableLanguage": "en"
        }
      ],
      "address": {
        "addressCountry": "United Arab Emirates",
        "postalCode": "186138",
        "addressRegion": "Dubai UAE",
        "addressLocality": "Metropolis Tower - Opp Bay Square",
        "streetAddress": "Office 1904"
      }
    };
    return this.getSafeHTML(json);
  }
  getCategoryJson(category) {
    // console.log('json', category);
    const json = {
      '@context': 'https://schema.org/',
      '@type': 'ItemList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: category.title,
          url: environment.siteUrl + '/' + category.url, //"https://itechdevices.ae/01kp040-95097.html"
        },
      ],
    };
    return this.getSafeHTML(json);
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
