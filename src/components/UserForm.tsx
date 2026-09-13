import type { UserFormProps } from "../types/Props"

const DEFAULT_AVATAR = "https://placehold.co/600x400/6c63ff/fff?text=Avatar"

const UserForm = ({
  formData,
  setFormData,
  handleInputChange,
  handleSubmit,
  userToEdit,
  setUserToEdit,
  loading,
}: UserFormProps) => {

  const handleCancel = () => {
    setUserToEdit(null)
    setFormData({ name: "", email: "", password: "", avatar: DEFAULT_AVATAR })
  }

  return (
    <div className="bg-gray-900 border border-white/10 rounded-2xl p-7">

      {/* Panel title */}
      <div className="flex items-center gap-2 mb-6">
        <div className="w-1 h-4 bg-violet-500 rounded-full" />
        <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
          {userToEdit ? "✏️ Editar usuario" : "➕ Nuevo usuario"}
        </span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* Nombre */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Nombre completo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="bg-gray-950 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              placeholder="Ej. Ana García"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Correo electrónico
              {userToEdit && <span className="text-gray-600 ml-1 normal-case font-normal">(no editable)</span>}
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="bg-gray-950 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              placeholder="correo@ejemplo.com"
              required
              disabled={!!userToEdit}
            />
          </div>

          {/* Contraseña */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              Contraseña
              {userToEdit && <span className="text-gray-600 ml-1 normal-case font-normal">(vacío = sin cambio)</span>}
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="bg-gray-950 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              placeholder={userToEdit ? "••••••••" : "Mínimo 4 caracteres"}
              required={!userToEdit}
            />
          </div>

          {/* Avatar */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wide">
              URL del avatar
            </label>
            <input
              type="url"
              name="avatar"
              value={formData.avatar}
              onChange={handleInputChange}
              className="bg-gray-950 border border-white/10 rounded-lg px-3.5 py-2.5 text-sm text-white placeholder-gray-600 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 transition-all"
              placeholder="https://..."
              required
            />
          </div>

        </div>

        {/* Preview avatar */}
        {formData.avatar && (
          <div className="flex items-center gap-3 mt-4">
            <img
              src={formData.avatar}
              alt="Vista previa"
              className="w-12 h-12 rounded-lg object-cover border border-white/10"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "https://placehold.co/48x48/1f2937/4b5563?text=?"
              }}
            />
            <span className="text-xs text-gray-500">Vista previa del avatar</span>
          </div>
        )}

        {/* Acciones */}
        <div className="flex items-center gap-3 mt-6">
          <button
            type="submit"
            disabled={loading}
            className="flex items-center gap-2 px-5 py-2.5 bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-lg shadow-violet-500/20 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          >
            {loading ? "⏳ Procesando..." : userToEdit ? "💾 Actualizar usuario" : "✅ Guardar usuario"}
          </button>
          {userToEdit && (
            <button
              type="button"
              onClick={handleCancel}
              className="px-5 py-2.5 bg-gray-800 hover:bg-gray-700 text-gray-300 text-sm font-semibold rounded-lg transition-colors cursor-pointer"
            >
              ✕ Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default UserForm