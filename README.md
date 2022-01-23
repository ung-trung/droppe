# Droppe Xmas assignment

- This is the return of the assignment of Droppe Xmas
- Demo link: https://youthful-einstein-c3a68f.netlify.app/

# Features

- Parents can manage children's wishlist status via accept or reject individual products
- Parents can change the quantity of product and see information regardings total price
- Parents can see the Change Confirmation before saving the wishlists
- Parents can see which cart still have pending products

# Technology Choice

- TypeScript -> type-safe nature of enterprise level products
- React NextJS -> I can implement the populate version of Fakestoreapi cart/fetch api (*) and utilize the SSR to prerender the carts.
- Context API -> Props Drilling
- CSS variables -> Enable global styling

# Thoughts

- Since prices are one of the major factors, I highligh the discounted percent, discounted price and compare it to the initial price 
- (*) Fakestoreapi does not provide a route to fetch cart that populate user and product data => I make my version of the api with populated data in pages/api/carts.ts
- Given the time frame, I choose to prioritize the code best practices and the functionality of the web page. It took me a toal of more than 9 hours to complete the assignement.

# Limitations
- styling, hover effect of element


# How to use
- Clone project to a locale folder.
- Create a .env file with this value depending on your opening port
- NEXT_PUBLIC_HOST=http://localhost:3000
