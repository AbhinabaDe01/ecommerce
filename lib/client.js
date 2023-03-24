import  sanityClient  from "@sanity/client";
import  ImageUrlBuilder  from "@sanity/image-url";

export const client = sanityClient({
    projectId: 'mg6jxv08',
    dataset: 'production',
    apiVersion: '2022-03-10',
    useCdn: true,
    // token: process.env.NEXT_PUBLIC_SANITY_TOKEN
    token: 'skpRDiKW1UeqqaCdv9kyNUaips2079auwt5viR8k9BIyDd4T7kASyS3ChsBeJmZbnZSQbEo6LMQJcrWMCyLjjA7FpxlhySgeAfKOFqNjaVy1oPVxtb5MlhmYCQGdCsI5OehhITRLpye3dkQxMshd0VMBfWVO2LSIvIitJSP6zIDiqFNC7LqA'
})


const builder = ImageUrlBuilder(client)

//sanity is going to give us the access to the urls where our images are stored

export const urlFor = (source) => builder.image(source)