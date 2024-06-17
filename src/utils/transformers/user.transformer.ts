import { User } from "../../interfaces/user.interface";

/**
 * Transforms user data by selecting specific properties.
 * @param user - The user object to be transformed.
 * @returns The transformed user object.
 */
const handleUserData = (user: User): User => {
    return {
        // id: user.id,
        display_name: user.display_name,
        external_urls: user.external_urls,
        followers: user.followers,
        href: user.href,
        images: user.images,
        type: user.type,
        uri: user.uri,
        email: user.email,
        explicit_content: user.explicit_content,
        access_token: user.access_token ,        
    };
}

export { handleUserData };