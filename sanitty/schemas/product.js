export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
      {
        name: 'image',
        title: 'Image',
        type: 'array',
        of: [{ type: 'image' }],   // allow array of images
        options: {                 
          hotspot: true,
 //In the context of an image array, the options object with hotspot: true allows you to specify a hotspot when selecting a focal point 
// within an image. The hotspot is a point within the image that is considered the center of attention. This can be useful for responsive cropping,
//  where you want to ensure that the most important part of the image is always visible. 
   //  for media query shoud the image visible at multiple areas phone,laptop...
   
        },
      },
      {
        name: 'name',
        title: 'Name',
        type: 'string',
      },
      {
        name: 'slug',
        title: 'Slug',
        type: 'slug',
        options: {
          source: 'name',
          maxLength: 90,
        },
      },
      {
        name: 'price',
        title: 'Price',
        type: 'number',
      },
      {
        name: 'details',
        title: 'Details',
        type: 'string',
      },
    ],
  }; //
  