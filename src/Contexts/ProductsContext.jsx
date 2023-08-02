import React, { createContext, useState, useEffect } from 'react';

export const  ProductsContext = createContext();



export default function  ProductsContext({ children }) {

   


    async function LoadProducts() {
        try {
            console.log(Array.isArray(require('../Data/products.json')))
            let data = require('../Data/products.json');
            SetProducts(data);
            console.log(products)
        } catch (error) {
            console.error(error);
        }
    }

    useEffect(() => {
        LoadProducts();
    }, []);

    const [products, SetProducts] = useState([]);
    const [orderNum, SetOrderNum] = useState(0);
    const [cart, SetCart] = useState([]);
    const [activeOrders, SetActiveOrders] = useState([]);
    const [inPackingOrders, SetInPackingOrders] = useState([]);
    const [finishedOrders, SetFinishedOrders] = useState([]);
    const [allOrders, SetAllOrders] = useState([]);


    function AddToCart(product) {
       
        if (cart.find((c) => c.name == product.name)) //if already in cart
        return
        else {
            SetCart((prev) => [...prev, product])
            console.log("cart", cart)
        }

    }

    function RemoveFromCart(prodName) {
        SetCart(cart.filter((p) => p.name != prodName))
    }





    function CreateDate() {
        let currentDate = new Date();
        let year = currentDate.getFullYear();;
        let month = currentDate.getMonth() + 1;
        let day = currentDate.getDate();

        let date = `${day}.${month}.${year}`

        return date;
    }

    function CreateOrder(finishedCart) {

        SetOrderNum(orderNum + 1);

        let newOrder = {
            status: "recieved",
            orderNumber: orderNum,
            date: CreateDate(),
            address: "hana senesh",
            phone: "0505050505",
            fullname: "avi biton",
            products: finishedCart,
            amountOfProduct: finishedCart.length
        }
      
        SetActiveOrders((prev) => [...prev, newOrder]);
        SetAllOrders((prev) => [...prev, newOrder]);
    }


    function ChangeOrderStatus(orderNum) {
        let order = allOrders.find((allOr) => allOr.orderNumber === orderNum)

        if (order.status == 'recieved') {
            order.status = 'in-packing'
            SetInPackingOrders((prev) => [...prev, order])
            SetActiveOrders(activeOrders.filter(item => item.status != 'in-packing'))

        }
        else if (order.status == 'in-packing') {
            order.status = 'finished'
            console.log("Status:::", order.status)
            SetFinishedOrders((prev) => [...prev, order])
            SetInPackingOrders(inPackingOrders.filter(item => item.status != 'finished'))
        }
        else
            return;
    }


    const value = { LoadProducts, products, SetProducts, orderNum, SetOrderNum, activeOrders, SetActiveOrders, cart, SetCart, AddToCart, RemoveFromCart, finishedOrders, SetFinishedOrders,  CreateOrder, ChangeOrderStatus, allOrders, SetAllOrders, inPackingOrders, SetInPackingOrders }


    return (
        <OrdersContext.Provider value={value}>
            {children}
        </OrdersContext.Provider>
    )
}