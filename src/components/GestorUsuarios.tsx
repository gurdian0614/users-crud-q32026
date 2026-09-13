import { useUsers } from "../hooks/useUser"
import UserForm from "./UserForm"
import UserList from "./UserList"

const GestorUsuarios = () => {
  const {
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
  } = useUsers()

  return (
    <div className="flex min-h-screen">

      {/* ── Sidebar ── */}
      <aside className="w-64 bg-gray-900 border-r border-white/10 p-6 flex flex-col gap-2 sticky top-0 h-screen">

        {/* Logo */}
        <div className="flex items-center gap-3 pb-6 border-b border-white/10 mb-2">
          <div className="w-2.5 h-2.5 rounded-full bg-violet-500 shadow-[0_0_10px_#7c3aed]" />
          <div>
            <span className="block text-sm font-bold text-white">User Manager</span>
            <span className="text-xs text-gray-500">Platzi Fake Store API</span>
          </div>
        </div>

        {/* Nav */}
        <button
          onClick={() => setActiveSection("list")}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer
            ${activeSection === "list"
              ? "bg-violet-500/20 text-violet-400"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
        >
          <span>👥</span> Lista de usuarios
        </button>

        <button
          onClick={goToNewUser}
          className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors text-left cursor-pointer
            ${activeSection === "form" && !userToEdit
              ? "bg-violet-500/20 text-violet-400"
              : "text-gray-400 hover:bg-gray-800 hover:text-white"}`}
        >
          <span>➕</span> Nuevo usuario
        </button>

        <button
          onClick={fetchUsers}
          className="flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors text-left cursor-pointer"
        >
          <span>🔄</span> Recargar datos
        </button>

        {/* Footer */}
        <div className="mt-auto pt-4 border-t border-white/10 text-xs text-gray-600 leading-relaxed">
          Programación Web I<br />
          Q2 · 2026
        </div>
      </aside>

      {/* ── Main ── */}
      <main className="flex-1 p-10 overflow-y-auto">

        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {activeSection === "form"
                ? userToEdit ? "Editar usuario" : "Nuevo usuario"
                : "Usuarios"}
            </h1>
            <p className="text-sm text-gray-400 mt-1">
              {activeSection === "form"
                ? "Completa el formulario y guarda los cambios."
                : "Gestiona los usuarios registrados en la API."}
            </p>
          </div>
          {activeSection === "list" && (
            <button
              onClick={goToNewUser}
              className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-violet-500/20 cursor-pointer"
            >
              ➕ Nuevo usuario
            </button>
          )}
        </div>

        {/* Stats */}
        {activeSection === "list" && (
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="bg-gray-900 border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-violet-500/20 flex items-center justify-center text-lg">👥</div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Total usuarios</div>
                <div className="text-2xl font-bold text-white">{users.length}</div>
              </div>
            </div>
            <div className="bg-gray-900 border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center text-lg">🛡️</div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Admins</div>
                <div className="text-2xl font-bold text-white">
                  {users.filter((u) => u.role === "admin").length}
                </div>
              </div>
            </div>
            <div className="bg-gray-900 border border-white/10 rounded-xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center text-lg">🔗</div>
              <div>
                <div className="text-xs text-gray-500 uppercase tracking-wide mb-0.5">Endpoint</div>
                <div className="text-xs text-gray-300 font-mono">escuelajs.co/api/v1</div>
              </div>
            </div>
          </div>
        )}

        {/* Sections */}
        {activeSection === "form" ? (
          <UserForm
            formData={formData}
            setFormData={setFormData}
            handleInputChange={handleInputChange}
            handleSubmit={handleSubmit}
            userToEdit={userToEdit}
            setUserToEdit={setUserToEdit}
            loading={loading}
          />
        ) : (
          <div className="bg-gray-900 border border-white/10 rounded-2xl p-6">
            <UserList
              users={users}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
              loading={loading}
            />
          </div>
        )}
      </main>
    </div>
  )
}

export default GestorUsuarios