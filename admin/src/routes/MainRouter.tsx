import { Route, Routes, Navigate } from 'react-router-dom';
import Tags from '@admin/pages/TagsAndAllergenes/Tags';
import Home from '@admin/pages/Home/Home';
import { MenuPage } from '@admin/pages/Menu/MenuPage';
import NotFound from '@admin/pages/Page_404/NotFound';
import { MenuDishPage } from '@admin/pages/Menu/components/MenuDish/MenuDishPage';
import { CategoryPage } from '@admin/pages/Menu/components/MenuCategories/CategoryPage';

export const MainRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/tags" element={<Tags />} />
      <Route path="/menu/:menuId" element={<MenuPage />} />
      <Route path="/menu/:menuId/category/:categoryId" element={<CategoryPage />} />
      <Route
        path="/menu/:menuId/category/:categoryId/create-dish"
        element={<MenuDishPage />}
      />
      <Route
        path="/menu/:menuId/category/:categoryId/dish/:dishId"
        element={<MenuDishPage />}
      />
      <Route path="/not-found" element={<NotFound />} />
      <Route path="*" element={<Navigate replace to="/not-found" />} />
    </Routes>
  );
};
