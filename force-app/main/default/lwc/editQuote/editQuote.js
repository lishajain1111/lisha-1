/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, track } from "lwc";
import getQuote from '@salesforce/apex/QuoteController.getQuote';
import saveQuote from '@salesforce/apex/QuoteController.saveQuote';

import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EditQuote extends LightningElement {
  @api recordId;
  @track quoteData = {};

  connectedCallback(){
    //this.getQuoteRecord();
    this.quoteData.Id = this.recordId;
    getQuote({ quotedto: this.quoteData })
        .then(result => {
            this.quoteData = result;
            console.log(this.quoteData);
        })
        .catch(error => {
          this.showToast('Error',error.message, 'error');
        });
  }

  saveQuoteRecord(event){
    saveQuote({ quotedto : this.quoteData})
    .then(result=>{
      this.showToast('Success','Saved Quote Details', 'success');
    }).catch(error =>{
      this.showToast('Error','Error Occured', 'error');
    });
  }

  handleDateChange(event){
    if(event.target.name=='startdate')
      this.quoteData.startDate = event.target.value;
    if(event.target.name == 'enddate')
      this.quoteData.endDate = event.target.value;
  }
  renderedCallback() {}

  showToast(title,message,variant) {
    const event = new ShowToastEvent({
        title: title,
        message: message,
        variant: variant,
        mode: 'dismissable'
    });
    this.dispatchEvent(event);
}
}
