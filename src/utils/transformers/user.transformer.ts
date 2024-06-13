import { User } from "../../interfaces/user.interface";

const handleUserData = (user: User): User => {
    return {
        id: user.id,
        display_name: user.display_name,
        external_urls: user.external_urls,
        followers: user.followers,
        href: user.href,
        images: user.images,
        type: user.type,
        uri: user.uri,
        email: user.email,
        explicit_content: user.explicit_content,        
    };
}

export { handleUserData };