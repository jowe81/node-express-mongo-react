export default {
    collectionName: "users_global",
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
            unique: false, // Email address here can have duplicates!
            type: "string",
        },
        {
            label: "Database Name",
            key: "userDbName",
            type: "string",
        },
        {
            label: "User Record ID",
            key: "userRecordId",
            // If there is not also a reference field, the 'reference' type will only assign
            // the type "ObjectId". It won't actually make the model reference another collection.
            // (This is the case here because some of the ids will be coming from other databases.)
            type: "reference",
        },
    ],
    indexes: [
        // Need unique across userDbName and email; this is done by creating an index across both.
        [{ userDbName: 1, email: 1}, {unique: true}]
    ],
};