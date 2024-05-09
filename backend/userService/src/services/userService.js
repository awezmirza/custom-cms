import UserRepository from "../repository/userRepository.js";
import { JWT_SECRET_KEY } from "../config/index.js";
import jwt from "jsonwebtoken";
import { customError } from "../errors/errorUtils/index.js";
import {
    compareBcryptHash,
    hashUsingBcrypt
} from "../utils/index.js";

class UserService {
    constructor() {
        this.userRepository = new UserRepository();
    }

    async signup(data) {
        // Hashing the password
        data.password = hashUsingBcrypt(data.password);
        const user = await this.userRepository.create(data);
        return user;
    }

    async login(email, plainPass) {

        const user = await this.userRepository.getOneByData({ email });
        if (!user) {
            throw new customError(400, "No user found");
        }
        if (!user.password) {
            throw new customError(400, "Passwords don't match");
        }
        const checkPass = this.checkPassword(plainPass, user.password);
        if (!checkPass) {
            throw new customError(400, "Wrong Password");
        }
        const token = this.createToken({
            id: user.id,
            email: user.email
        });
        return token;
    }

    async updateProfile(specifierData, data) {
        // Hashing the password
        if (data.password) {
            data.password = hashUsingBcrypt(data.password);
        }
        const user = await this.userRepository.update(specifierData, data);
        if (!user) {
            throw new customError(400, "No user found!");
        }
    }

    // UserId and email as data in the token
    createToken(data) {
        const token = jwt.sign({ data }, JWT_SECRET_KEY, {
            expiresIn: "7d"
        });
        return token;
    }

    verifyToken(token) {
        const data = jwt.verify(token, JWT_SECRET_KEY);
        return data;
    }

    checkPassword(userInputPass, encryptedPass) {
        return compareBcryptHash(userInputPass, encryptedPass);
    }

    async checkIfEmailExist(email) {
        const user = await this.userRepository.getOneByData({
            email
        });
        if (user) {
            return true;
        }
        return false;
    }

    async handleGoogleUser(name, picture, email) {
        // Check if user is already registered or not by email
        // If not reg, sign up user
        // create a token and return the token
        let user = await this.userRepository.getOneByData({ email });
        if (!user) {
            user = await this.signup({
                email,
                name,
                avatar: picture,
                isGoogleLogin: true
            });
        }

        const token = this.createToken({
            id: user._id,
            email: user.email
        });
        return token;
    }

    async getUserDetails(
        data,
        fields = "name location _id username totalFriends isPublic"
    ) {
        const user = await this.userRepository.getOneByData(data, fields);
        if (!user) {
            throw new customError(400, "No user found");
        }
        return user;
    }
}

export default UserService;
