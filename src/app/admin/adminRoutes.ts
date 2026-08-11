import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
    {
        path: '',
        loadComponent: () => import('./admin.component').then(m => m.AdminComponent),

        children: [

            {
                path: '',
                redirectTo: 'dashboard',
                pathMatch: 'full'
            },

            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./dashboard/dashboard.component').then(m => m.DashboardComponent)
            },

            {
                path: 'products',
                loadComponent: () =>
                    import('./product-list/product-list.component').then(m => m.ProductListComponent)
            },

            {
                path: 'products/add-product',
                loadComponent: () =>
                    import('./add-product/add-product.component').then(m => m.AddProductComponent)
            },

            {
                path: 'products/edit-product/:id',
                loadComponent: () =>
                    import('./add-product/add-product.component').then(m => m.AddProductComponent)
            },

            {
                path: 'categories',
                loadComponent: () =>
                    import('./category-list/category-list.component').then(m => m.CategoryListComponent)
            },

            {
                path: 'categories/add-category',
                loadComponent: () =>
                    import('./add-category/add-category.component').then(m => m.AddCategoryComponent)
            },

            {
                path: 'categories/edit-category/:id',
                loadComponent: () =>
                    import('./add-category/add-category.component').then(m => m.AddCategoryComponent)
            },

            {
                path: 'orders',
                loadComponent: () =>
                    import('./orders/orders.component').then(m => m.OrdersComponent)
            }

        ]
    },

    // Login outside admin layout
    {
        path: 'login',
        loadComponent: () =>
            import('./login/login.component').then(m => m.LoginComponent)
    }
];