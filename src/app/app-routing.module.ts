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

    {
        path: 'admin',
        loadChildren: () =>
            import('./admin/adminRoutes').then(m => m.adminRoutes)
    },

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