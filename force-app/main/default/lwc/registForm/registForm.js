import { LightningElement, track } from 'lwc';

export default class RegistForm extends LightningElement {
    @track accountId;
    handleSuccess(event) {
       this.accountId = event.detail.id;
    }
}