// assets/userTypes.js

// Class to represent user-defined types
class UserDefinedType {
    constructor(name, fields) {
        this.name = name;     // Name of the user-defined type
        this.fields = fields; // Array of fields that define the structure of the type
    }

    // Method to create an instance of the type with provided data
    createInstance(data) {
        const instance = {};

        // Iterate over each field to check if it's provided in the data
        for (const field of this.fields) {
            if (data[field.name] !== undefined) {
                instance[field.name] = data[field.name];
            } else {
                throw new Error(`Missing field: ${field.name} for type ${this.name}`);
            }
        }
        return instance;
    }
}

// Registry to hold user-defined types
const userTypeRegistry = {};

// Function to define a new user-defined type
function defineType(name, fields) {
    // Check if the type has already been defined
    if (userTypeRegistry[name]) {
        throw new Error(`Type ${name} is already defined.`);
    }
    
    // Create a new UserDefinedType and store it in the registry
    userTypeRegistry[name] = new UserDefinedType(name, fields);
}

// Function to get a user-defined type by name
function getType(name) {
    // Return the type from the registry or undefined if not found
    return userTypeRegistry[name];
}

// Export the defineType and getType functions
module.exports = {
    defineType,
    getType,
};
