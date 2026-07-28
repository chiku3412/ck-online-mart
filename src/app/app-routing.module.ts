import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {path : '', redirectTo: '/home', pathMatch: 'full'},
    {
        path: 'home',
        loadComponent: () =>
            import('./home/home.component').then(m => m.HomeComponent)
    },
    {
        path: 'about',
        loadComponent: () =>
        import('./about/about.component').then(m => m.AboutComponent)
    },
    {
        path: 'contact',
        loadComponent: () =>
            import('./contact/contact.component').then(m => m.ContactComponent)
    },
    {
        path: 'blog',
        loadComponent: () =>
            import('./blogs/blogs.component').then(m => m.BlogsComponent)
    },
    {
        path: 'blog/:id',
        loadComponent: () =>
        import('./blog-details/blog-details.component').then(m => m.BlogDetailsComponent)
    },
    {
        path: 'cart',
        loadComponent: () =>
            import('./cart/cart.component').then(m => m.CartComponent)
    },
    {
        path: 'wishlist',
        loadComponent: () =>
        import('./wish-list/wish-list.component').then(m => m.WishListComponent)
    },
    {
        path: 'compare',
        loadComponent: () =>
        import('./compare/compare.component').then(m => m.CompareComponent)
    },
    {
        path: 'checkout',
        loadComponent: () =>
        import('./checkout/checkout.component').then(m => m.CheckoutComponent)
    },
    {
        path: 'login',
        loadComponent: () =>
            import('./login/login.component').then(m => m.LoginComponent)
    },
    {
        path: 'register',
        loadComponent: () =>
            import('./register/register.component').then(m => m.RegisterComponent)
    },
    {
        path: 'return-policy',
        loadComponent: () =>
            import('./policy/return-policy/return-policy.component').then(m => m.ReturnPolicyComponent)
    },
    {
        path: 'terms-condition',
        loadComponent: () =>
            import('./policy/terms-condition/terms-condition.component').then(m => m.TermsConditionComponent)
    },
    {
        path: 'privacy-policy',
        loadComponent: () =>
            import('./policy/privacy-policy/privacy-policy.component').then(m => m.PrivacyPolicyComponent)
    },
    { path: 'shop', loadChildren: () => import('./shop/shopRoutes').then(m => m.shopRoutes) },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
