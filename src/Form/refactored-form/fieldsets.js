const validateEmail = ({ email }) => {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!regex.test(email)) throw 'email format is not correct!'
}

const validatePasswords = ({ password, confirmation }) => {
    if (password !== confirmation) throw 'passwords do not match!'
}

const validateUsername = ({ username }) => {
    if (!isNaN(username)) { throw 'username cannot be a number' }
}


const fieldsets = [
    {
        name: "username",
        inputs: [{ name: 'username', type: 'text', placeholder: "username" }],
        validator: validateUsername
    },

    {
        name: "email",
        inputs: [{ name: 'email', type: 'text', placeholder: "email" }],
        validator: validateEmail
    },

    {
        name: "passwords",
        validator: validatePasswords,
        inputs: [
            { name: 'password', type: 'password', placeholder: "password" },
            { name: 'confirmation', type: 'password', placeholder: "password confirmation" }
        ],
    },

]

export default fieldsets