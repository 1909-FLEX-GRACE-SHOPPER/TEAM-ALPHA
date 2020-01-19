### ALPHA GRACE SHOPPER

### COMPONENTS
1. Main - Ellie *** (don't do the grid, we will just put in a component for it)
2. Nav - Jake ***
3. Footer - Jake ***
4. Home Page (IGNORE)
5. List Grid (might be the same as 8)
6. Product Tile / Card - Svetlana ***
7. Product Page - Svetlana
8. Product listings grid (e.g. for all blue products)
9. Summary of Order - Johnson
10. Current Cart Items - Johnson
11. Address Form (will be reused a lot)
12. Guest Checkout - enter customer info (include link to sign in)
13. checkout payment / complete order
14. checkout success!
15. log in page (include link to register) - Jake
16. register page
17. User account page - Ellie

### Reducers
- single product - Svetlana
- all products - Jake
- cart (really cart items) - Johnson
- single user - Ellie
- all users - Ellie
- authentication


### Other Notes
- if a person with an account comes to the site, but as as guest...
    - if their account has items in an existing order
        - and they add items as a guest to a guest order
        - when they sign in, their orderItems should switch to be associated with
          their existing order's orderId
    - otherise, if they add items as a guest to a guest order,
        - when they sign in, the guest Order should change to be associated with
          their userId



### Stretch Goals
- basic search
- cart pop-up when add to cart (like Amazon)
- log in form pop up


### Tier 1
MVP Shopping experience

Two roles: guests (not signed in), users (signed in)
Deployed
See all products
Add to cart / edit cart
Checkout (submit an order)
Backend data validations
Rudiments of security

### Tier 2
Really nice design
Front-end data validations
DB persistent carts (load cart on new browser)
Continuous Integration/Continuous Development (CI/CD)
Order history (users can see theirs, including historic cost)
User Profile (viewable, users can edit info)
Accept payment (Stripe integration/Paypal/Venmo/Braintree, Bitcoin, etc)
Admin page (edit products, manage users)
OAuth integration
### Tier 3
Challenge
Inventory tracking and management
Persistent guest cart (front-end storage)
Merging guest / user carts upon login
Accessibility (a11y)
A11y checklist
screen reader friendly
keyboard navigable
colorblind issues
Email confirmation
Flair
Error/loading states in UI
Toast notifications for events
Promo code
Filters
Featured products
Wishlists
Social media

### S Tier
Internationalization (i18n)
Localization (L10n)
Visualization dashboard
Recommendation engine
Multi tenancy
White labeling
