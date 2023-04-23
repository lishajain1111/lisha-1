/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";
import  adjustQuotePrice from 'c/adjustQuotePrice';

export default class EditQuotePage extends LightningElement {
  @api recordId;

  async showModalDialog(event){
    //this comes with lightning modal class which allows us to open modal dynamically. 
    //we can event generalise this but due to time constraint i am keeping this specific to quote.
    const result = await adjustQuotePrice.open({
      size: 'small',
      description: 'Adjust quote amount',
      content: this.recordId,
      headerText: 'Adjust quote price'
    });

    console.log(result);
  }
}
