### ALPHA GRACE SHOPPER

### COMPONENTS
1. Main
2. Nav
3. Footer
4. Home Page
5. List Grid
6. Product Tile
7. Product Page
8. Product listings grid (e.g. for all blue products)
9. Summary of Order
10. Current Cart Items
11. Address Form (will be reused a lot)
12. Guest Checkout - enter customer info (include link to sign in)
13. checkout payment / complete order
14. checkout success!
15. log in page (include link to register)
16. register page


### Reducers
- single product
- all products
- cart (really cart items)
- single user
- all users
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
