import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { Meta, Title } from '@angular/platform-browser';
import { SEOService } from 'src/app/services/seo.service';
import { ConfirmDialogComponent } from 'src/app/components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.sass']
})
export class AddressComponent implements OnInit {
  addresses = [];
  addressloading = false;
  removing = -1;
  deleteid = -1;
  constructor(
    private userService: UserService,
    private modalService: NgxSmartModalService,
    private title: Title,
    private meta: Meta,
    private seo: SEOService
  ) { }

  ngOnInit(): void {
    this.getMyAddress();
    const seoTitle = 'Address | Itech Devices'
    this.title.setTitle(seoTitle);
    this.meta.updateTag({ name: 'description', content: 'Update and manage your address & shipping details with Itech Devices user friendly dashboard.' });
    this.meta.updateTag({ property: 'og:title', content: seoTitle });
    this.seo.createCanonicalURL();
this.seo.logZendeskEvent();
    // NOTE YOU CAN ADD MORE META TAGS USING THE ABOVE CODE
  }

  async getMyAddress(): Promise<any> {
    try {
      this.addressloading = true;
      this.addresses = await this.userService.getAllUserAddresses();
      this.addressloading = false;

    } catch (err) {
      this.addresses = [];
      this.addressloading = false;
    }
  }
  deleteAddress(id): void {
    this.deleteid = id;
    const modal = this.modalService.getModal('confirmModal').open();
    modal.onAnyCloseEvent.subscribe(data => {
      const confirm = data.getData();
      // console.log(this.deleteid);
      if (confirm?.confirm && confirm.confirm === 'true' && this.deleteid != -1) {
        // console.log(this.deleteid);

        this.deleteAddressx(id);
        this.deleteid = -1;
      }
    });


  }
  async deleteAddressx(id): Promise<void> {
    // if (this.removing === id) { return ; }
    try {
      this.removing = id;
      const deleted = await this.userService.deleleUserAddress(id);
      if (deleted) {
        this.getMyAddress();
      }
      this.removing = -1;
    } catch (err) {
      this.removing = -1;
    }
  }

}
