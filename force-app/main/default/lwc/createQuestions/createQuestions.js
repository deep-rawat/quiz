import { LightningElement, track, api } from 'lwc';
import createQuestions from '@salesforce/apex/CreateQuestionsController.createQuestions';
export default class CreateQuestions extends LightningElement {
    @track examId;
    @track questionList = [];
    handleRecordPickerChange(event) {
        this.examId = event?.detail?.selectedRecord?.Id;
    }

    handleAddQuestionClick() {
        this.questionList = [{
            questionText: '',
            id: Math.random(),
            choices: [
                {
                    choiceId: Math.random(),
                    choice: '',
                    isCorrect: false
                }
            ]
        },...this.questionList];
    }

    handleAddChoice(event) {
        let tempList = [...this.questionList];
        let choices = [{
            id: Math.random(),
            choice: '',
            isCorrect: false
        }, ...tempList[event?.target?.dataset?.questionIdx].choices];
        tempList[event?.target?.dataset?.questionIdx].choices = choices;
        this.questionList = tempList;
    }

    handleQuestionChange(event) {
        let tempList = [...this.questionList];
        tempList[event?.target?.dataset?.questionIdx].questionText = event?.target?.value;
        this.questionList = tempList;
    }

    handleChoiceChange(event) {
        let tempList = [...this.questionList];
        tempList[event?.target?.dataset?.questionIdx].choices[event?.target?.dataset?.choiceIdx].choice = event?.target?.value;
        this.questionList = tempList;
    }

    handleCheckBoxChange(event) {
        const questionIdx = event.target.dataset.questionIdx;
        const choiceIdx = event.target.dataset.choiceIdx;
        const isChecked = event.target.checked;

        // Clone the question object you're modifying
        let updatedQuestion = {
            ...this.questionList[questionIdx],
            choices: [...this.questionList[questionIdx].choices]
        };

        // Reset all choices to isCorrect = false
        updatedQuestion.choices.forEach((choice) => {
            choice.isCorrect = false;
        });

        // Set the specific choice to isCorrect based on the checkbox
        updatedQuestion.choices[choiceIdx].isCorrect = isChecked;

        // Update the questionList by replacing the modified question
        this.questionList = [
            ...this.questionList.slice(0, questionIdx),
            updatedQuestion,
            ...this.questionList.slice(questionIdx + 1)
        ];
    }

    handleSave() {

        try {
            console.log('OUTPUT : ',{ questionData: {
                examId: this.examId, questions: this.questionList
            } });
            createQuestions({ questionData: {
                examId: this.examId, questions: this.questionList
            } });
            // this.error = undefined;
        } catch (error) {
            // this.error = error;
            // this.contacts = undefined;
        }
    }
}