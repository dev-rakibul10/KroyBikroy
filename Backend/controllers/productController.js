import { v2 as cloudinary} from 'cloudinary'



// add product function
const addProduct = async (req, res) => {
  try {
    const {
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestSeller
    } = req.body;

    const image1 = req.files.image1 &&  req.files.image1[0];
    const image2 = req.files.image2 &&  req.files.image2[0];
    const image3 = req.files.image3 &&  req.files.image3[0];
    const image4 = req.files.image4 &&  req.files.image4[0];

    const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

    let imagesUrl = await Promise.all(
        images.map( async(item) => {
            let result = await cloudinary.uploader.upload(item.path, {resource_type: 'image'})
            return result.secure_url
        } )
    )

    console.log(
      name,
      price,
      description,
      category,
      subCategory,
      sizes,
      bestSeller,
    );
    console.log(imagesUrl);

    res.json({})
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message})

  }
};

// list product function
const listProduct = (req, res) => {};

// remove product function
const removeProduct = (req, res) => {};

// single product info function
const singleProduct = (req, res) => {};

export { addProduct, listProduct, removeProduct, singleProduct };
