import { useContext, } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItem from './ProductItem'


const RelatedProducts = ({ category, subCategory, currentId }) => {
  const { products } = useContext(ShopContext);

  const related = products
    .filter(
      (item) =>
        item.category === category &&
        item.subCategory === subCategory &&
        item._id !== currentId
    )
    .slice(0, 5);

  return (
    <div className="my-24">
      <div className="text-center text-3xl py-2">
        <Title txt1="RELATED" txt2="PRODUCTS" />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {related.map((item) => (
          <ProductItem key={item._id} id={item._id} name={item.name} price={item.price} image={item.image} />
        ))}
      </div>
    </div>
  );
};




{ /* const RelatedProducts = ({category, subCategory}) => {
    const { products } = useContext(ShopContext)
    const [related, setRelated] = useState([])


    useEffect(() => {
        if (products.length > 0) {
            let productCopy = products.slice();
            productCopy = productCopy.filter((item) => category === item.category)
            productCopy = productCopy.filter((item) => subCategory === item.subCategory)
            setRelated(productCopy.slice(0,5))

        }
    }, [products])
  return (
    <div className='my-24'>
        <div className="text-center text-3xl py-2">
            <Title txt1={'RELATED'} txt2={'PRODUCTS'} />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
            {
                related.map((item, index) => (
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                ))
            }
        </div>
    </div>
  )
} */}

export default RelatedProducts
