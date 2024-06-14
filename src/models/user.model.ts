import { Document, Schema, model } from "mongoose";
import { User } from "../interfaces/user.interface";

interface IUserDocument extends Document,User {}

const UserSchema = new Schema<IUserDocument>({
    display_name: { type: String, required: true },
    external_urls: { type: Object, required: true },
    followers: { type: Object, required: true },
    href: { type: String, required: true },
    images: { type: Schema.Types.Mixed, required: true },
    type: { type: String, required: true },
    uri: { type: String, required: true },
    email: { type: String, required: true },
    explicit_content: { type: Object, required: true },
});

const UserModel = model<IUserDocument>('User', UserSchema);
export default UserModel;
