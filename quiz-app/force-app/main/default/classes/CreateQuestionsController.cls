public class CreateQuestionsController {
    @AuraEnabled
    public static void createQuestions(Wrapper questionData) {
        System.debug('Received question data: ' + questionData);
        
        // Prepare lists to hold the question and choice records
        List<Question_Choice__c> choices = new List<Question_Choice__c>();
        List<Question__c> questions = new List<Question__c>();
        
        // Iterate over the questions and create Question__c objects
        for (Questions question : questionData.questions) {
            Question__c questionObj = new Question__c();
            questionObj.Is_Mandatory__c = true;
            questionObj.Marks__c = 1;
            questionObj.Question_Type__c = 'Single Choice';
            questionObj.Question_Text__c = question.questionText;
            questionObj.Exam__c = questionData.examId;
            
            // Add the question object to the list of questions
            questions.add(questionObj);
        }
        
        // Insert all the questions first to get their IDs
        if (!questions.isEmpty()) {
            insert questions;
            System.debug('Inserted Questions: ' + questions);
        }

        // Now that the questions have been inserted, we can create the choices linked to these questions
        for (Integer i = 0; i < questions.size(); i++) {
            Question__c insertedQuestion = questions[i];
            List<Choices> relatedChoices = questionData.questions[i].choices;
            
            for (Choices choice : relatedChoices) {
                Question_Choice__c questionChoice = new Question_Choice__c();
                questionChoice.Is_Correct__c = choice.isCorrect;
                questionChoice.Choice_Text__c = choice.choice;
                questionChoice.Question__c = insertedQuestion.Id; // Link the choice to the inserted question
                
                // Add the choice to the list
                choices.add(questionChoice);
            }
        }
        
        // Insert all choices after the questions
        if (!choices.isEmpty()) {
            insert choices;
            System.debug('Inserted Choices: ' + choices);
        }
    }
    
    // Wrapper class to hold question data
    public class Wrapper {
        @AuraEnabled public String examId { get; set; }
        @AuraEnabled public List<Questions> questions { get; set; }
    }

    // Class to hold question details
    public class Questions {
        @AuraEnabled public String questionText { get; set; }
        @AuraEnabled public List<Choices> choices { get; set; }
    }

    // Class to hold choice details
    public class Choices {
        @AuraEnabled public String choice { get; set; }
        @AuraEnabled public Boolean isCorrect { get; set; }
    }
}