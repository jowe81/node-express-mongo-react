export default {
    collectionName: 'users_global',
    fields: [
        {
            label: "Account Type",
            key: "accountType",
            type: "string",
        },
        {
            label: "Email",
            key: "email",
            required: true,
            unique: true,
            type: "string",
        },
        {
            label: "Database Name",
            key: "userDbName",            
        },
        {
            label: "User Record ID",
            key: "userRecordId",
        }
    ],
}