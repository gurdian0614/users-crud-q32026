import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import type { User } from "./User";
import type { UserFormData } from "./UserFormData";

export type userToEditType = User | null;

export type UserFormProps = {
    formData: UserFormData;
    setFormData: Dispatch<SetStateAction<UserFormData>>;
    handleInputChange: (e: ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.SubmitEvent<HTMLFormElement>) => void;
    userToEdit: userToEditType;
    setUserToEdit: Dispatch<SetStateAction<userToEditType>>;
    loading: boolean;
};

export type UserListProps = {
    users: User[];
    handleEdit: (user: User) => void;
    handleDelete: (id: number) => void;
    loading: boolean;
};