import React from 'react'

export const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-20">
    <div
      style={{ borderTopColor: 'transparent' }}
      className="w-8 h-8 border-4 border-blue-200 rounded-full animate-spin"
    ></div>
    <p className="ml-2">cargando...</p>
  </div>
  )
}
