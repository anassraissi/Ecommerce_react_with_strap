const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // console.log('req.body.cartItems:', req.body.cartItems);   
    
    try {
      // Create Checkout Sessions from body params.
      const params = {
        submit_type: 'pay',
        mode: 'payment',
        payment_method_types: ['card'],
        billing_address_collection: 'auto',
        shipping_options: [
          { shipping_rate: 'shr_1Of9RWKrJFw3kXCvVChfkDbC' },
        ],
        line_items: req.body.cartItems.map((item)=>{
            const img=item.image[0].asset._ref;
            //  'image-a099db30fab841ce69c573f7409251824748e490-600x600-webp'
            const newImage = img.replace('image-', 'https://cdn.sanity.io/images/3bfs0uyn/production/').replace('-webp', '.webp');
            //  'https://cdn.sanity.io/image/3bfs0uyn/production/a099db30fab841ce69c573f7409251824748e490-600x600.webpp'
            console.log(newImage);

            return {
              price_data:{
                  currency:'usd',
                  product_data:{
                      name:item.name,
                      images: [newImage],
                    },
                  unit_amount:item.price*100
              },
              adjustable_quantity:{
                enabled:true,
                minimum:1,
              },
              quantity:item.quantity
            }

        }),
        success_url: `${req.headers.origin}/success`,
        cancel_url: `${req.headers.origin}/canceled`,
      };

      const session = await stripe.checkout.sessions.create(params);
      console.log(session);
        res.status(200).json(session);
    } catch (err) {
      res.status(err.statusCode || 500).json({ error: err.message });
    }
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
}
