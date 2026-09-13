import axios from "axios";
import Swal from "sweetalert2";
import type { User } from "../types/User";
import type { UserFormData } from "../types/UserFormData";
import { useEffect, useState, type ChangeEvent } from "react";
import type { userToEditType } from "../types/Props";

export const useUsers = () => {
    const API_URL = "https://api.escuelajs.co/api/v1/users";
    const DEFAULT_FORM = {
        name: "",
        email: "",
        password: "",
        avatar: "https://placehold.co/600x400/6c63ff/fff?text=Avatar",
    };

    const [users, setUsers] = useState<User[]>([]);
    const [formData, setFormData] = useState<UserFormData>(DEFAULT_FORM);
    const [userToEdit, setUserToEdit] = useState<userToEditType>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [activeSection, setActiveSection] = useState<"list" | "form">("list");

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get<User[]>(API_URL);
            setUsers(res.data);
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se cargaron los usuarios",
                background: "#1a1d27",
                color: "#f1f2f6",
                confirmButtonColor: "#6c63ff"
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const resetForm = (): void => {
        setFormData(DEFAULT_FORM);
        setUserToEdit(null);
    };

    const goToNewUser = (): void => {
        resetForm();
        setActiveSection("form");
    };

    const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);

        try {
            if (userToEdit) {
                //PUT
                const payload: Partial<UserFormData> = {
                    name: formData.name,
                    avatar: formData.avatar,
                };

                if (formData.password) {
                    payload.password = formData.password;
                }

                const res = await axios.put<User>(`${API_URL}/${userToEdit.id}`, payload);
                setUsers((prev) => prev.map((u) => (u.id === userToEdit.id ? res.data : u)));
                Swal.fire({
                    icon: "success",
                    title: "Actualizado!",
                    text: "El usuario fue actualizado correctamente.",
                    background: "#1a1d27",
                    color: "#f1f2f6",
                    confirmButtonColor: "#6c63ff"
                });
            } else {
                // POST
                const res = await axios.post<User>(API_URL, formData);
                setUsers((prev) => [res.data, ...prev]);
                Swal.fire({
                    icon: "success",
                    title: "Creado!",
                    text: "Nuevo usuario agregado correctamente.",
                    background: "#1a1d27",
                    color: "#f1f2f6",
                    confirmButtonColor: "#6c63ff"
                });
            }

            resetForm();
            setActiveSection("list");
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo guardar el usuario",
                background: "#1a1d27",
                color: "#f1f2f6",
                confirmButtonColor: "#6c63ff"
            });
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (user: User): void => {
        setUserToEdit(user);
        setFormData({
            name: user.name,
            email: user.email,
            password: user.password,
            avatar: user.avatar,
        });
        setActiveSection("form");
        window.scrollTo({ top: 0, behavior: "smooth"})
    };

    const handleDelete = async (id: number): Promise<void> => {
        const result = await Swal.fire({
            icon: "warning",
            title: "Eliminar Usuario?",
            text: "Esta acción no se puede deshacer.",
            showCancelButton: true,
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
            background: "#1a1d27",
            color: "#f1f2f6",
            confirmButtonColor: "#ef4444"
        });

        if (!result.isConfirmed) return;

        setLoading(true);

        try {
            await axios.delete(`${API_URL}/${id}`);
            setUsers((prev) => prev.filter((u) => u.id !== id));

            Swal.fire({
                icon: "success",
                title: "Eliminado!",
                text: "El usuario fue eliminado.",
                background: "#1a1d27",
                color: "#f1f2f6",
                confirmButtonColor: "#6c63ff"
            });
        } catch (error) {
            Swal.fire({
                icon: "error",
                title: "Error",
                text: "No se pudo eliminar el usuario",
                background: "#1a1d27",
                color: "#f1f2f6",
                confirmButtonColor: "#6c63ff"
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        users,
        formData,
        setFormData,
        userToEdit,
        setUserToEdit,
        loading,
        activeSection,
        setActiveSection,
        fetchUsers,
        handleInputChange,
        handleSubmit,
        handleEdit,
        handleDelete,
        goToNewUser,
    }
};