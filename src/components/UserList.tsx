import type { UserListProps } from "../types/Props"

const SkeletonCard = () => (
  <div className="rounded-xl overflow-hidden bg-gray-800 animate-pulse">
    <div className="h-40 bg-gray-700" />
    <div className="p-3 space-y-2">
      <div className="h-3 bg-gray-700 rounded w-1/2" />
      <div className="h-3 bg-gray-700 rounded w-3/4" />
      <div className="h-3 bg-gray-700 rounded w-2/3" />
      <div className="flex gap-2 pt-1">
        <div className="h-7 bg-gray-700 rounded flex-1" />
        <div className="h-7 bg-gray-700 rounded flex-1" />
      </div>
    </div>
  </div>
)

const UserList = ({ users, handleEdit, handleDelete, loading }: UserListProps) => {

  if (loading && users.length === 0) {
    return (
      <>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-4 bg-violet-500 rounded-full" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">👥 Usuarios registrados</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {Array.from({ length: 8 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      </>
    )
  }

  if (!loading && users.length === 0) {
    return (
      <>
        <div className="flex items-center gap-2 mb-5">
          <div className="w-1 h-4 bg-violet-500 rounded-full" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">👥 Usuarios registrados</span>
        </div>
        <div className="text-center py-16 text-gray-600">
          <div className="text-5xl mb-3">🗂️</div>
          <p className="text-sm">No hay usuarios todavía. ¡Agrega el primero!</p>
        </div>
      </>
    )
  }

  return (
    <>
      {/* Header con contador */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <div className="w-1 h-4 bg-violet-500 rounded-full" />
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest">👥 Usuarios registrados</span>
        </div>
        <span className="text-xs text-gray-500 bg-gray-800 px-3 py-1 rounded-full">
          {users.length} {users.length === 1 ? "usuario" : "usuarios"}
        </span>
      </div>

      {/* Grid de tarjetas */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-gray-800 border border-white/10 rounded-xl overflow-hidden hover:border-violet-500/40 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/40 transition-all duration-200"
          >
            {/* Avatar */}
            <div className="relative h-40 overflow-hidden bg-gray-700">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://placehold.co/600x400/1f2937/4b5563?text=Sin+imagen"
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-800 to-transparent" />
            </div>

            {/* Body */}
            <div className="p-3">
              {/* Badges */}
              <div className="flex items-center gap-1.5 mb-2">
                <span className="text-xs font-bold text-violet-400 bg-violet-500/15 px-2 py-0.5 rounded">
                  ID #{user.id}
                </span>
                <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded
                  ${user.role === "admin"
                    ? "bg-amber-500/15 text-amber-400"
                    : "bg-green-500/10 text-green-400"}`}
                >
                  {user.role}
                </span>
              </div>

              <p className="text-sm font-bold text-white truncate mb-0.5">{user.name}</p>
              <p className="text-xs text-gray-500 truncate mb-3">{user.email}</p>

              {/* Acciones */}
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(user)}
                  className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-violet-500/15 text-violet-400 hover:bg-violet-500/25 transition-colors cursor-pointer"
                >
                  ✏️ Editar
                </button>
                <button
                  onClick={() => handleDelete(user.id)}
                  className="flex-1 py-1.5 text-xs font-semibold rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors cursor-pointer"
                >
                  🗑 Eliminar
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default UserList