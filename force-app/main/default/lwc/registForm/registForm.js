import { LightningElement, track } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';

export default class RegistForm extends LightningElement {
    @track userId;
    @track username;
    @track ailas;
    @track canreset = false;

    handleSuccess(event) {
        this.userId = event.detail.id;
        this.canreset = true;
    }

    handleEmailChange(event){
        const username = event.detail.value.split('@');
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