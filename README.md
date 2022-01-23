# Droppe Xmas assignment

- This is the return of the assignment of Droppe Xmas
- Demo link: https://youthful-einstein-c3a68f.netlify.app/

# Features

- Parents can manage children's wishlist status via accept or reject individual products
- Parents can change the quantity of product and see information regardings total price
- Parents can see the Change Confirmation before saving the wishlists
- Parents can see which cart still have pending products

# Technology Choice

- TypeScript -> Enable type-safe nature of enterprise level products
- React NextJS -> I can implement the populate version of Fakestoreapi cart/fetch api (*) and utilize the SSR to prerender the carts.
- React Context API -> Avoid Props Drilling
- CSS variables -> Enable consistent global styling
- 

# Thoughts

- Since prices are one of the major factors, I highligh the discounted percent, discounted price and compare it to the initial price 
- (*) Fakestoreapi does not provide a route to fetch cart that populate user and product data => I make my version of the api with populated data in pages/api/carts.ts
- Given the time frame, I choose to prioritize the code best practices and the functionality of the web page. It took me a toal of more than 9 hours to complete the assignement.

# Limitations
- Lack of styling, hover effect of element, shawdow

# How to use
- Clone project to a locale folder.
- Create a .env file with this value depending on your opening port
- NEXT_PUBLIC_HOST=http://localhost:3000

# Screenshots

### Homepage in FullHD

![youthful-einstein-c3a68f netlify app_(full hd)](https://user-images.githubusercontent.com/23309848/150670406-b6d2130b-9fae-45c4-80e0-bbd9aaf64b7e.png)


### Homepage in tablet screen

![youthful-einstein-c3a68f netlify app_(Nest Hub Max)](https://user-images.githubusercontent.com/23309848/150670448-5b35e063-cc79-4e6e-9a2c-c5093b4678a8.png)


### Confirmation modal in FullHD

![youthful-einstein-c3a68f netlify app_(full hd) (1)](https://user-images.githubusercontent.com/23309848/150670484-f639d478-0a06-4c18-a775-7b65ce0f7313.png)

