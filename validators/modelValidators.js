
const modelValidators = {
    haveSpace(value){
        if (value.includes(" ")){
            throw new Error("Invalid value for field 'username'. cannot contain spaces.")
        }
    },

    minRequiredLength(length=3){
        return (value) => {
            if (!value.length || value.length < length){
                throw new Error(`Content length is too short. minimum of ${length} character required`);
            }
    
        }
    }
}

module.exports = modelValidators;