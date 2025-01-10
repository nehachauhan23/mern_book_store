import Order from "./order.model.js"

export const createNewOrder = async (req, res) => {
  try {
    const newOrder = await Order(req.body);
    const saveOrder = await newOrder.save();
    res.status(200).send({
      message: "Order created successfully",
      order: saveOrder
    });
  } catch (error) {
      console.error("Error occcured :", error);
      res.status(500).json({
        message: "Failed to create order"
      })
  }
}

export const getOrdersByEmail = async(req, res) => { 
  try {
    const {email} = req.params;
    const orders = await Order.find({email}).sort({
      createdAt: -1
    })

    if(!orders){
      return res.status(404).json({
        message: "Order not found"
      })
    }

    res.status(200).json(orders);
    
  } catch (error) {
    console.error("Error fetching order details", error);
    res.status(500).json({
      message: "failed to fetch the order"
    })
  }
}