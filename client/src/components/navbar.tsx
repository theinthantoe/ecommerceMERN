import {Link} from 'react-router-dom'
export const Navbar = ()=>{
    return <div className='flex justify-between items-center bg-green-300 text-white p-5'>
        <div className="">
            Shopify
        </div>
        <div className="">
            <Link  to={'/'}>Shop</Link>
            <Link  to={'/purchased-items'} className='mx-3'>Purchases</Link>
            <Link  to={'/checkout'}>Cart</Link>

        </div>
    </div>
}