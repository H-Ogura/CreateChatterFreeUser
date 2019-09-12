import { LightningElement, track } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class RegistForm extends LightningElement {
    @track userId;
    @track username;
    handleSuccess(event) {
       this.userId = event.detail.id;
       this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: event.detail.apiName + ' created.',
                variant: 'success',
            }),
        );
    }

    handleEmailChange(event){
        const username = event.detail.value.split('@');
        this.username = username[0] + '@sf.fsi.co.jp';
    }
}