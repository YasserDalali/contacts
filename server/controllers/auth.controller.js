const authSignIn = (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ message: "Email and password are required" });
    }

    // fill in the logic to check if the user exists in the database and if the password is correct
    // if not, return a 401 status code with an error message
    // if the user exists and the password is correct, return a success message and a token
    // for now, we will just return a success message

    res.send("test passed");
}
const authSignUp = (req, res) => {
    const { username, email, password } = req.body;
    if (!email || !password || !username) {
        return res.status(400).json({ message: "Email, username and password are required" });
    }
    // fill in the logic to check if the user already exists in the database
    // if the user already exists, return a 409 status code with an error message   
    // if the user does not exist, create a new user in the database and return a success message and a token
    // you can also use bcrypt to hash the password before saving it to the database
    // and use jsonwebtoken to create a token for the user
    // for now, we will just return a success message

    res.send("test passed");
}

export { authSignIn, authSignUp };