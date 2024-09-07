export default {
    collectionName: 'users',
    fields: [
        {
            label: "Email",
            key: "email",
            required: true,
            unique: true,
            type: "string",
        },
        {
            label: "Password",
            key: "password",
            required: true,
            type: "password",
        }
    ],
}