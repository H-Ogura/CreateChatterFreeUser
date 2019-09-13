import { LightningElement, track, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import chatterProfileId from '@salesforce/apex/registFormController.chatterProfileId';

export default class RegistForm extends LightningElement {
    @track userId;
    @track username;
    @track ailas;
    @track canreset = false;
    @track chatterid;

    @wire(chatterProfileId)
    getchatterId(data){
        this.chatterid = data;
    } 

    handleSuccess(event) {
        this.userId = event.detail.id;
        this.canreset = true;
    }

    handleEmailChange(event){
        let username = event.detail.value.split('@');
        this.ailas = username[0];
        this.username = username[0] + '@sf.fsi.co.jp';
    }

    navigateToWebPage() {
        this[NavigationMixin.Navigate]({
            "type": "standard__webPage",
            "attributes": {
                "url": "https://login.salesforce.com/secur/forgotpassword.jsp?locale=jp&un=" + this.username
            }
        });
    }
}