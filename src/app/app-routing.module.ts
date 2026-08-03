import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

    // Redirect
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },

    // ==========================
    // USER ROUTES
    // ==========================

    {
        path: 'home',
        loadComponent: () =>
            import('./user/home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'about',
        loadComponent: () =>
            import('./user/about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'contact',
        loadComponent: () =>
            import('./user/contact/contact.component').then(m => m.ContactComponent)
    },
    {
        path: 'blog',
        loadComponent: () =>
            import('./user/blogs/blogs.component').then(m => m.BlogsComponent)
    },
    {
        path: 'blog/:id',
        loadComponent: () =>
            import('./user/blog-details/blog-details.component').then(m => m.BlogDetailsComponent)
    },
    {
        path: 'cart',
        loadComponent: () =>
            import('./user/cart/cart.component').then(m => m.CartComponent)
    },
    {
        path: 'wishlist',
        loadComponent: () =>
            import('./user/wish-list/wish-list.component').then(m => m.WishListComponent)
    },
    {
        path: 'compare',
        loadComponent: () =>
            import('./user/compare/compare.component').then(m => m.CompareComponent)
    },
    {
        path: 'checkout',
        loadComponent: () =>
            import('./user/checkout/checkout.component').then(m => m.CheckoutComponent)
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./user/login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./user/register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'return-policy',
        loadComponent: () =>
            import('./user/policy/return-policy/return-policy.component').then(m => m.ReturnPolicyComponent)
    },
    {
        path: 'terms-condition',
        loadComponent: () =>
            import('./user/policy/terms-condition/terms-condition.component').then(m => m.TermsConditionComponent)
    },
    {
        path: 'privacy-policy',
        loadComponent: () =>
            import('./user/policy/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
    },

    {
        path: 'shop',
        loadChildren: () =>
            import('./user/shop/shopRoutes').then(m => m.shopRoutes)
    },

    // ==========================
    // ADMIN ROUTES
    // ==========================

    // {
    //     path: 'admin/login',
    //     loadComponent: () =>
    //         import('./admin/login/login.component').then(m => m.LoginComponent)
    // },

    // {
    //     path: 'admin/dashboard',
    //     loadComponent: () =>
    //         import('./admin/dashboard/dashboard.component').then(m => m.DashboardComponent)
    // },

    // {
    //     path: 'admin/products',
    //     loadComponent: () =>
    //         import('./admin/products/product-list/product-list.component').then(m => m.ProductListComponent)
    // },

    // {
    //     path: 'admin/products/add',
    //     loadComponent: () =>
    //         import('./admin/products/add-product/add-product.component').then(m => m.AddProductComponent)
    // },

    // {
    //     path: 'admin/products/edit/:id',
    //     loadComponent: () =>
    //         import('./admin/products/edit-product/edit-product.component').then(m => m.EditProductComponent)
    // },

    // {
    //     path: 'admin/categories',
    //     loadComponent: () =>
    //         import('./admin/categories/categories.component').then(m => m.CategoriesComponent)
    // },

    // {
    //     path: 'admin/orders',
    //     loadComponent: () =>
    //         import('./admin/orders/orders.component').then(m => m.OrdersComponent)
    // },

    // {
    //     path: 'admin/customers',
    //     loadComponent: () =>
    //         import('./admin/customers/customers.component').then(m => m.CustomersComponent)
    // },

    // {
    //     path: 'admin/users',
    //     loadComponent: () =>
    //         import('./admin/users/users.component').then(m => m.UsersComponent)
    // },

    // {
    //     path: 'admin/settings',
    //     loadComponent: () =>
    //         import('./admin/settings/settings.component').then(m => m.SettingsComponent)
    // },

    // ==========================
    // 404
    // ==========================

    {
        path: '**',
        redirectTo: 'home'
    }

];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }