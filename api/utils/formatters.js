// utils/formatters.js

exports.formatDonationResponse = (donation) => ({
    DonationID: donation.DonationID || null,
    AccountID: donation.AccountID || null,
    ContactID: donation.ContactID || null,
    CampaignID: donation.CampaignID || null,
    Amount: donation.Amount || 0.00,
    Currency: donation.Currency || 'IDR',
    DonationDate: donation.DonationDate || null,
    DonationStatus: donation.DonationStatus || 'Solicited',
    DonationSource: donation.DonationSource || null,
    Designation: donation.Designation || null,
    Notes: donation.Notes || null,
    InKind: donation.InKind ? Boolean(donation.InKind) : false,
    PendingAmount: donation.PendingAmount || null,
    AccountManagerID: donation.AccountManagerID || null,
    CreatedTimestamp: donation.CreatedTimestamp || null,
    ModifiedTimestamp: donation.ModifiedTimestamp || null,
    ExternalSystemID: donation.ExternalSystemID || null,
});

// utils/formatters.js

exports.formatAccountResponse = (account) => ({
    AccountID: account.AccountID || null,
    OrganizationName: account.OrganizationName || '',
    AccountType: account.AccountType || 'Corporation', // Defaulting to a valid enum value
    AccountSize: account.AccountSize || 'Small', // Defaulting to a valid enum value
    GivingPotential: account.GivingPotential || 0.00, // Default to 0 if null
    AccountLocation: account.AccountLocation || '',
    AccountChannel: account.AccountChannel || '',
    Segment: account.Segment || 'Retail', // Default to 'Retail' if null
    PriorDonations: account.PriorDonations || 0.00, // Default to 0 if null
    AccountManagerID: account.AccountManagerID || null,
    RecordCreatedBy: account.RecordCreatedBy || null,
    RecordLastModifiedBy: account.RecordLastModifiedBy || null,
    CreatedTimestamp: account.CreatedTimestamp || null, // Assuming this field should always be present
    ModifiedTimestamp: account.ModifiedTimestamp || null, // Assuming this field should always be present
    ExternalSystemID: account.ExternalSystemID || null,
    Notes: account.Notes || '',
});

// utils/formatters.js

exports.formatContactResponse = (contact) => ({
    ContactID: contact.ContactID || null,
    FirstName: contact.FirstName || '',
    LastName: contact.LastName || '',
    OfficialEmailAddress: contact.OfficialEmailAddress || null,
    PersonalEmailAddress: contact.PersonalEmailAddress || null,
    OfficialPhoneNumber: contact.OfficialPhoneNumber || null,
    PersonalPhoneNumber: contact.PersonalPhoneNumber || null,
    Role: contact.Role || '',
    AssociatedAccount: contact.AssociatedAccount || null,
    ContactChannel: contact.ContactChannel || '',
    IsActive: contact.IsActive ? Boolean(contact.IsActive) : false,
    LastContactDate: contact.LastContactDate || null,
    PreferredLanguage: contact.PreferredLanguage || 'English',
    DoNotContact: contact.DoNotContact ? Boolean(contact.DoNotContact) : false,
    RecordCreatedBy: contact.RecordCreatedBy || null,
    RecordLastModifiedBy: contact.RecordLastModifiedBy || null,
    CreatedTimestamp: contact.CreatedTimestamp || null,
    ModifiedTimestamp: contact.ModifiedTimestamp || null,
    ExternalSystemID: contact.ExternalSystemID || null,
    Notes: contact.Notes || ''
});