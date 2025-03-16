import React from 'react'
import { Route, Routes, Navigate } from 'react-router-dom';
import Main from '../pages/Main.jsx';
import { allRoutes } from '../router/routes.js';

const AppRouter = () => {
  return (
    <Routes>
      {allRoutes.map(route =>
        <Route
          path={route.path}
          element={<route.component />}
          key={route.path}
        />
      )}

      {/* При неправильном адресе переводит на страницу с постами при помощи Navigate */}
      <Route path="error" element={<Main />} />
      <Route path="*" element={<Navigate to="/error" replace />} />
    </Routes>
  )
}

export default AppRouter
