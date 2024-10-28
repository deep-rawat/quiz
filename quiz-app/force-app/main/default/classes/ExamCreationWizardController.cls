public class ExamCreationWizardController {
	@AuraEnabled(cacheable=true)
    public static List<Exam__c> getExamList() {
        return [SELECT Id, Description__c, Name, LastModifiedDate, (SELECT Id FROM Questions__r) FROM Exam__c];
    }
}