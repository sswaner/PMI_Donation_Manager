from pydantic import BaseModel
from typing import Optional
from enum import Enum

class SegmentEnum(str, Enum):
    retail = "Retail"
    energy = "Energy"

class AccountTypeEnum(str, Enum):
    corporation = "Corporation"
    governmental_department = "Governmental Department"
    aid_agency = "Aid Agency"
    grant_foundation = "Grant Foundation"
    retail_fundraising = "Retail (3rd Party Fundraising)"

class AccountSizeEnum(str, Enum):
    small = "Small"
    medium = "Medium"
    large = "Large"

class NewAccount(BaseModel):
    OrganizationName: str
    AccountType: AccountTypeEnum
    AccountSize: AccountSizeEnum
    GivingPotential: float
    AccountLocation: str
    AccountChannel: str
    Segment: SegmentEnum = "Retail"  # Default value
    PriorDonations: float
    AccountManagerID: Optional[int] = None
    RecordCreatedBy: Optional[int] = None
    ExternalSystemID: Optional[str] = None
    Notes: Optional[str] 
    
class Account(BaseModel):
    AccountID: Optional[int] = None
    OrganizationName: str
    AccountType: AccountTypeEnum
    AccountSize: AccountSizeEnum
    GivingPotential: float
    AccountLocation: str
    AccountChannel: str
    Segment: SegmentEnum = "Retail"  # Default value
    PriorDonations: float
    AccountManagerID: Optional[int] = None
    RecordCreatedBy: Optional[int] = None
    RecordLastModifiedBy: Optional[int] = None
    CreatedTimestamp: Optional[str] = None  # Assuming ISO formatted string for timestamp
    ModifiedTimestamp: Optional[str] = None  # Assuming ISO formatted string for timestamp
    ExternalSystemID: Optional[str] = None
    Notes: Optional[str] 
    
