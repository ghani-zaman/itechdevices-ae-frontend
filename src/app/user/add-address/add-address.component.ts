import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CscService } from 'src/app/services/csc.service';
import { MyToastService } from 'src/app/services/my-toast.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.sass']
})
export class AddAddressComponent implements OnInit {
  addressForm: UntypedFormGroup;
  addressFormCreated = false;
  savingaddress = false;
  countriesList = [];
  stateList = [];
  cityList = [];
  editFlag = false;
  id = null;
  constructor(
    private userService: UserService,
    private toast: MyToastService,
    private router: Router,
    private builder: UntypedFormBuilder,
    private arouter: ActivatedRoute,
    private csc: CscService
  ) {
    const idd  = this.arouter.snapshot.params.id;
    if (idd) {
      this.id = idd;
      this.editFlag = true;
    }

  }

  async ngOnInit(): Promise<void> {
    this.countriesList = await this.csc.getCountriesList();
    if(this.id === null){
      this.createForm();
    }else {
      const address = await this.userService.getUserAddressById(this.id);
      if(address) {
        this.createForm(address)
      }
    }

  }

  async createForm(data: any = {}): Promise<any> {
    await this.getStates(data.country ? data.country : 'AE');
    if (data.state) {
      await this.getCities(data.state);
    }
    this.addressForm = this.builder.group({
      first_name: [data.first_name? data.first_name : null, [Validators.required]],
      last_name: [data.last_name? data.last_name : null, [Validators.required]],
      phone: [data.phone? data.phone : null, [Validators.required]],
      company_name: [data.company_name? data.company_name : null, []],
      email: [data.email? data.email : null, [Validators.required, Validators.email]],
      street_address1: [data.street_address1? data.street_address1 : null, [Validators.required]],
      city: [data.city? data.city : null, []],
      state: [data.state? data.state : null, [Validators.required]],
      country: [data.country? data.country : 'AE', [Validators.required]],
      zip: [data.zip? data.zip : null, [Validators.required]],
      address_type: [data.address_type? data.address_type : null, [Validators.required]],
      is_default: [data.is_default? data.is_default : false, [Validators.required]],
    });
    this.getStates(data.country ?? 'US')
    if(this.editFlag) {
      this.addressForm.addControl('address_id', new UntypedFormControl(this.id));
    }
    this.addressFormCreated = true;
  }

  async getStates($event): Promise<any> {
    try{
      if(this.addressFormCreated){
      this.addressForm.controls.state.setValue(null);
      this.addressForm.controls.city.setValue(null);
      }
      this.stateList = [];
      this.cityList = [];
      // console.log('country',this.countriesList);
      const country = this.countriesList.filter(c => c.iso2 === $event);
      // this.stateList = await this.csc.getStateList(country[0]?.iso2);
      if(country[0]?.iso2 ==='CA' || country[0]?.iso2 ==='US'){
        const state = this.addressForm.get('state');
        state.clearValidators();
        state.setValidators([Validators.required]);
        state.updateValueAndValidity();
       this.stateList = await this.csc.getStateList(country[0]?.iso2);
      }else{
        const state = this.addressForm.get('state');
        state.setValue(null)
        state.clearValidators();
        state.setValidators([]);
        state.updateValueAndValidity();
      }
    } catch (e){
      // console.log(e);
      this.stateList = [];
      this.cityList = [];
    }

  }


  async getCities($event): Promise<void> {
    return;
    try{
      if(this.addressFormCreated){
      this.addressForm.controls.city.setValue(null);
      }
      this.cityList = [];
      this.cityList = await this.csc.getCityList($event);
    } catch (e){
      this.cityList = [];
    }
  }

  async submitForm(form): Promise<any> {
    if (form.invalid) {
      return false;
    }
    try{
      this.savingaddress = true;

      const address = await this.userService.saveUserAddress(form.value);
      if(address){
      this.router.navigate(['/user/address']);
      this.toast.success('Address saved successfully');
      }
      this.savingaddress = false;
    } catch (err) {
      this.savingaddress = false;
    }

  }

}
