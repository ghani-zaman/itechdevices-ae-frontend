import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UrlencoderService {
  constructor() {}

  encode(params, prefix): any {
    // tslint:disable-next-line:indent
    let items = [];

    // tslint:disable-next-line:forin
    for (let field in params) {
      const key = prefix ? prefix + '[' + field + ']' : field;
      const type = typeof params[field];

      switch (type) {
        case 'object':
          // handle arrays appropriately x[]=1&x[]=3
          if (Array.isArray(params[field])) {
            params[field].foreach((val) => {
              items.push(key + '[]=' + val);
            }, this);
          } else {
            // recusrively construct the sub-object
            items = items.concat(this.encode(params[field], key));
          }
          break;
        case 'function':
          break;
        default:
          items.push(key + '=' + escape(params[field]));
          break;
      }
    }

    return items.join('&');
  }

  decode(params): any {
    const obj = {};
    let parts = params.split('&');

    parts.each(function (kvs) {
      let kvp = kvs.split('=');
      let key = kvp[0];
      let val = unescape(kvp[1]);

      if (/\[\w+\]/.test(key)) {
        let rgx = /\[(\w+)\]/g;
        let top = /^([^\[]+)/.exec(key)[0];
        let sub = rgx.exec(key);

        if (!obj[top]) {
          obj[top] = {};
        }

        let unroot = function (o) {
          if (sub == null) {
            return;
          }

          let sub_key = sub[1];

          sub = rgx.exec(key);

          if (!o[sub_key]) {
            o[sub_key] = sub ? {} : val;
          }

          unroot(o[sub_key]);
        };

        unroot(obj[top]);

        //array
      } else if (/\[\]$/.test(key)) {
        key = /(^\w+)/.exec(key)[0];
        if (!obj[key]) {
          obj[key] = [];
        }
        obj[key].push(val);
      } else {
        obj[key] = val;
      }
    });

    return obj;
  }
}
