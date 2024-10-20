POST_Accounts = """Here is the Pydantic data model you must use:
class Account(BaseModel):
    AccountID: Optional[int] = None
    OrganizationName: str
    AccountType: AccountTypeEnum
    AccountSize: AccountSizeEnum
    GivingPotential: float = 0.00  # Changed to float to match the formatter
    AccountLocation: str
    AccountChannel: str
    Segment: SegmentEnum = "Retail"  # Default value
    PriorDonations: float = 0.00  # Changed to float to match the formatter
    AccountManagerID: Optional[int] = None
    RecordCreatedBy: Optional[int] = None
    RecordLastModifiedBy: Optional[int] = None
    CreatedTimestamp: Optional[str] = None  # Assuming ISO formatted string for timestamp
    ModifiedTimestamp: Optional[str] = None  # Assuming ISO formatted string for timestamp
    ExternalSystemID: Optional[str] = None
    Notes: Optional[str] = ''

This is used as the POST payload for an API for the Indonesian Red Cross to manage donations.  
An account is a usually a corporate donor.   Please fill this out with a realistic test record such as a real Indonesian corporation. 
Set the segment value to "Retail"
Set RecordCreatedBy, RecordLastModifiedBy, and AccountManagerID to 1

"""

