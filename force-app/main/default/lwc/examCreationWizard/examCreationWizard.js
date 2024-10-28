import { LightningElement, wire } from 'lwc';
import getExamList from '@salesforce/apex/ExamCreationWizardController.getExamList';
export default class ExamCreationWizard extends LightningElement {

    examList;
    error;

    @wire(getExamList)
    wiredAccounts({ data, error }) {
        if (data) {
            const tempList = [];
            data?.forEach((item) => {
                tempList.push({
                    examName: item?.Name,
                    examId: item?.Id,
                    lastModifiedDate: new Date(item?.LastModifiedDate).getTime(),
                    totalQuestions: item?.Questions__r?.length || 0
                });
            });
            console.log('OUTPUT : ',tempList);
            this.examList = tempList;
            error = undefined;
        } else {
            data = undefined
            this.error = error;
        }
    }
}