const { default: Stripe } = require("stripe");
const { UserModel } = require("../models/user");

const SKey = `sk_test_51Od8BaSIKJo0jsm4dBwHPyvo5kS50QUmAWdfu4MKTED6G2sQKYD080SxXgXK3NBrxoCRzjquZeYuCN0hk96mXHMe00xJd3GD0q`
const stripe = require('stripe')(SKey)
const handlePayment = async (req, res) => {
    const { priceId, email } = req.body;
    console.log("PRICE IS ", priceId);
    //check or validate the email :-
    //If email then check that that user have metaData has stripe_id 
    //if not create a new payment intent then assing it to user metaData
    //if already then modify check that he/she has active subscription or not 
    // if yes then add the new billing cycle i.e payment for next month if same subscription_id 
    //else only update the subscription id 
    //CURRENTLY DO AUTOBILLING I.E RECURRING SUBSCRIPTION 
    const session = await stripe.checkout.sessions.create({
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price: priceId,
                quantity: 1,
            },
        ],
        success_url: 'http://localhost:5173/stripeSuccess', // Redirect URL after successful payment
        cancel_url: 'http://localhost:3000/stripeError', // Redirect URL if the user cancels
    }, { apiKey: SKey });

    return res.status(200).json({ msg: "success", rData: session.id });


    // const updateData = await UserModel.findByIdAndUpdate(id, { avatar: avatarData }, { new: true });

};

const getSubscriptionList = async (req, res) => {
    // try {
    const subscriptionModal = await stripe.products.list({
        limit: 4,
    });


    if (subscriptionModal && subscriptionModal?.hasOwnProperty("data")) {
        const subsData = subscriptionModal?.data?.reverse();
        const finalData = []
        if (subsData) {
            for (let index = 0; index < subsData.length; index++) {
                const element = subsData[index];
                const currPrice = await stripe.prices.retrieve(element?.default_price);
                if (currPrice) {
                    finalData.push({ subPrice: currPrice?.unit_amount / 100, ...element, currency: currPrice?.currency });
                } else {
                    finalData.push({ ...element });
                }
            }
        }

        return res.status(200).json({ msg: "successfull", rData: finalData })
    }
    return res.status(500).json({ msg: "No subscription modal found!" })

    // } catch (error) {
    //     res.status(500).json({ msg: "Error While fetching data", error })
    // }
}

module.exports = { handlePayment, getSubscriptionList }