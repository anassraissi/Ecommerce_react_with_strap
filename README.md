This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
"# Ecommerce_react_with_strap" 

# requirement
```
nmp install 
npm install -g @sanity/cli
Set-ExecutionPolicy -ExecutionPolicy Unrestricted -Scope CurrentUser
sanity init,docs,manage
cmd next.js
npm run dev => for next
sanity start => sanity studio 
npm i react-icons
```
# query is using the GROQ (Graph-Relational Object Queries) language, which is specific to Sanity => exp

```

export const getServerSideProps=async()=>{
  const query='*[_type=="product"]';    

  //In the query *[_type=="product"], you are querying for documents of type "product" in Sanity.  => name in file shema

  // This query is using the GROQ (Graph-Relational Object Queries) language, which is specific to Sanity.


  const products=await client.fetch(query)
  const bannerQuery='*[_type=="banner"]';

   //In the query *[_type=="product"], you are querying for documents of type "product" in Sanity.  => name in file shema

  // This query is using the GROQ (Graph-Relational Object Queries) language, which is specific to Sanity
  const bannerData=await client.fetch(bannerQuery)
  return{
      props:{
        products,bannerData
      }
  }
  }

const productQuery=`*[_type=="product" && slug.current=='${slug}'][0]`;    

```
# dif between getStaticProps and getServerSideProps
```
choose getStaticProps for static generation when the data can be fetched at build time,
 
choose getServerSideProps for server-side rendering when the data needs to be fetched on each request. 

 ```

 # error typing
  ```
  =>{} must type a return instead of =>() 

-----this is my error it retuen nothing

  {products.map((item)=>{
                <Product key={item._id} product={item}/>
  })}

-----i fix it by using () insted {}

  {products.map((item)=>{
                <Product key={item._id} product={item}/>
  })}

```






