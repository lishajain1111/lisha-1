/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement,api } from "lwc";
import LightningModal from 'lightning/modal';

export default class AdjustQuotePrice extends LightningModal {
  adjustedAmountLabel = 'TotalQuotedAmount__c'; // API name of the field to be used in lightning input field 
  @api content; //it contains the record id since we have used LDS here

  saveRecord(event){
    this.template.querySelector('lightning-record-edit-form').submit();
    this.close('done');
  }

   handleClose() {
        this.close('done'); //this comes with lightningmodal class to close the modal pop up
    }
}