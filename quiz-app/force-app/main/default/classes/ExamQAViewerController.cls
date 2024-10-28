public without sharing class ExamQAViewerController {
    @AuraEnabled(cacheable=true)
    public static List<Question__c> getQuestionAnswers() {
        //System.debug(ApexPages.currentPage().getParameters());
        List<Question__c> questionAnswersList = [SELECT Id, Question_Text__c, 
                                                 		(SELECT Id, Choice_Text__c, Is_Correct__c 
                                                         FROM Question_Choices__r ORDER BY CreatedDate) 
                                                 FROM Question__c WHERE Exam__c = 'a01dM000023uneQQAQ' ORDER BY CreatedDate ];
        return questionAnswersList; 
    }
}