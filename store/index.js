import Layouts from '@/layouts/store'
import Settings from '@/Settings/Page/store/index'

import Search from '@/modules/Search/store/index'
import Product from '@/modules/Product/store/index'
import Cart from '@/modules/Cart/store/index'
import Delivery from '@/modules/Delivery/store/index'
import User from '@/modules/User/store/index'
import Utils from '@/modules/Utils/store/index'
import People from '@/modules/People/store/index'
import Addressess from '@/modules/Addressess/store/index'
import Order from '@/modules/Order/store/index'
import Buy from '@/modules/Buy/store/index'
import Payment from '@/modules/Payment/store/index'

const modules = {
    Layouts,
    Settings,
    Search,
    Product,
    Cart,
    Delivery,
    User,
    Utils,
    People,
    Addressess,
    Order,
    Buy,
    Payment
}

const strict = false
export default {
    modules,
    strict
}