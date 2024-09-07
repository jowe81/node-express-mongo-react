import { Schema } from "mongoose";
import bcrypt from "bcryptjs";

async function buildSchemaFromFormDefinition(formDefinition = {}) {
    // Construct blueprint
    const blueprint = {};

    const fields = formDefinition.fields;
    if (Array.isArray(fields)) {
        fields.forEach(field => {                        
            const mongooseField = {
                type: getMongoTypeFromField(field),
                required: !!field.required,
                unique: !!field.unique,
            };

            // Type is the only required property.
            if (mongooseField.type) {
                blueprint[field.key] = mongooseField;
            }
        });
    }
    
    // Assemble options
    const options = {
        timestamps: true,
    };

    if (formDefinition.collectionName) {
        options.collection = formDefinition.collectionName;
    }

    const schema = new Schema(blueprint, options);

    // See if there are password fields; add password handling.
    const passwordFields = fields.filter(field => field.type === 'password');
    if (passwordFields.length) {
        schema.pre("save", async function (next) {
            // "this" refers to the new document here.
            for (const passwordField of passwordFields) {
                const key = passwordField.key;

                if (this.isModified(key)) {
                    const salt = await bcrypt.genSalt(10);
                    this[key] = await bcrypt.hash(this[key], salt);
                }
            };
            next();
        });

        schema.methods.matchPassword = async function (enteredPassword, passwordFieldKey = null) {
            // If no fieldkey was passed, use the first password field in the definition.
            if (passwordFieldKey === null) {
                passwordFieldKey = passwordFields[0].key;
            }
            console.log(enteredPassword, passwordFieldKey, this.password, this[passwordFieldKey])
            return await bcrypt.compare(enteredPassword, this[passwordFieldKey] ?? "");
        };    
        
    }

    return schema;
}

function getMongoTypeFromField(field = {}) {
    switch (field.type) {
        case "string":
        case "text":
        case "textarea":            
        case "password":
            return String;
        
        case "number":
        case "integer":        
            return Number;

        case "boolean":
            return Boolean;
    }

    return undefined;
}

export { buildSchemaFromFormDefinition }