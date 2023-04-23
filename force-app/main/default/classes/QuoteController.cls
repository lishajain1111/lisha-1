public with sharing class QuoteController {
    
    /*
    *Input QuoteDTO - DTO object contains Id of the record
    *Output QuoteDTO - details about quote record which will be passed to LWC.
    */
    @AuraEnabled
    public static QuoteDto getQuote(QuoteDto quotedto){

        try{
            Id recordId;
            if(quotedto == null || String.isBlank(quotedto.Id)){
                throw new AuraHandledException('Request parameter missing');
            }
            
            //Used With Security_Enforced as Schema class is heavy and it can take upto 1-2 sec to run which causes performance degradation.
            //With secuirty enforced if user doesnt have access, he will get the exception hence there is exception handling.
            List<Quote__c> quotes = [SELECT Id, StartDate__c,EndDate__c,Name,TotalQuotedAmount__c FROM Quote__c Where Id =:quotedto.Id WITH SECURITY_ENFORCED];
            QuoteDto qdto = null;
            if(!quotes.isEmpty()){
                qdto = new QuoteDto(quotes[0]);
            }
            return qdto;

        }catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
        
    }
    /*
    *Input QuoteDTO - contains data of quote record which needs to be saved
    *output String - Success/Error
    */
    @AuraEnabled
    public static String saveQuote(QuoteDto quotedto){
        try{
            if(quotedto == null || String.isBlank(quotedto.Id)){
                throw new AuraHandledException('Quote data missing');
            }
            system.debug(quotedto);
            Quote__c quote = new Quote__c(Id = quotedto.Id);
            quote.StartDate__c = quotedto.startDate;
            quote.EndDate__c = quotedto.endDate;
            //this method will remove the records if user doesnt have update access to fields/object.
            SObjectAccessDecision decision = Security.stripInaccessible(AccessType.UPDATABLE, new List<Quote__c>{quote}, true);
            if(!decision.getRecords().isEmpty())
                update decision.getRecords();
            return 'Success';
        }
        catch(Exception e){
            throw new AuraHandledException(e.getMessage());
        }
    }
}