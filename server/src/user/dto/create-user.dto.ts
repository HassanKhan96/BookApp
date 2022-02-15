export class CreateUserDto {
    email: string;
    name: string;
    image: string | null;
    roles: string[]
}
