/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";

export default class QuoteTotalSummary extends LightningElement {
    //custom event to call parent component so that parent component can handle creation of modal pop up
    adjustAmount(event){
        const selectEvent = new CustomEvent('showmodal', {
            detail: true
            });
            this.dispatchEvent(selectEvent);
    }
}
