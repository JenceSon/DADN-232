import bcrypt from "bcrypt"

export default async function hashPassword(pw) {
    try {
        const saltRounds = 10
        const salt = await bcrypt.genSalt(saltRounds);
        const hashCode = await bcrypt.hash(pw, saltRounds);
        return hashCode;
    } catch (e) {
        throw e;
    }
}

export async function checkPassword(pw, hash) {
    try {
        const rs = await bcrypt.compare(pw, hash);
        return rs;
    }
    catch (e) {
        throw e;
    }
}