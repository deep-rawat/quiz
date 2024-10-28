import { LightningElement, wire, track } from 'lwc';
import getQuestionAnswers from '@salesforce/apex/ExamQAViewerController.getQuestionAnswers';
export default class ExamQAViewer extends LightningElement {
    @track questions;
    @track error;
    @track isShowAnswers = false;
    @wire (getQuestionAnswers)
	wiredAccounts({data, error}){
        console.log('data : ',data);
        console.log('error : ',error);
		if(data) {
			this.questions = data;

			this.error = undefined;
		} else {
			this.questions = undefined;
			this.error = error;
		}
	}

    handleToggleChange(event) {
        this.isShowAnswers = event.target.checked;
    }
}